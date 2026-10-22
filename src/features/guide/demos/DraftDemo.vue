<script setup lang="ts">
import { onWatcherCleanup, ref, watch } from 'vue'
import BaseField from '../../../components/ui/BaseField.vue'

const KEY = 'vue3-guia-borrador'

function readDraft() {
  try {
    return { value: localStorage.getItem(KEY) ?? '', available: true }
  } catch {
    return { value: '', available: false }
  }
}

const draft = readDraft()
const texto = ref(draft.value)
const estado = ref<'idle' | 'typing' | 'saved' | 'error'>(draft.available ? 'idle' : 'error')
const guardadoA = ref('')

watch(texto, (valor) => {
  estado.value = 'typing'
  // Cada pulsación cancela el guardado pendiente: solo se guarda al parar
  const timer = setTimeout(() => {
    try {
      localStorage.setItem(KEY, valor)
      guardadoA.value = new Date().toLocaleTimeString('es-ES')
      estado.value = 'saved'
    } catch {
      estado.value = 'error'
    }
  }, 800)
  onWatcherCleanup(() => clearTimeout(timer))
})
</script>

<template>
  <label for="demo-borrador" :class="$style.label">Escribe un borrador y para un momento</label>
  <BaseField id="demo-borrador" v-model="texto" multiline rows="3" />
  <p :class="$style.status" role="status">
    <template v-if="estado === 'typing'">Escribiendo…</template>
    <template v-else-if="estado === 'saved'">Guardado en este navegador a las {{ guardadoA }}</template>
    <template v-else-if="estado === 'error'">
      No se pudo acceder al almacenamiento; el borrador no se conservará al recargar.
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
