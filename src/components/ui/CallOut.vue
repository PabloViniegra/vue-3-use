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
    <p :id="titleId" :class="$style.title">
      <span v-if="type === 'real'" aria-hidden="true">// </span>{{ title ?? defaultTitles[type] }}
    </p>
    <slot />
  </div>
</template>

<style module>
.root {
  margin: var(--space-lg) 0;
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

/* La firma de la guía: una nota al margen, no otra caja más */
.real {
  max-width: var(--measure);
  padding-top: var(--space-sm);
  border-top: 1px solid var(--c-brand);
}

.real .title {
  font-family: var(--font-mono);
  font-size: var(--font-size-caption);
  font-weight: var(--font-weight-medium);
  color: var(--c-brand-text);
}

/* Las cajas sobresalen lo mismo que el código: el texto de dentro queda alineado con la prosa */
.warning,
.info {
  max-width: var(--box-max);
  margin-inline: calc(var(--bleed) * -1);
  padding: var(--space-md) var(--bleed);
  border: 1px solid;
  border-radius: var(--radius-lg);
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

@media (max-width: 640px) {
  .warning,
  .info {
    border-inline: 0;
    border-radius: 0;
  }
}
</style>
