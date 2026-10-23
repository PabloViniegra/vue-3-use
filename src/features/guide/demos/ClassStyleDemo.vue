<script setup lang="ts">
import { computed, ref, useId } from 'vue'

const extras = [
  { id: 'avena', etiqueta: 'Leche de avena' },
  { id: 'doble', etiqueta: 'Doble' },
  { id: 'espuma', etiqueta: 'Extra de espuma' },
]

const elegidos = ref<string[]>([])
const nivel = ref(60)
const idTaza = useId()

const resumen = computed(() =>
  extras.flatMap((extra) => (elegidos.value.includes(extra.id) ? [extra.etiqueta.toLowerCase()] : [])).join(', '),
)

function alternar(id: string) {
  elegidos.value = elegidos.value.includes(id)
    ? elegidos.value.filter((elegido) => elegido !== id)
    : [...elegidos.value, id]
}
</script>

<template>
  <div role="group" aria-label="Extras del café" :class="$style.chips">
    <button
      v-for="extra in extras"
      :key="extra.id"
      type="button"
      :aria-pressed="elegidos.includes(extra.id)"
      :class="[$style.chip, { [$style.on]: elegidos.includes(extra.id) }]"
      @click="alternar(extra.id)"
    >
      {{ extra.etiqueta }}
    </button>
  </div>
  <p :class="$style.out" aria-live="polite">
    <template v-if="resumen">Café con {{ resumen }}.</template>
    <template v-else>Café solo: sin extras, ninguna clase activa.</template>
  </p>

  <div :class="$style.mezcla">
    <div :class="$style.control">
      <label :for="idTaza" :class="$style.label">Café en la taza</label>
      <div :class="$style.range">
        <input :id="idTaza" v-model.number="nivel" type="range" min="0" max="100" step="5" />
        <output :for="idTaza">{{ nivel }}%</output>
      </div>
    </div>
    <!-- Taza vertical: así no se confunde con el slider, que también es una barra horizontal -->
    <div :class="$style.taza" aria-hidden="true">
      <div :class="$style.fill" :style="{ height: `${nivel}%` }" />
    </div>
  </div>
</template>

<style module>
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
}

.chip {
  min-height: var(--button-sm-height);
  padding: 0 var(--button-sm-padding);
  font: inherit;
  font-size: var(--font-size-caption);
  font-weight: var(--font-weight-semibold);
  color: var(--c-text-1);
  background: var(--c-bg-mute);
  border: 1px solid var(--c-control-border);
  border-radius: var(--radius-full);
  cursor: pointer;
}

.chip.on {
  color: var(--c-on-brand);
  background: var(--c-brand);
  border-color: var(--c-brand-control-border);
}

.out {
  margin: var(--space-sm) 0 var(--space-md);
  font-size: var(--font-size-label);
  color: var(--c-text-2);
}

.label {
  display: block;
  margin-bottom: var(--space-xs);
  font-size: var(--font-size-label);
  font-weight: var(--font-weight-medium);
}

.range {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.range input {
  flex: 1;
  min-width: 0;
  accent-color: var(--c-brand);
}

.range output {
  min-width: 4ch;
  text-align: right;
  font-variant-numeric: tabular-nums;
}

.mezcla {
  display: flex;
  align-items: flex-end;
  gap: var(--space-lg);
}

.control {
  flex: 1;
  min-width: 0;
}

.taza {
  display: flex;
  align-items: flex-end;
  flex-shrink: 0;
  width: var(--space-xl);
  height: var(--space-2xl);
  overflow: hidden;
  background: var(--c-bg-mute);
  border: 1px solid var(--c-control-border);
  border-top: 0;
  border-radius: 0 0 var(--radius-md) var(--radius-md);
}

.fill {
  width: 100%;
  background: var(--c-brand);
}
</style>
