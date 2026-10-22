<script setup lang="ts">
import { onMounted, onUnmounted, ref, useTemplateRef, type Ref } from 'vue'

// Misma idea que useRaton, pero limitado a un elemento
function usePuntero(target: Ref<HTMLElement | null>) {
  const x = ref(0)
  const y = ref(0)
  const dentro = ref(false)

  function mover(e: PointerEvent) {
    const caja = target.value!.getBoundingClientRect()
    x.value = Math.round(e.clientX - caja.left)
    y.value = Math.round(e.clientY - caja.top)
    dentro.value = true
  }

  const salir = () => (dentro.value = false)

  onMounted(() => {
    target.value?.addEventListener('pointermove', mover)
    target.value?.addEventListener('pointerleave', salir)
  })
  onUnmounted(() => {
    target.value?.removeEventListener('pointermove', mover)
    target.value?.removeEventListener('pointerleave', salir)
  })

  return { x, y, dentro }
}

const area = useTemplateRef<HTMLElement>('area')
const { x, y, dentro } = usePuntero(area)
</script>

<template>
  <div ref="area" :class="$style.area">
    <span v-if="dentro" :class="$style.dot" :style="{ transform: `translate(${x}px, ${y}px)` }" aria-hidden="true" />
    <p :class="$style.coords">
      <template v-if="dentro">x: {{ x }} · y: {{ y }}</template>
      <template v-else>Pasa el ratón o el dedo por aquí</template>
    </p>
  </div>
</template>

<style module>
.area {
  position: relative;
  height: var(--demo-area-height);
  border-radius: var(--radius-lg);
  background:
    radial-gradient(circle, var(--c-divider-strong) 1px, transparent 1px) 0 0 / var(--space-md)
      var(--space-md),
    var(--c-bg-soft);
  overflow: hidden;
  touch-action: none;
}

.dot {
  position: absolute;
  top: calc(var(--space-md) / -2);
  left: calc(var(--space-md) / -2);
  width: var(--space-md);
  height: var(--space-md);
  border-radius: var(--radius-full);
  background: var(--c-brand);
  pointer-events: none;
}

.coords {
  position: absolute;
  inset: auto var(--space-sm) var(--space-xs) auto;
  margin: 0;
  font-family: var(--font-mono);
  font-size: var(--font-size-caption);
  color: var(--c-text-1);
  font-variant-numeric: tabular-nums;
}
</style>
