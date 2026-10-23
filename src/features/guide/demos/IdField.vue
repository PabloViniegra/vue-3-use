<script setup lang="ts">
import { useId } from 'vue'
import BaseField from '../../../components/ui/BaseField.vue'

defineProps<{ etiqueta: string; ayuda: string }>()

const id = useId()
</script>

<template>
  <div>
    <label :for="id" :class="$style.label">{{ etiqueta }}</label>
    <BaseField :id="id" :aria-describedby="`${id}-ayuda`" />
    <!-- El id queda fuera de la descripción: el lector no tiene por qué leerlo en cada foco -->
    <small :class="$style.help">
      <span :id="`${id}-ayuda`">{{ ayuda }}</span> · id: <code>{{ id }}</code>
    </small>
  </div>
</template>

<style module>
.label {
  display: block;
  margin-bottom: var(--space-xxs);
  font-size: var(--font-size-label);
  font-weight: var(--font-weight-medium);
}

.help {
  display: block;
  margin-top: var(--space-xxs);
  font-size: var(--font-size-caption);
  color: var(--c-text-2);
}

.help code {
  font-size: inherit;
}
</style>
