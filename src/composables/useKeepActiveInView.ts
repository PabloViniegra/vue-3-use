import { nextTick, watch, type Ref, type WatchSource } from 'vue'

// La sidebar tiene su propio scroll: si el enlace activo queda fuera, la acercamos a él.
// Se mueve solo su scrollTop; scrollIntoView arrastraría también la página
export function useKeepActiveInView(container: Readonly<Ref<HTMLElement | null>>, activeId: WatchSource) {
  watch(activeId, async () => {
    await nextTick()
    const nav = container.value
    const link = nav?.querySelector<HTMLElement>('[aria-current]')

    if (!nav || !link) return
    const bounds = nav.getBoundingClientRect()
    const rect = link.getBoundingClientRect()
    const margin = rect.height

    if (rect.top < bounds.top + margin) nav.scrollTop -= bounds.top + margin - rect.top
    else if (rect.bottom > bounds.bottom - margin) nav.scrollTop += rect.bottom - bounds.bottom + margin
  })
}
