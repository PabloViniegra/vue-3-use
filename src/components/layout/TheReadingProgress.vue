<script setup lang="ts">
import { onMounted, onUnmounted, useTemplateRef } from 'vue'
import { gsap, ScrollTrigger } from '../../lib/motion'

const { contentId } = defineProps<{ contentId: string }>()
const bar = useTemplateRef('bar')
let context: gsap.Context | undefined
let observer: ResizeObserver | undefined
let frame = 0

onMounted(() => {
  const content = document.getElementById(contentId)

  if (!content || !bar.value) return
  context = gsap.context(() => {
    gsap.fromTo(bar.value, { scaleX: 0 }, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: content,
        start: () => `top ${getComputedStyle(document.documentElement).scrollPaddingTop}`,
        end: 'max',
        scrub: true,
      },
    })
  }, bar.value)

  observer = new ResizeObserver(() => {
    cancelAnimationFrame(frame)
    frame = requestAnimationFrame(() => ScrollTrigger.refresh())
  })
  observer.observe(content)
})

onUnmounted(() => {
  observer?.disconnect()
  cancelAnimationFrame(frame)
  context?.revert()
})
</script>

<template>
  <div ref="bar" :class="$style.bar" aria-hidden="true" />
</template>

<style module>
.bar {
  position: fixed;
  top: calc(var(--nav-height) - var(--reading-progress-height));
  left: 0;
  z-index: var(--z-nav);
  width: 100%;
  height: var(--reading-progress-height);
  background: var(--c-brand-text);
  transform: scaleX(0);
  transform-origin: left;
  pointer-events: none;
}
</style>
