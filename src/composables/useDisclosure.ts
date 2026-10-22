import { nextTick, onWatcherCleanup, readonly, ref, watch } from 'vue'

// returnFocus: a dónde vuelve el foco al cerrar con Esc, para que no caiga en <body>
export function useDisclosure(returnFocus?: () => void) {
  const open = ref(false)

  function closeOnEscape(e: KeyboardEvent) {
    if (e.key !== 'Escape') return
    open.value = false

    // Tras el render: el disparador puede estar inert mientras el panel sigue abierto
    if (returnFocus) nextTick(returnFocus)
  }

  // En el documento y no en el panel: el foco suele estar en el botón que lo abre
  watch(open, (isOpen) => {
    if (!isOpen) return
    document.addEventListener('keydown', closeOnEscape)
    onWatcherCleanup(() => document.removeEventListener('keydown', closeOnEscape))
  })

  return {
    open: readonly(open),
    show: () => (open.value = true),
    toggle: () => (open.value = !open.value),
    close: () => (open.value = false),
  }
}
