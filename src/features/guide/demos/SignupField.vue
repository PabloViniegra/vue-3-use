<script setup lang="ts">
import { useId } from 'vue'
import BaseField from '../../../components/ui/BaseField.vue'

defineOptions({ inheritAttrs: false })

const { etiqueta, error = '' } = defineProps<{ etiqueta: string; error?: string }>()
const valor = defineModel<string>({ required: true })
const id = useId()
</script>

<template>
  <div>
    <label :for="id" :class="$style.label">{{ etiqueta }}</label>
    <BaseField :id="id" v-model="valor" v-bind="$attrs" :invalid="!!error" :aria-describedby="`${id}-error`" />
    <p :id="`${id}-error`" :class="$style.error">
      <template v-if="error">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M12 4 2.5 20h19L12 4Zm0 6v5m0 2.5v.01" />
        </svg>
        <span>{{ error }}</span>
      </template>
    </p>
  </div>
</template>

<style module>
.label {
  display: block;
  margin-bottom: var(--space-xxs);
  font-size: var(--font-size-label);
  font-weight: var(--font-weight-medium);
}

.error {
  display: flex;
  align-items: flex-start;
  gap: var(--space-xxs);
  margin: var(--space-xxs) 0 0;
  font-size: var(--font-size-caption);
}

.error:empty {
  margin: 0;
}

.error svg {
  flex-shrink: 0;
  width: var(--icon-md);
  height: var(--icon-md);
  color: var(--c-warning-text);
}
</style>
