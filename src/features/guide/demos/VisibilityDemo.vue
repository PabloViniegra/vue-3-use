<script setup lang="ts">
import { ref } from 'vue'
import MountCounter from './MountCounter.vue'

const visible = ref(true)
const montajesIf = ref(0)
const montajesShow = ref(0)
</script>

<template>
  <label :class="$style.toggle">
    <input v-model="visible" :class="$style.checkbox" type="checkbox" />
    Mostrar los dos elementos
  </label>

  <div :class="$style.grid">
    <div :class="$style.cell">
      <code>v-if</code>
      <div :class="$style.slot"><MountCounter v-if="visible" label="Hola" @mounted="montajesIf++" /></div>
      <p :class="$style.meta">Montado {{ montajesIf }} {{ montajesIf === 1 ? 'vez' : 'veces' }}</p>
    </div>
    <div :class="$style.cell">
      <code>v-show</code>
      <div :class="$style.slot"><MountCounter v-show="visible" label="Hola" @mounted="montajesShow++" /></div>
      <p :class="$style.meta">Montado {{ montajesShow }} {{ montajesShow === 1 ? 'vez' : 'veces' }}</p>
    </div>
  </div>
  <p :class="[$style.meta, $style.hint]">Marca y desmarca varias veces. Solo uno de los dos se reconstruye desde cero.</p>
</template>

<style module>
.toggle {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  cursor: pointer;
}

.checkbox {
  width: var(--switch-knob);
  height: var(--switch-knob);
  margin: 0;
  accent-color: var(--c-brand);
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-sm);
  margin-top: var(--space-md);
}

.cell {
  padding: var(--space-sm);
  border-radius: var(--radius-lg);
  background: var(--c-bg-soft);
}

.slot {
  min-height: var(--button-sm-height);
  margin: var(--space-xs) 0;
}

.meta {
  margin: 0;
  font-size: var(--font-size-label);
  color: var(--c-text-2);
  font-variant-numeric: tabular-nums;
}

.hint {
  margin-top: var(--space-sm);
}
</style>
