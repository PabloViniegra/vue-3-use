<script setup lang="ts">
import { onMounted } from 'vue'

defineProps<{ label: string }>()

const emit = defineEmits<{ mounted: [] }>()

onMounted(() => emit('mounted'))
</script>

<template>
  <span :class="$style.root">{{ label }}</span>
</template>

<style module>
.root {
  display: inline-block;
  padding: 0 var(--space-sm);
  border-radius: var(--radius-xl);
  font-size: var(--font-size-label);
  background: var(--c-brand-soft);
  color: var(--c-brand-text);
}
</style>
