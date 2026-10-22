<script setup lang="ts">
import { useTemplateRef } from 'vue'
import BaseField from '../ui/BaseField.vue'

const query = defineModel<string>({ required: true })
const root = useTemplateRef('root')

function onEscape(e: KeyboardEvent) {
  if (!query.value) return
  // Primero vacía el filtro; el siguiente Esc ya cierra el índice en móvil
  e.preventDefault()
  e.stopPropagation()
  query.value = ''
}

defineExpose({ focus: () => root.value?.querySelector('input')?.focus() })
</script>

<template>
  <div ref="root" :class="$style.root" role="search">
    <label class="visually-hidden" for="filtro-temas">Filtrar temas</label>
    <BaseField
      id="filtro-temas"
      v-model="query"
      type="search"
      placeholder="Filtrar temas"
      autocomplete="off"
      @keydown.esc="onEscape"
    />
    <kbd v-if="!query" :class="$style.hint" aria-hidden="true">/</kbd>
  </div>
</template>

<style module>
.root {
  position: relative;
  margin-bottom: var(--space-lg);
}

.root input {
  padding-right: var(--space-xl);
}

.hint {
  position: absolute;
  top: 50%;
  right: var(--space-xs);
  padding: 0 var(--space-xs);
  border: 1px solid var(--c-divider-strong);
  border-radius: var(--radius-sm);
  font-family: inherit;
  font-size: var(--font-size-caption);
  line-height: var(--line-height-label);
  color: var(--c-text-2);
  transform: translateY(-50%);
  pointer-events: none;
}

@media (hover: none) {
  .hint {
    display: none;
  }
}
</style>
