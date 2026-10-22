<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '../../../components/ui/BaseButton.vue'
import LikeButton from './LikeButton.vue'

const likes = ref(0)
const acepta = ref(true)
const aviso = ref('')

function onLike() {
  if (acepta.value) {
    likes.value++
    aviso.value = 'El hijo ha emitido like y el padre ha sumado uno.'
  } else {
    aviso.value = 'El hijo ha emitido like, pero el padre lo ha ignorado: likes no cambia.'
  }
}

function reiniciar() {
  likes.value = 0
  aviso.value = ''
}
</script>

<template>
  <div :class="$style.row">
    <LikeButton :likes="likes" @like="onLike" />
    <BaseButton variant="alt" size="sm" :disabled="likes === 0" @click="reiniciar">
      Reiniciar
    </BaseButton>
  </div>
  <label :class="$style.check">
    <input v-model="acepta" type="checkbox" />
    El padre acepta los likes
  </label>
  <p :class="$style.out" aria-live="polite">
    {{ aviso || 'Pulsa el corazón: el hijo solo avisa, el padre decide.' }}
  </p>
</template>

<style module>
.row {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.check {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  margin-top: var(--space-sm);
  font-size: var(--font-size-label);
  cursor: pointer;
}

.check input {
  width: var(--switch-knob);
  height: var(--switch-knob);
  margin: 0;
  accent-color: var(--c-brand);
}

.out {
  margin: var(--space-sm) 0 0;
  color: var(--c-text-2);
}
</style>
