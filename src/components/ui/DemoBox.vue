<script setup lang="ts">
defineProps<{ label: string }>()
</script>

<template>
  <section :class="$style.root" :aria-label="`Demo: ${label}`">
    <p :class="$style.label"><span :class="$style.dot" aria-hidden="true" />Pruébalo · {{ label }}</p>
    <div :class="$style.body">
      <slot />
    </div>
  </section>
</template>

<style module>
/* Mismo ancho y sangrado que los bloques de código */
.root {
  max-width: var(--box-max);
  margin: var(--space-lg) calc(var(--bleed) * -1);
  border: 1px solid var(--c-divider);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.label {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  margin: 0;
  padding: var(--space-xs) var(--bleed);
  font-family: var(--font-mono);
  font-size: var(--font-size-caption);
  font-weight: var(--font-weight-medium);
  color: var(--c-brand-text);
  background: var(--c-brand-soft);
  border-bottom: 1px solid var(--c-divider);
}

.dot {
  width: var(--space-xs);
  height: var(--space-xs);
  border-radius: var(--radius-full);
  background: var(--c-brand);
}

.body {
  padding: var(--space-lg) var(--bleed);
}

@media (max-width: 640px) {
  .root {
    border-inline: 0;
    border-radius: 0;
  }
}
</style>
