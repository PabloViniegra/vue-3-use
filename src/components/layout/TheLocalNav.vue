<script setup lang="ts">
import { useTemplateRef } from 'vue'

defineProps<{ open: boolean; location: { level?: string; topic: string } }>()

const emit = defineEmits<{ toggle: [] }>()

const button = useTemplateRef('button')

defineExpose({ focus: () => button.value?.focus() })
</script>

<template>
  <section :class="$style.root" aria-label="Ubicación en la guía">
    <button
      ref="button"
      type="button"
      :class="$style.button"
      aria-controls="sidebar"
      :aria-expanded="open"
      @click="emit('toggle')"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h12" /></svg>
      Índice
    </button>
    <p v-if="location.topic" :class="$style.location">
      <template v-if="location.level">
        <span :class="$style.level">{{ location.level }}</span>
        <span aria-hidden="true"> › </span>
      </template>
      {{ location.topic }}
    </p>
  </section>
</template>

<style module>
.root {
  display: none;
}

@media (max-width: 960px) {
  .root {
    position: sticky;
    top: var(--nav-height);
    z-index: var(--z-local-nav);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-md);
    height: var(--local-nav-height);
    padding: 0 var(--space-lg);
    background: var(--c-bg);
    border-top: 1px solid var(--c-divider);
    border-bottom: 1px solid var(--c-divider);
  }
}

.button {
  display: flex;
  flex-shrink: 0;
  align-self: stretch;
  align-items: center;
  gap: var(--space-xs);
  padding: 0;
  border: 0;
  background: none;
  font-size: var(--font-size-caption);
  font-weight: var(--font-weight-medium);
  color: var(--c-text-1);
  cursor: pointer;
}

.button:hover {
  color: var(--c-brand-text);
}

.location {
  min-width: 0;
  margin: 0;
  overflow: hidden;
  font-size: var(--font-size-caption);
  font-weight: var(--font-weight-medium);
  color: var(--c-text-1);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.level {
  color: var(--c-text-2);
}

.button svg {
  width: var(--icon-md);
  height: var(--icon-md);
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
}
</style>
