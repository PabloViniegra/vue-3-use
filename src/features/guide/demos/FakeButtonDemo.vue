<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '../../../components/ui/BaseButton.vue'

const enDiv = ref(0)
const enBoton = ref(0)
</script>

<template>
  <p :class="$style.hint">Prueba los dos sin ratón: <kbd>Tab</kbd> para llegar y <kbd>Enter</kbd> para pulsar.</p>
  <div :class="$style.row">
    <!-- Mal a propósito: es lo que la demo enseña a no hacer -->
    <div :class="$style.fake" @click="enDiv++">Guardar (div)</div>
    <BaseButton size="sm" @click="enBoton++">Guardar (button)</BaseButton>
  </div>
  <p :class="$style.out" aria-live="polite">
    El <code>div</code> se ha pulsado {{ enDiv }} {{ enDiv === 1 ? 'vez' : 'veces' }}; el
    <code>button</code>, {{ enBoton }} {{ enBoton === 1 ? 'vez' : 'veces' }}.
  </p>
</template>

<style module>
.hint {
  margin: 0 0 var(--space-sm);
  font-size: var(--font-size-label);
}

.row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
  align-items: center;
}

.fake {
  display: inline-flex;
  align-items: center;
  min-height: var(--button-sm-height);
  padding: 0 var(--button-sm-padding);
  font-size: var(--font-size-caption);
  font-weight: var(--font-weight-semibold);
  background: var(--c-bg-mute);
  border: 1px solid var(--c-control-border);
  border-radius: var(--radius-full);
  cursor: pointer;
  user-select: none;
}

.out {
  margin: var(--space-sm) 0 0;
  font-size: var(--font-size-label);
  color: var(--c-text-2);
}
</style>
