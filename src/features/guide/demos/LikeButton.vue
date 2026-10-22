<script setup lang="ts">
import BaseButton from '../../../components/ui/BaseButton.vue'

defineProps<{ likes: number }>()

const emit = defineEmits<{ like: [] }>()
</script>

<template>
  <BaseButton :aria-label="`Me gusta: ${likes}`" @click="emit('like')">
    <span aria-hidden="true">♥</span> {{ likes }}
  </BaseButton>
</template>
