<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import BaseButton from '../../../components/ui/BaseButton.vue'
import BaseField from '../../../components/ui/BaseField.vue'

const caja = useTemplateRef('caja')
const busqueda = ref('')
const ancho = ref<number>()

// La ref va en un div propio: puesta en un componente daría su instancia, no el elemento
function enfocar() {
  caja.value?.querySelector('input')?.focus()
}

function medir() {
  ancho.value = Math.round(caja.value?.getBoundingClientRect().width ?? 0)
}
</script>

<template>
  <div ref="caja">
    <label for="demo-ref" class="visually-hidden">Buscar</label>
    <BaseField id="demo-ref" v-model="busqueda" type="search" placeholder="Buscar en la tienda" />
  </div>
  <div :class="$style.row">
    <BaseButton size="sm" @click="enfocar">Enfocar el campo</BaseButton>
    <BaseButton size="sm" variant="alt" @click="medir">Medir el campo</BaseButton>
  </div>
  <p :class="$style.out" aria-live="polite">
    <template v-if="ancho">
      El campo mide {{ ancho }} px de ancho. Cambia el tamaño de la ventana y vuelve a medir.
    </template>
    <template v-else>Los dos botones necesitan el elemento del DOM de verdad.</template>
  </p>
</template>

<style module>
.row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
  margin-top: var(--space-sm);
}

.out {
  margin: var(--space-sm) 0 0;
  font-size: var(--font-size-label);
  color: var(--c-text-2);
}
</style>
