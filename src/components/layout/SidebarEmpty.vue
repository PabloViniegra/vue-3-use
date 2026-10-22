<script setup lang="ts">
defineProps<{ query: string }>()

const emit = defineEmits<{ clear: [] }>()
</script>

<template>
  <div :class="$style.root">
    <p>Ningún tema habla de «{{ query }}».</p>
    <button type="button" :class="$style.clear" @click="emit('clear')">Vaciar filtro</button>
  </div>
</template>

<style module>
.root {
  font-size: var(--font-size-label);
  line-height: var(--line-height-label);
  color: var(--c-text-2);
  overflow-wrap: anywhere;
}

.root p {
  margin: 0 0 var(--space-xs);
}

.clear {
  padding: var(--space-xxs) 0;
  border: 0;
  background: none;
  font: inherit;
  font-weight: var(--font-weight-medium);
  color: var(--c-brand-text);
  cursor: pointer;
}

.clear:hover {
  text-decoration: underline;
}
</style>
