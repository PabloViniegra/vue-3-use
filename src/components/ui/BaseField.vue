<script setup lang="ts">
const { multiline = false, invalid = false } = defineProps<{ multiline?: boolean; invalid?: boolean }>()

// Sin v-model funciona como campo libre: lo usan las demos que escuchan @input
const model = defineModel<string>()
</script>

<template>
  <textarea
    v-if="multiline"
    v-model="model"
    :class="[$style.root, $style.multiline, invalid && $style.invalid]"
    :aria-invalid="invalid || undefined"
  />
  <input v-else v-model="model" :class="[$style.root, invalid && $style.invalid]" :aria-invalid="invalid || undefined" />
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

.invalid {
  border-color: var(--c-warning-text);
}

.multiline {
  display: block;
  resize: vertical;
}
</style>
