import { ref, watch } from 'vue'

const STORAGE_KEY = 'vue3-guia-theme'

// Estado a nivel de módulo: todos los componentes comparten el mismo tema.
const isDark = ref(document.documentElement.classList.contains('dark'))

watch(isDark, (dark) => {
  document.documentElement.classList.toggle('dark', dark)
  try {
    localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light')
  } catch {
    // El cambio visual funciona aunque el navegador bloquee el almacenamiento.
  }
})

export function useTheme() {
  return { isDark, toggle: () => (isDark.value = !isDark.value) }
}
