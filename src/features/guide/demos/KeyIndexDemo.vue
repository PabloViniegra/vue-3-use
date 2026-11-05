<script setup lang="ts">
import { nextTick, ref, useTemplateRef } from 'vue'
import BaseButton from '../../../components/ui/BaseButton.vue'
import BaseField from '../../../components/ui/BaseField.vue'

const INICIAL = [
  { id: 1, nombre: 'Lucía' },
  { id: 2, nombre: 'Jorge' },
  { id: 3, nombre: 'Ana' },
]

const personas = ref([...INICIAL])
const clave = ref<'indice' | 'id'>('indice')

// Cambia al restaurar o al cambiar de key: la lista se monta de cero y se vacían las notas
const version = ref(0)
const estado = ref('')
const lista = useTemplateRef('lista')
const restaurar = useTemplateRef('restaurar')

async function borrar(indice: number) {
  const [persona] = personas.value.splice(indice, 1)
  estado.value = ''

  await nextTick()

  const botones = lista.value?.querySelectorAll('button')
  const destino = botones?.[Math.min(indice, botones.length - 1)] ?? restaurar.value?.querySelector('button')

  destino?.focus()
  estado.value = `Se ha borrado ${persona?.nombre}. Mira en qué fila ha quedado su nota.`
}

function reiniciar() {
  personas.value = [...INICIAL]
  version.value++
  estado.value = ''
}
</script>

<template>
  <fieldset :class="$style.choice">
    <legend>Qué usa <code>:key</code></legend>
    <label><input v-model="clave" type="radio" value="indice" @change="reiniciar" /> El índice</label>
    <label><input v-model="clave" type="radio" value="id" @change="reiniciar" /> El id</label>
  </fieldset>
  <p :class="$style.hint">Escribe algo en la nota de Lucía y bórrala.</p>

  <ul v-if="personas.length" ref="lista" :key="version" :class="$style.list">
    <li v-for="(persona, i) in personas" :key="clave === 'indice' ? i : persona.id" :class="$style.item">
      <label :for="`demo-nota-${persona.id}`" :class="$style.name">{{ persona.nombre }}</label>
      <BaseField :id="`demo-nota-${persona.id}`" :name="`nota-${persona.id}`" autocomplete="off" placeholder="Una nota…" />
      <BaseButton size="sm" variant="alt" @click="borrar(i)">
        Borrar<span class="visually-hidden"> a {{ persona.nombre }}</span>
      </BaseButton>
    </li>
  </ul>
  <p v-else :class="$style.hint">No queda nadie en la lista.</p>

  <div ref="restaurar" :class="$style.footer">
    <BaseButton size="sm" variant="alt" @click="reiniciar">Restaurar la lista</BaseButton>
    <p role="status" :class="$style.hint">{{ estado }}</p>
  </div>
</template>

<style module>
.choice {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
  margin: 0;
  padding: 0;
  border: 0;
  font-size: var(--font-size-label);
}

.choice legend {
  padding: 0;
  margin-bottom: var(--space-xs);
  font-weight: var(--font-weight-medium);
}

.hint {
  margin: var(--space-sm) 0 0;
  font-size: var(--font-size-label);
  color: var(--c-text-2);
}

.list {
  list-style: none;
  margin: var(--space-sm) 0 0;
  padding: 0;
}

.item {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 2fr) auto;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-xs) 0;
  border-bottom: 1px solid var(--c-divider);
}

.name {
  overflow-wrap: anywhere;
  font-size: var(--font-size-label);
  font-weight: var(--font-weight-medium);
}

.footer {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: var(--space-sm);
  margin-top: var(--space-sm);
}

.footer .hint {
  margin: 0;
}
</style>
