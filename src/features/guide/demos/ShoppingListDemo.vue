<script setup lang="ts">
import { nextTick, ref, useTemplateRef } from 'vue'
import BaseButton from '../../../components/ui/BaseButton.vue'
import BaseField from '../../../components/ui/BaseField.vue'

const nueva = ref('')
const lista = ref([{ id: 1, texto: 'Leche de avena' }])
const formulario = useTemplateRef('formulario')
const productos = useTemplateRef('productos')
const estado = ref('')
let siguienteId = 2

function agregar() {
  const texto = nueva.value.trim()

  if (!texto) return
  lista.value.push({ id: siguienteId++, texto })
  nueva.value = ''
}

async function quitar(id: number) {
  const indice = lista.value.findIndex((item) => item.id === id)
  const producto = lista.value[indice]

  if (!producto) return

  lista.value = lista.value.filter((item) => item.id !== id)
  estado.value = ''

  await nextTick()

  const botones = productos.value?.querySelectorAll('button')

  const destino = botones?.[Math.min(indice, lista.value.length - 1)]
    ?? formulario.value?.querySelector('input')

  destino?.focus()
  estado.value = `Se ha quitado ${producto.texto}. ${lista.value.length ? 'Productos restantes: ' + lista.value.length + '.' : 'Lista vacía.'}`
}
</script>

<template>
  <form ref="formulario" :class="$style.add" @submit.prevent="agregar">
    <label class="visually-hidden" for="demo-lista">Producto</label>
    <BaseField id="demo-lista" v-model="nueva" name="producto" autocomplete="off" placeholder="Por ejemplo, leche…" maxlength="40" />
    <BaseButton type="submit" :disabled="!nueva.trim()" aria-describedby="demo-lista-pista">Añadir</BaseButton>
  </form>

  <p id="demo-lista-pista" :class="$style.hint">
    <template v-if="nueva.trim()">Estás escribiendo: <q>{{ nueva }}</q></template>
    <template v-else>Escribe un producto para poder añadirlo.</template>
  </p>

  <p role="status" class="visually-hidden">{{ estado }}</p>

  <ul v-if="lista.length" ref="productos" :class="$style.items">
    <li v-for="item in lista" :key="item.id" :class="$style.item">
      <span :class="$style.text">{{ item.texto }}</span>
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
  overflow-wrap: anywhere;
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

.text {
  flex: 1;
  min-width: 0;
  overflow-wrap: anywhere;
}
</style>
