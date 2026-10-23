<script setup lang="ts">
import BaseField from '../../../components/ui/BaseField.vue'

defineOptions({ inheritAttrs: false })

defineProps<{ etiqueta: string }>()
</script>

<template>
  <label :class="$style.root">
    {{ etiqueta }}
    <BaseField v-bind="$attrs" :class="$style.input" />
  </label>
</template>

<style module>
.root {
  display: block;
  font-size: var(--font-size-label);
  font-weight: var(--font-weight-medium);
}

.input {
  display: block;
  margin-top: var(--space-xxs);
}
</style>
