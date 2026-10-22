import { onMounted, onUnmounted, ref, type Ref } from 'vue'

export function useNearViewport(target: Readonly<Ref<HTMLElement | null>>, rootMargin = '600px 0px') {
  const isNear = ref(false)
  let observer: IntersectionObserver | undefined

  onMounted(() => {
    if (!target.value) return

    if (typeof IntersectionObserver === 'undefined') {
      isNear.value = true

      return
    }

    observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        // Solo hace falta saberlo una vez: después ya no se deja de mostrar
        isNear.value = true
        observer?.disconnect()
      },
      { rootMargin },
    )
    observer.observe(target.value)
  })

  onUnmounted(() => observer?.disconnect())

  return isNear
}
