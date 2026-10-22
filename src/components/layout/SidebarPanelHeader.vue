<script setup lang="ts">
import BaseButton from '../ui/BaseButton.vue'

const emit = defineEmits<{ close: [] }>()
</script>

<template>
  <div :class="$style.root">
    <span :class="$style.label">Índice</span>
    <BaseButton variant="alt" square aria-label="Cerrar índice" @click="emit('close')">
      <svg :class="$style.icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      </svg>
    </BaseButton>
  </div>
</template>

<style module>
.root {
  display: none;
}

.icon {
  width: var(--icon-md);
  height: var(--icon-md);
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
