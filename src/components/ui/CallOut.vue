<script setup lang="ts">
import { useId } from 'vue'

const { type = 'real', title } = defineProps<{
  type?: 'real' | 'warning' | 'info'
  title?: string
}>()

const defaultTitles = { real: 'En la vida real', warning: 'Ojo', info: 'Para que lo sepas' }
const titleId = useId()
</script>

<template>
  <!-- Nota y no <aside>: veinte landmarks "complementary" vuelven inútil la lista del lector -->
  <div :class="[$style.root, $style[type]]" role="note" :aria-labelledby="titleId">
    <p :id="titleId" :class="$style.title">{{ title ?? defaultTitles[type] }}</p>
    <slot />
  </div>
</template>

<style module>
.root {
  margin: var(--space-lg) 0;
  padding: var(--space-md);
  max-width: var(--measure);
  border: 1px solid;
  border-radius: var(--radius-lg);
  font-size: var(--font-size-body-sm);
  line-height: var(--line-height-body-sm);
}

.root p {
  margin: var(--space-xs) 0 0;
}

.root .title {
  margin: 0;
  font-weight: var(--font-weight-semibold);
}

.real {
  border-color: var(--c-brand);
  background: var(--c-brand-soft);
}

.real .title {
  color: var(--c-brand-text);
}

.warning {
  border-color: var(--c-warning);
  background: var(--c-warning-soft);
}

.warning .title {
  color: var(--c-warning-text);
}

.info {
  border-color: var(--c-divider-strong);
  background: var(--c-bg-soft);
}
</style>
