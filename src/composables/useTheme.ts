import { nextTick, ref, watch } from 'vue'

const STORAGE_KEY = 'vue3-guia-theme'

// Estado a nivel de módulo: todos los componentes comparten el mismo tema.
const isDark = ref(document.documentElement.classList.contains('dark'))
let activeTransition: ViewTransition | undefined

watch(isDark, (dark) => {
  document.documentElement.classList.toggle('dark', dark)

  try {
    localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light')
  } catch {
    // El cambio visual funciona aunque el navegador bloquee el almacenamiento.
  }
})

export function useTheme() {
  return { isDark, toggle }
}

async function toggle(event: MouseEvent) {
  if (!(event.currentTarget instanceof HTMLElement)) return

  const bounds = event.currentTarget.getBoundingClientRect()
  const root = document.documentElement

  if (activeTransition) {
    activeTransition.skipTransition()
    await activeTransition.updateCallbackDone
  }

  if (!document.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) {
    isDark.value = !isDark.value

    return
  }

  const x = bounds.left + bounds.width / 2
  const y = bounds.top + bounds.height / 2
  const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))

  root.style.setProperty('--theme-reveal-x', `${x}px`)
  root.style.setProperty('--theme-reveal-y', `${y}px`)
  root.style.setProperty('--theme-reveal-radius', `${radius}px`)
  root.dataset.themeTransition = ''

  const transition = document.startViewTransition(async () => {
    isDark.value = !isDark.value

    // La captura debe incluir la clase dark y el estado accesible del interruptor.
    await nextTick()
  })

  activeTransition = transition

  try {
    // Al interrumpir la animación, ready rechaza aunque el cambio de tema sí se complete.
    await transition.ready.catch(() => transition.updateCallbackDone)
    await transition.finished
  } finally {
    if (activeTransition === transition) {
      activeTransition = undefined
      delete root.dataset.themeTransition
      root.style.removeProperty('--theme-reveal-x')
      root.style.removeProperty('--theme-reveal-y')
      root.style.removeProperty('--theme-reveal-radius')
    }
  }
}
