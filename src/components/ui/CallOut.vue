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
      <span :class="$style.symbol" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path v-if="type === 'real'" d="M12 5v15m0-15C9 3 5 3 2 4v14c3-1 7-1 10 2m0-15c3-2 7-2 10-1v14c-3-1-7-1-10 2" />
          <path v-else-if="type === 'warning'" d="M12 4 2.5 20h19L12 4Zm0 6v5m0 2.5v.01" />
          <path v-else d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-10v6m0-9.5v.01" />
        </svg>
      </span>
      {{ title ?? defaultTitles[type] }}
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
  padding-top: var(--space-md);
  border-top: 1px solid var(--c-divider-strong);
  line-height: var(--line-height-body);
}

.title {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.real .title {
  font-family: var(--font-mono);
  font-size: var(--font-size-caption);
  font-weight: var(--font-weight-medium);
  color: var(--c-brand-text);
}

.symbol {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: var(--button-sm-height);
  height: var(--button-sm-height);
  color: var(--c-brand-text);
  background: var(--c-brand-soft);
  border-radius: var(--radius-md);
}

.symbol svg {
  width: var(--icon-md);
  height: var(--icon-md);
}

.real p + p {
  margin-top: var(--space-sm);
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

.warning .title,
.warning .symbol {
  color: var(--c-warning-text);
}

.warning .symbol {
  background: transparent;
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
