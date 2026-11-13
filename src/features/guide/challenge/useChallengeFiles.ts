import { computed, onWatcherCleanup, ref, shallowRef, watch } from 'vue'

type Files = Record<string, string>

export function useChallengeFiles(id: string, starter: Files) {
  const names = Object.keys(starter)
  const keyOf = (name: string) => `vue3-guia-${id}:${name}`

  function readSaved(name: string) {
    try {
      return localStorage.getItem(keyOf(name))
    } catch {
      return null
    }
  }

  const files = ref<Files>(Object.fromEntries(names.map((name) => [name, readSaved(name) ?? starter[name] ?? ''])))
  // Lo que se compila: va por detrás de lo escrito para no remontar la vista previa en cada tecla
  const settled = shallowRef<Files>({ ...files.value })
  const isPristine = computed(() => names.every((name) => files.value[name] === starter[name]))

  watch(
    files,
    (current) => {
      try {
        for (const name of names) {
          if (current[name] === starter[name]) localStorage.removeItem(keyOf(name))
          else localStorage.setItem(keyOf(name), current[name] ?? '')
        }
      } catch {
        // Sin almacenamiento el reto funciona igual; solo no sobrevive a recargar.
      }

      const timer = setTimeout(() => (settled.value = { ...current }), 400)
      onWatcherCleanup(() => clearTimeout(timer))
    },
    { deep: true },
  )

  function reset() {
    files.value = { ...starter }
  }

  return { files, settled, isPristine, reset }
}
