import { onMounted, onUnmounted, ref } from 'vue'

export function useActiveSection(ids: string[]) {
  const activeId = ref('')
  let observer: IntersectionObserver | undefined
  let frame = 0

  // Antes de la primera sección (el hero) no hay ninguna activa; la última es corta y nunca
  // llega a la franja, así que al tocar fondo se marca ella
  function onScroll() {
    const first = document.getElementById(ids[0])
    if (first && first.getBoundingClientRect().top > window.innerHeight * 0.3) activeId.value = ''

    if (!observer) {
      const active = ids
        .map((id) => document.getElementById(id))
        .find((element) => {
          if (!element) return false
          const { top, bottom } = element.getBoundingClientRect()
          return bottom > 80 && top < window.innerHeight * 0.3
        })
      if (active) activeId.value = active.id
    }

    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
    if (atBottom) activeId.value = ids[ids.length - 1]
  }

  onMounted(() => {
    // La sección activa es la que cruza la franja superior de la pantalla
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) activeId.value = entry.target.id
          }
        },
        { rootMargin: '-80px 0px -70% 0px' },
      )

      for (const id of ids) {
        const el = document.getElementById(id)
        if (el) observer.observe(el)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    // En el siguiente frame el layout ya está calculado y leerlo no fuerza un reflujo
    frame = requestAnimationFrame(onScroll)
  })

  onUnmounted(() => {
    observer?.disconnect()
    cancelAnimationFrame(frame)
    window.removeEventListener('scroll', onScroll)
  })

  return activeId
}
