<script setup lang="ts">
import { ref } from 'vue'
import VolumeRemote from './VolumeRemote.vue'

const MAX = 10
const volumen = ref(3)
</script>

<template>
  <div :class="$style.remotes">
    <VolumeRemote v-model="volumen" name="Tu mando" :max="MAX" />
    <VolumeRemote v-model="volumen" name="El de tu compi" :max="MAX" />
  </div>
  <p :class="$style.out" aria-live="polite">
    Volumen de la tele (el <code>ref</code> del padre): <strong>{{ volumen }}</strong> de {{ MAX }}
  </p>
</template>

<style module>
.remotes {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm) var(--space-xl);
}

.out {
  margin: var(--space-sm) 0 0;
  color: var(--c-text-2);
}
</style>
