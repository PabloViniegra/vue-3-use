<script setup lang="ts">
import { reactive, ref } from 'vue'
import BaseButton from '../../../components/ui/BaseButton.vue'

const contador = ref(0)
const usuario = reactive({ nombre: 'Lucía', edad: 31 })

function sumar() {
  contador.value++
  usuario.edad++
}

function reiniciar() {
  contador.value = 0
  usuario.edad = 31
}
</script>

<template>
  <div :class="$style.row">
    <BaseButton @click="sumar">
      {{ contador }} {{ contador === 1 ? 'clic' : 'clics' }}
    </BaseButton>
    <BaseButton variant="alt" size="sm" :disabled="contador === 0" @click="reiniciar">
      Reiniciar
    </BaseButton>
  </div>
  <p :class="$style.out" aria-live="polite">
    {{ usuario.nombre }} tiene {{ usuario.edad }} años
    <template v-if="usuario.edad > 60"> (y sigue haciendo clic)</template>
  </p>
</template>

<style module>
.row {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.out {
  margin: var(--space-sm) 0 0;
  color: var(--c-text-2);
}
</style>
