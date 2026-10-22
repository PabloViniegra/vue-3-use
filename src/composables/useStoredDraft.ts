import { onMounted, onUnmounted, onWatcherCleanup, ref, watch } from 'vue'

export function useStoredDraft(key: string) {
  const text = ref('')
  const status = ref<'idle' | 'typing' | 'saved' | 'error'>('idle')
  const savedAt = ref('')
  let pending = false

  try {
    text.value = localStorage.getItem(key) ?? ''
  } catch {
    status.value = 'error'
  }

  function save() {
    if (!pending) return

    try {
      localStorage.setItem(key, text.value)
      savedAt.value = new Date().toLocaleTimeString('es-ES')
      status.value = 'saved'
      pending = false
    } catch {
      status.value = 'error'
    }
  }

  watch(text, () => {
    pending = true
    status.value = 'typing'
    const timer = setTimeout(save, 800)
    onWatcherCleanup(() => clearTimeout(timer))
  }, { flush: 'sync' })

  function beforeUnload(event: BeforeUnloadEvent) {
    save()

    // Si el almacenamiento falla, salir sí descartaría el texto que solo vive en memoria.
    if (pending) {
      event.preventDefault()
      event.returnValue = ''
    }
  }

  function onVisibilityChange() {
    if (document.visibilityState === 'hidden') save()
  }

  onMounted(() => {
    window.addEventListener('beforeunload', beforeUnload)
    window.addEventListener('pagehide', save)
    document.addEventListener('visibilitychange', onVisibilityChange)
  })

  onUnmounted(() => {
    save()
    window.removeEventListener('beforeunload', beforeUnload)
    window.removeEventListener('pagehide', save)
    document.removeEventListener('visibilitychange', onVisibilityChange)
  })

  return { text, status, savedAt }
}
