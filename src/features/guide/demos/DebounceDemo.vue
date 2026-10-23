<script setup lang="ts">
import { computed, customRef, onScopeDispose, ref, useId, watch } from 'vue'
import BaseField from '../../../components/ui/BaseField.vue'

// Un ref que no avisa de los cambios hasta que dejas de escribir
function useRefConRetraso(valorInicial: string, ms = 400) {
  let valor = valorInicial
  let temporizador: number | undefined

  onScopeDispose(() => clearTimeout(temporizador))

  return customRef<string>((track, trigger) => ({
    get() {
      track()

      return valor
    },
    set(nuevo) {
      clearTimeout(temporizador)
      temporizador = window.setTimeout(() => {
        valor = nuevo
        trigger()
      }, ms)
    },
  }))
}

const busqueda = useRefConRetraso('')
const pulsaciones = ref(0)
const propagaciones = ref(0)

watch(busqueda, () => propagaciones.value++)

const idCampo = useId()

// Solo se anuncia lo que se propaga, no cada tecla: la demo va justo de eso
const anuncio = computed(() => (propagaciones.value ? `Valor propagado: «${busqueda.value}».` : ''))

// El campo no se enlaza a busqueda, así que Vue no lo repinta con el valor retrasado mientras escribes
function escribir(e: Event) {
  pulsaciones.value++

  if (e.target instanceof HTMLInputElement) busqueda.value = e.target.value
}
</script>

<template>
  <label :for="idCampo" :class="$style.label">Busca algo y deja de escribir un momento</label>
  <BaseField :id="idCampo" type="search" autocomplete="off" placeholder="Por ejemplo: croissant" @input="escribir" />
  <p :class="$style.out">
    <template v-if="pulsaciones === 0">Todavía no has escrito nada.</template>
    <template v-else>
      {{ pulsaciones }} {{ pulsaciones === 1 ? 'pulsación' : 'pulsaciones' }}, pero el valor solo se
      ha propagado {{ propagaciones }} {{ propagaciones === 1 ? 'vez' : 'veces' }}. Ahora vale
      «{{ busqueda }}».
    </template>
  </p>
  <p role="status" class="visually-hidden">{{ anuncio }}</p>
</template>

<style module>
.label {
  display: block;
  margin-bottom: var(--space-xs);
  font-size: var(--font-size-label);
  font-weight: var(--font-weight-medium);
}

.out {
  margin: var(--space-sm) 0 0;
  font-size: var(--font-size-label);
  color: var(--c-text-2);
}
</style>
