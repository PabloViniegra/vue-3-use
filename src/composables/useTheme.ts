import { nextTick, onMounted, onUnmounted, ref } from 'vue'

type Scheme = 'light' | 'dark'

const STORAGE_KEY = 'vue3-guia-theme'

// Igual que --c-bg y que el script de index.html: theme-color no acepta light-dark()
const THEME_COLOR: Record<Scheme, string> = { light: '#ffffff', dark: '#1a1a1a' }

function readSavedPreference(): Scheme | undefined {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)

    if (saved === 'dark' || saved === 'light') return saved
  } catch {
    // Si el almacenamiento está bloqueado, se usa la preferencia del sistema.
  }

  return undefined
}

const systemPreference = window.matchMedia('(prefers-color-scheme: dark)')
let savedPreference = readSavedPreference()
const resolveDark = () => (savedPreference ? savedPreference === 'dark' : systemPreference.matches)

// Estado a nivel de módulo: todos los componentes comparten el mismo tema.
const isDark = ref(resolveDark())
let activeTransition: ViewTransition | undefined

function applyScheme() {
  isDark.value = resolveDark()
  document.querySelector('meta[name="color-scheme"]')?.setAttribute('content', savedPreference ?? 'light dark')
  document.querySelector('meta[name="theme-color"]')?.setAttribute(
    'content', THEME_COLOR[isDark.value ? 'dark' : 'light'],
  )
}

export function useTheme() {
  function followSystemPreference() {
    if (!savedPreference) applyScheme()
  }

  function syncOtherTabs(event: StorageEvent) {
    if (event.key !== STORAGE_KEY && event.key !== null) return
    savedPreference = readSavedPreference()
    applyScheme()
  }

  onMounted(() => {
    systemPreference.addEventListener('change', followSystemPreference)
    window.addEventListener('storage', syncOtherTabs)
  })
  onUnmounted(() => {
    systemPreference.removeEventListener('change', followSystemPreference)
    window.removeEventListener('storage', syncOtherTabs)
  })

  return { isDark, toggle }
}

// Volver al tema del sistema borra la elección: guardarla fijaría el tema aunque el sistema cambie
function savePreference(dark: boolean) {
  savedPreference = dark === systemPreference.matches ? undefined : dark ? 'dark' : 'light'

  try {
    if (savedPreference) localStorage.setItem(STORAGE_KEY, savedPreference)
    else localStorage.removeItem(STORAGE_KEY)
  } catch {
    // El cambio visual funciona aunque el navegador bloquee el almacenamiento.
  }
}

async function toggle(event: MouseEvent) {
  if (!(event.currentTarget instanceof HTMLElement)) return

  const bounds = event.currentTarget.getBoundingClientRect()
  const root = document.documentElement

  savePreference(!resolveDark())

  if (activeTransition) {
    activeTransition.skipTransition()
    await activeTransition.updateCallbackDone
  }

  if (!document.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) {
    applyScheme()

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
    applyScheme()

    // La captura debe incluir el nuevo esquema de color y el estado accesible del interruptor.
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
