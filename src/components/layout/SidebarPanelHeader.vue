<script setup lang="ts">
import BaseButton from '../ui/BaseButton.vue'

const emit = defineEmits<{ close: [] }>()
</script>

<template>
  <div :class="$style.root">
    <span :class="$style.label">Índice</span>
    <BaseButton size="lg" variant="alt" @click="emit('close')">Cerrar índice</BaseButton>
  </div>
</template>

<style module>
.root {
  display: none;
}

.label {
  font-size: var(--font-size-label);
  font-weight: var(--font-weight-semibold);
  color: var(--c-text-1);
}

@media (max-width: 960px) {
  .root {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-sm);
    margin-bottom: var(--space-xs);
  }
}
</style>
