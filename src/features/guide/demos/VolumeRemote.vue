<script setup lang="ts">
import BaseButton from '../../../components/ui/BaseButton.vue'

defineProps<{ name: string; max: number }>()

const volumen = defineModel<number>({ required: true })
</script>

<template>
  <div :class="$style.root" role="group" :aria-label="name">
    <span :class="$style.name">{{ name }}</span>
    <BaseButton
      variant="alt"
      size="sm"
      square
      :aria-label="`Bajar volumen (${name})`"
      :disabled="volumen <= 0"
      @click="volumen--"
    >
      −
    </BaseButton>
    <BaseButton
      variant="alt"
      size="sm"
      square
      :aria-label="`Subir volumen (${name})`"
      :disabled="volumen >= max"
      @click="volumen++"
    >
      +
    </BaseButton>
  </div>
</template>

<style module>
.root {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

.name {
  min-width: 11ch;
  font-size: var(--font-size-label);
  color: var(--c-text-2);
}
</style>
