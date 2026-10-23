<script setup lang="ts">
import { onErrorCaptured, ref, useTemplateRef, watch } from 'vue'
import BaseButton from '../../../components/ui/BaseButton.vue'
import BombButton from './BombButton.vue'

const error = ref<Error>()
const zona = useTemplateRef('zona')

// Solo ve los errores de sus descendientes. Con false no sigue subiendo ni llega a la consola
onErrorCaptured((err) => {
  error.value = err instanceof Error ? err : new Error(String(err))

  return false
})

// Cada botón sustituye al otro: sin esto el foco caería al principio de la página
watch(error, () => zona.value?.querySelector('button')?.focus(), { flush: 'post' })
</script>

<template>
  <div ref="zona">
    <template v-if="error">
      <p role="alert" :class="$style.error">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M12 4 2.5 20h19L12 4Zm0 6v5m0 2.5v.01" />
        </svg>
        <span><code>onErrorCaptured</code> ha recogido esto: {{ error.message }}.</span>
      </p>
      <BaseButton size="sm" variant="alt" @click="error = undefined">Reintentar</BaseButton>
    </template>
    <template v-else>
      <BombButton />
      <p :class="$style.hint">
        El error salta en el hijo y lo recoge el <code>onErrorCaptured</code> de este componente.
      </p>
    </template>
  </div>
</template>

<style module>
.error {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  margin: 0 0 var(--space-sm);
  padding: var(--space-xs) var(--space-sm);
  font-size: var(--font-size-label);
  background: var(--c-warning-soft);
  border: 1px solid var(--c-warning);
  border-radius: var(--radius-md);
}

.error svg {
  flex-shrink: 0;
  width: var(--icon-md);
  height: var(--icon-md);
  color: var(--c-warning-text);
}

.hint {
  margin: var(--space-sm) 0 0;
  font-size: var(--font-size-label);
  color: var(--c-text-2);
}
</style>
