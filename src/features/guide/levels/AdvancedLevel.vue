<script setup lang="ts">
import AdvancedInternals from './AdvancedInternals.vue'
import AdvancedReactivity from './AdvancedReactivity.vue'
import AdvancedTooling from './AdvancedTooling.vue'
</script>

<!-- Partido en tres para que ningún archivo pase de 250 líneas -->
<template>
  <AdvancedReactivity />
  <AdvancedInternals />
  <AdvancedTooling />
</template>
