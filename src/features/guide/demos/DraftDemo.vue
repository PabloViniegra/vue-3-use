<script setup lang="ts">
import BaseField from '../../../components/ui/BaseField.vue'
import { useStoredDraft } from '../../../composables/useStoredDraft'

const { text: texto, status: estado, savedAt: guardadoA } = useStoredDraft('vue3-guia-borrador')
</script>

<template>
  <label for="demo-borrador" :class="$style.label">Escribe un borrador y para un momento</label>
  <BaseField id="demo-borrador" v-model="texto" name="borrador" autocomplete="off" multiline rows="3" />
  <p :class="$style.status" role="status">
    <template v-if="estado === 'typing'">Escribiendo…</template>
    <template v-else-if="estado === 'saved'">Guardado en este navegador a las {{ guardadoA }}</template>
    <template v-else-if="estado === 'error'">
      No se pudo acceder al almacenamiento. Permite el almacenamiento del sitio o copia el texto antes de salir.
    </template>
    <template v-else>Recarga la página después de escribir: el texto sigue ahí.</template>
  </p>
</template>

<style module>
.label {
  display: block;
  margin-bottom: var(--space-xs);
  font-size: var(--font-size-label);
  font-weight: var(--font-weight-medium);
}

.status {
  margin: var(--space-xs) 0 0;
  font-size: var(--font-size-label);
  color: var(--c-text-2);
}
</style>
