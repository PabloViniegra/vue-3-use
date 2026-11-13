import { onMounted, onUnmounted, type Ref } from 'vue'
import { gsap } from '../lib/motion'

export function useHeroMotion(root: Readonly<Ref<HTMLElement | null>>) {
  let media: gsap.MatchMedia | undefined

  onMounted(() => {
    const element = root.value

    if (!element) return
    media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const styles = getComputedStyle(element)
      const duration = parseFloat(styles.getPropertyValue('--duration-base')) / 1000
      const distance = parseFloat(styles.getPropertyValue('--space-sm'))

      gsap.from('[data-hero-entry]', {
        y: distance,
        opacity: 0,
        duration,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
      })

      for (const [part, range] of [['title', 0.85], ['detail', 0.6], ['action', 0.4], ['wires', 0.12]] as const) {
        gsap.to(`[data-hero-part="${part}"]`, {
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: element,
            start: 'top top',
            end: () => `+=${element.offsetHeight * range}`,
            scrub: true,
          },
        })
      }
    }, element)
  })

  onUnmounted(() => media?.revert())
}
