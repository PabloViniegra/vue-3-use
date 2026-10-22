<script lang="ts">
import { computed, ref } from 'vue'

interface Producto {
  id: string
  nombre: string
  precio: number
}

// Fuera del setup, como hace Pinia: una sola instancia para todos los que la usen
const items = ref<Producto[]>([])
const unidades = computed(() => items.value.length)
const total = computed(() => items.value.reduce((suma, p) => suma + p.precio, 0))
</script>

<script setup lang="ts">
import BaseButton from '../../../components/ui/BaseButton.vue'

const catalogo: Producto[] = [
  { id: 'taza', nombre: 'Taza de Vue', precio: 9.5 },
  { id: 'camiseta', nombre: 'Camiseta', precio: 18 },
  { id: 'pegatinas', nombre: 'Pegatinas', precio: 3 },
]

const euros = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' })

function agregar(producto: Producto) {
  items.value.push(producto)
}

function vaciar() {
  items.value = []
}
</script>

<template>
  <div :class="$style.grid">
    <section :class="$style.panel" aria-labelledby="store-cabecera">
      <p id="store-cabecera" :class="$style.title">Cabecera.vue</p>
      <p aria-live="polite">
        <template v-if="unidades === 0">El carrito está vacío.</template>
        <template v-else>
          {{ unidades }} {{ unidades === 1 ? 'artículo' : 'artículos' }} ·
          <strong>{{ euros.format(total) }}</strong>
        </template>
      </p>
      <BaseButton variant="alt" size="sm" :disabled="unidades === 0" @click="vaciar">
        Vaciar
      </BaseButton>
    </section>

    <section :class="$style.panel" aria-labelledby="store-catalogo">
      <p id="store-catalogo" :class="$style.title">Catalogo.vue</p>
      <ul :class="$style.list">
        <li v-for="p in catalogo" :key="p.id" :class="$style.item">
          <span>{{ p.nombre }} <small :class="$style.price">{{ euros.format(p.precio) }}</small></span>
          <BaseButton size="sm" :aria-label="`Añadir ${p.nombre}`" @click="agregar(p)">
            Añadir
          </BaseButton>
        </li>
      </ul>
    </section>
  </div>
</template>

<style module>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(var(--card-min), 1fr));
  gap: var(--space-md);
}

.panel {
  padding: var(--space-sm) var(--space-md);
  border: 1px solid var(--c-divider);
  border-radius: var(--radius-md);
}

.panel p {
  margin: 0 0 var(--space-sm);
}

.title {
  font-family: var(--font-mono);
  font-size: var(--font-size-caption);
  color: var(--c-text-2);
}

.list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-sm);
  padding: var(--space-xxs) 0;
}

.price {
  margin-left: var(--space-xxs);
  color: var(--c-text-2);
}
</style>
