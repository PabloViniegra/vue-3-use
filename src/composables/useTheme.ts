import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'

const STORAGE_KEY = 'vue3-guia-theme'

function readSavedPreference() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)

    if (saved === 'dark') return true

    if (saved === 'light') return false
  } catch {
    // Si el almacenamiento está bloqueado, se usa la preferencia del sistema.
  }

  return undefined
}

const savedPreference = readSavedPreference()
const systemPreference = window.matchMedia('(prefers-color-scheme: dark)')
let hasManualPreference = savedPreference !== undefined

// Estado a nivel de módulo: todos los componentes comparten el mismo tema.
const isDark = ref(savedPreference ?? systemPreference.matches)
let requestedDark = isDark.value
let activeTransition: ViewTransition | undefined

watch(isDark, (dark) => {
  document.documentElement.classList.toggle('dark', dark)
  document.querySelector('meta[name="theme-color"]')?.setAttribute(
    'content', getComputedStyle(document.documentElement).getPropertyValue('--c-bg').trim(),
  )
})

export function useTheme() {
  function followSystemPreference(event: MediaQueryListEvent) {
    if (!hasManualPreference) {
      requestedDark = event.matches
      isDark.value = event.matches
    }
  }

  onMounted(() => {
    systemPreference.addEventListener('change', followSystemPreference)

    if (!hasManualPreference) {
      requestedDark = systemPreference.matches
      isDark.value = systemPreference.matches
    }
  })
  onUnmounted(() => systemPreference.removeEventListener('change', followSystemPreference))

  return { isDark, toggle }
}

async function toggle(event: MouseEvent) {
  if (!(event.currentTarget instanceof HTMLElement)) return

  const bounds = event.currentTarget.getBoundingClientRect()
  const root = document.documentElement
  const dark = (requestedDark = !requestedDark)
  hasManualPreference = true

  try {
    localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light')
  } catch {
    // El cambio visual funciona aunque el navegador bloquee el almacenamiento.
  }

  if (activeTransition) {
    activeTransition.skipTransition()
    await activeTransition.updateCallbackDone
  }

  if (!document.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) {
    isDark.value = dark

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
    isDark.value = dark

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
