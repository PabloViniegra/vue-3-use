<script setup lang="ts">
const { multiline = false } = defineProps<{ multiline?: boolean }>()

// Sin v-model funciona como campo libre: lo usan las demos que escuchan @input
const model = defineModel<string>()
</script>

<template>
  <textarea v-if="multiline" v-model="model" :class="[$style.root, $style.multiline]" />
  <input v-else v-model="model" :class="$style.root" />
</template>

<style module>
.root {
  width: 100%;
  min-width: 0;
  font: inherit;
  font-size: var(--font-size-body-sm);
  color: var(--c-text-1);
  background: var(--c-bg);
  border: 1px solid var(--c-control-border);
  border-radius: var(--radius-lg);
  padding: var(--space-xs) var(--space-sm);
}

.root::placeholder {
  color: var(--c-text-2);
}

.root:focus-visible {
  outline-offset: 0;
  border-color: var(--c-focus);
}

.multiline {
  display: block;
  resize: vertical;
}
</style>
