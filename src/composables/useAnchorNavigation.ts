import { onMounted, onUnmounted } from 'vue'

function getTarget(hash: string) {
  try {
    return document.getElementById(decodeURIComponent(hash.slice(1)))
  } catch {
    return null
  }
}

function isSkippedContent(target: Element | null) {
  return Boolean(target?.closest('[data-content-section]'))
}

export function useAnchorNavigation() {
  let restoreFrame = 0
  let scrollBehavior = ''

  function withInstantScroll(action: () => void) {
    const root = document.documentElement

    if (!restoreFrame) scrollBehavior = root.style.scrollBehavior
    // Los fragmentos hacia contenido omitido usan una geometría provisional durante el scroll suave.
    root.style.scrollBehavior = 'auto'
    cancelAnimationFrame(restoreFrame)
    restoreFrame = requestAnimationFrame(() => {
      root.style.scrollBehavior = scrollBehavior
      restoreFrame = 0
    })
    action()
  }

  function onClick(event: MouseEvent) {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return
    }

    const source = event.target

    if (!(source instanceof Element)) return
    const link = source.closest<HTMLAnchorElement>('a[href]')

    if (!link || (link.target && link.target !== '_self')) return

    const url = new URL(link.href)

    if (url.origin !== location.origin || url.pathname !== location.pathname || url.search !== location.search) {
      return
    }

    const target = getTarget(url.hash)

    if (isSkippedContent(target)) withInstantScroll(() => {})
  }

  function onHashChange() {
    const target = getTarget(location.hash)

    if (isSkippedContent(target)) withInstantScroll(() => target?.scrollIntoView())
  }

  onMounted(() => {
    if (!CSS.supports('content-visibility', 'auto')) return
    document.addEventListener('click', onClick, true)
    window.addEventListener('hashchange', onHashChange)
    onHashChange()
  })

  onUnmounted(() => {
    document.removeEventListener('click', onClick, true)
    window.removeEventListener('hashchange', onHashChange)

    if (restoreFrame) {
      cancelAnimationFrame(restoreFrame)
      document.documentElement.style.scrollBehavior = scrollBehavior
    }

    restoreFrame = 0
  })
}
