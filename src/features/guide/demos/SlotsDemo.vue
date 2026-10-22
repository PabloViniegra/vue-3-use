<script setup lang="ts">
import { ref } from 'vue'
import SlotCard from './SlotCard.vue'

const platos = {
  tortilla: { titulo: 'Tortilla de patatas', texto: 'Con cebolla. Este debate está cerrado.' },
  croquetas: { titulo: 'Croquetas de jamón', texto: 'Las de la abuela, que no se discuten.' },
}

const plato = ref<keyof typeof platos>('tortilla')
const conTitulo = ref(true)
</script>

<template>
  <fieldset :class="$style.options">
    <legend :class="$style.legend">Contenido que pasa el padre</legend>
    <label v-for="(p, key) in platos" :key="key" :class="$style.check">
      <input v-model="plato" type="radio" name="slots-demo-plato" :value="key" />
      {{ p.titulo }}
    </label>
    <label :class="$style.check">
      <input v-model="conTitulo" type="checkbox" />
      Rellenar el slot <code>#titulo</code>
    </label>
  </fieldset>
  <div aria-live="polite">
    <SlotCard>
      <template v-if="conTitulo" #titulo>{{ platos[plato].titulo }}</template>
      <p>{{ platos[plato].texto }}</p>
    </SlotCard>
  </div>
</template>

<style module>
.options {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs) var(--space-lg);
  margin: 0 0 var(--space-md);
  padding: 0;
  border: 0;
}

.legend {
  width: 100%;
  margin-bottom: var(--space-xs);
  padding: 0;
  font-size: var(--font-size-label);
  color: var(--c-text-2);
}

.check {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  font-size: var(--font-size-label);
  cursor: pointer;
}

.check input {
  width: var(--switch-knob);
  height: var(--switch-knob);
  margin: 0;
  accent-color: var(--c-brand);
}
</style>
