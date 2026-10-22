<script setup lang="ts">
import { computed, reactive } from 'vue'
import BaseButton from '../../../components/ui/BaseButton.vue'

const productos = reactive([
  { id: 'cafe', nombre: 'Café con leche', precio: 1.8, cantidad: 2 },
  { id: 'croissant', nombre: 'Croissant', precio: 2.2, cantidad: 1 },
])

const euros = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' })

const total = computed(() => productos.reduce((suma, p) => suma + p.precio * p.cantidad, 0))
const unidades = computed(() => productos.reduce((suma, p) => suma + p.cantidad, 0))
</script>

<template>
  <ul :class="$style.items">
    <li v-for="p in productos" :key="p.id" :class="$style.item">
      <span>{{ p.nombre }} <small :class="$style.price">{{ euros.format(p.precio) }}</small></span>
      <span :class="$style.stepper">
        <BaseButton
          variant="alt"
          size="sm"
          square
          :disabled="p.cantidad === 0"
          :aria-label="`Quitar un ${p.nombre}`"
          @click="p.cantidad--"
        >
          −
        </BaseButton>
        <output :class="$style.count" :aria-label="`Cantidad de ${p.nombre}`">{{ p.cantidad }}</output>
        <BaseButton
          variant="alt"
          size="sm"
          square
          :disabled="p.cantidad === 9"
          :aria-label="`Añadir un ${p.nombre}`"
          @click="p.cantidad++"
        >
          +
        </BaseButton>
      </span>
    </li>
  </ul>
  <p :class="$style.total" aria-live="polite">
    <template v-if="unidades === 0">Nada en la cuenta. Así no se desayuna.</template>
    <template v-else>Total: <strong>{{ euros.format(total) }}</strong></template>
  </p>
</template>

<style module>
.items {
  list-style: none;
  margin: 0;
  padding: 0;
}

.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-sm);
  padding: var(--space-xs) 0;
  border-bottom: 1px solid var(--c-divider);
}

.price {
  margin-left: var(--space-xxs);
  color: var(--c-text-2);
}

.stepper {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

.count {
  min-width: 1.5ch;
  text-align: center;
  font-variant-numeric: tabular-nums;
}

.total {
  margin: var(--space-md) 0 0;
}
</style>
