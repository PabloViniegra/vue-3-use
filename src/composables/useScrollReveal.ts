import { onMounted, onUnmounted, type Ref } from 'vue'
import { gsap } from '../lib/motion'

export function useScrollReveal(target: Readonly<Ref<HTMLElement | null>>) {
  let media: gsap.MatchMedia | undefined

  onMounted(() => {
    const element = target.value

    if (!element) return
    media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const styles = getComputedStyle(element)

      gsap.from(element, {
        y: parseFloat(styles.getPropertyValue('--space-sm')),
        duration: parseFloat(styles.getPropertyValue('--duration-base')) / 1000,
        ease: 'power2.out',
        immediateRender: false,
        clearProps: 'transform',
        scrollTrigger: { trigger: element, start: 'clamp(top 92%)', once: true },
      })
    }, element)
  })

  onUnmounted(() => media?.revert())
}
