<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '../../../components/ui/BaseButton.vue'

const visible = ref(false)
</script>

<template>
  <BaseButton :aria-expanded="visible" @click="visible = !visible">
    {{ visible ? 'Ocultar aviso' : 'Mostrar aviso' }}
  </BaseButton>
  <div :class="$style.stage" aria-live="polite">
    <Transition
      :enter-from-class="$style.hidden"
      :enter-active-class="$style.animating"
      :leave-active-class="$style.animating"
      :leave-to-class="$style.hidden"
    >
      <p v-if="visible" :class="$style.toast">Pedido confirmado. Llega mañana entre las 9 y las 14.</p>
    </Transition>
  </div>
</template>

<style module>
.stage {
  min-height: var(--space-3xl);
  margin-top: var(--space-sm);
}

.toast {
  margin: 0;
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-lg);
  border: 1px solid var(--c-divider);
  background: var(--c-bg-soft);
}

.animating {
  transition:
    opacity var(--duration-base) var(--ease-out),
    transform var(--duration-base) var(--ease-out);
}

.hidden {
  opacity: 0;
  transform: translateY(calc(var(--space-xs) * -1));
}

@media (prefers-reduced-motion: reduce) {
  .animating {
    transition: opacity var(--duration-fast);
  }

  .hidden {
    transform: none;
  }
}
</style>
