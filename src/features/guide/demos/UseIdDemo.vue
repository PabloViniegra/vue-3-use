<script setup lang="ts">
import IdField from './IdField.vue'
</script>

<template>
  <div :class="$style.grid">
    <IdField etiqueta="Nombre" ayuda="Como sale en tu DNI" />
    <IdField etiqueta="Apellidos" ayuda="Los dos, si tienes dos" />
  </div>
  <p :class="$style.out">
    Es el mismo componente dos veces. Pincha en cada etiqueta: enfoca su campo, no el del vecino.
  </p>
</template>

<style module>
.grid {
  display: grid;
  gap: var(--space-md);
  grid-template-columns: repeat(auto-fit, minmax(var(--card-min), 1fr));
}

.out {
  margin: var(--space-sm) 0 0;
  font-size: var(--font-size-label);
  color: var(--c-text-2);
}
</style>
