<script setup lang="ts">
import BaseButton from '../../../components/ui/BaseButton.vue'

function explotar() {
  throw new Error('error lanzado en el manejador de clic')
}
</script>

<template>
  <BaseButton size="sm" @click="explotar">Pulsar el botón roto</BaseButton>
</template>
