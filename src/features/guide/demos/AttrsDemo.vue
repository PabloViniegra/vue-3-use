<script setup lang="ts">
import { ref } from 'vue'
import AttrsField from './AttrsField.vue'

const pulsaciones = ref(0)
</script>

<template>
  <AttrsField
    etiqueta="Correo"
    type="email"
    maxlength="24"
    autocomplete="off"
    placeholder="tu@correo.es"
    @input="pulsaciones++"
  />
  <p :class="$style.out">
    <template v-if="pulsaciones">
      El componente no declara <code>type</code>, <code>maxlength</code> ni <code>@input</code>, pero
      el padre ya ha oído {{ pulsaciones }} {{ pulsaciones === 1 ? 'pulsación' : 'pulsaciones' }}.
    </template>
    <template v-else>
      Escribe algo: el <code>@input</code> del padre llega al <code>&lt;input&gt;</code> del hijo.
    </template>
  </p>
</template>

<style module>
.out {
  margin: var(--space-sm) 0 0;
  font-size: var(--font-size-label);
  color: var(--c-text-2);
}
</style>
