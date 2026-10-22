<script setup lang="ts">
import { useTemplateRef } from 'vue'

const query = defineModel<string>({ required: true })
const input = useTemplateRef('input')

function clear() {
  query.value = ''
  input.value?.focus()
}

function onEscape(e: KeyboardEvent) {
  if (!query.value) return
  // Primero vacía el filtro; el siguiente Esc ya cierra el índice en móvil
  e.preventDefault()
  e.stopPropagation()
  query.value = ''
}

defineExpose({ focus: () => input.value?.focus() })
</script>

<template>
  <div :class="$style.root" role="search">
    <label class="visually-hidden" for="filtro-temas">Filtrar temas</label>
    <svg :class="$style.icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m16 16 4 4" />
    </svg>
    <input
      id="filtro-temas"
      ref="input"
      v-model="query"
      :class="$style.input"
      type="search"
      name="tema"
      placeholder="Prueba con Pinia…"
      autocomplete="off"
      aria-keyshortcuts="/"
      @keydown.esc="onEscape"
    />
    <button v-if="query" type="button" :class="$style.clear" aria-label="Vaciar filtro" @click="clear">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true">
        <path d="m7 7 10 10M17 7 7 17" />
      </svg>
    </button>
    <kbd v-if="!query" :class="$style.hint" aria-hidden="true">/</kbd>
  </div>
</template>

<style module>
.root {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  min-height: var(--button-lg-height);
  padding: 0 var(--space-xs) 0 var(--space-sm);
  margin-bottom: var(--space-lg);
  color: var(--c-text-2);
  background: var(--c-bg);
  border: 1px solid var(--c-control-border);
  border-radius: var(--radius-lg);
}

.root:focus-within {
  border-color: var(--c-focus);
  outline: var(--focus-ring) solid var(--c-focus);
  outline-offset: var(--focus-ring);
}

.icon {
  flex-shrink: 0;
  width: var(--icon-md);
  height: var(--icon-md);
  pointer-events: none;
}

.root:focus-within .icon {
  color: var(--c-brand-text);
}

.input {
  width: 100%;
  min-width: 0;
  padding: var(--space-xs) 0;
  border: 0;
  outline: none;
  font: inherit;
  font-size: var(--font-size-body-sm);
  color: var(--c-text-1);
  caret-color: var(--c-brand-text);
  background: transparent;
  appearance: none;
}

.input::placeholder {
  color: var(--c-text-2);
}

.input::-webkit-search-cancel-button,
.input::-webkit-search-decoration {
  appearance: none;
}

.clear {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: var(--button-sm-height);
  height: var(--button-sm-height);
  padding: 0;
  border: 0;
  border-radius: var(--radius-md);
  color: var(--c-text-2);
  background: transparent;
  cursor: pointer;
}

.clear:hover,
.clear:active {
  color: var(--c-text-1);
  background: var(--c-bg-mute);
}

.clear svg {
  width: var(--icon-md);
  height: var(--icon-md);
}

.hint {
  flex-shrink: 0;
  padding: 0 var(--space-xs);
  border: 1px solid var(--c-divider-strong);
  border-radius: var(--radius-sm);
  font-family: inherit;
  font-size: var(--font-size-caption);
  line-height: var(--line-height-label);
  color: var(--c-text-2);
  pointer-events: none;
}

@media (hover: none) {
  .hint {
    display: none;
  }
}
</style>
