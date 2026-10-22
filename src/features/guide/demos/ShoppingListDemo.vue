<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '../../../components/ui/BaseButton.vue'
import BaseField from '../../../components/ui/BaseField.vue'

const nueva = ref('')
const lista = ref([{ id: 1, texto: 'Leche de avena' }])
let siguienteId = 2

function agregar() {
  const texto = nueva.value.trim()
  if (!texto) return
  lista.value.push({ id: siguienteId++, texto })
  nueva.value = ''
}

function quitar(id: number) {
  lista.value = lista.value.filter((item) => item.id !== id)
}
</script>

<template>
  <form :class="$style.add" @submit.prevent="agregar">
    <label class="visually-hidden" for="demo-lista">Producto</label>
    <BaseField id="demo-lista" v-model="nueva" placeholder="¿Qué falta?" maxlength="40" />
    <BaseButton type="submit" :disabled="!nueva.trim()">Añadir</BaseButton>
  </form>

  <p :class="$style.hint">Estás escribiendo: <q>{{ nueva || '…' }}</q></p>

  <ul v-if="lista.length" :class="$style.items">
    <li v-for="item in lista" :key="item.id" :class="$style.item">
      {{ item.texto }}
      <BaseButton variant="alt" size="sm" @click="quitar(item.id)">
        Quitar<span class="visually-hidden"> {{ item.texto }}</span>
      </BaseButton>
    </li>
  </ul>
  <p v-else :class="$style.hint">Lista vacía. O ya has ido a comprar o te espera una cena triste.</p>
</template>

<style module>
.add {
  display: flex;
  gap: var(--space-xs);
}

.hint {
  margin: var(--space-sm) 0 0;
  font-size: var(--font-size-label);
  color: var(--c-text-2);
}

.items {
  list-style: none;
  margin: var(--space-sm) 0 0;
  padding: 0;
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-xs) 0;
  border-bottom: 1px solid var(--c-divider);
}
</style>
