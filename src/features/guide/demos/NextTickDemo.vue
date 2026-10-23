<script setup lang="ts">
import { nextTick, ref, useTemplateRef } from 'vue'
import BaseButton from '../../../components/ui/BaseButton.vue'

const mensajes = ref<{ id: number; texto: string }[]>([])
const esperar = ref(true)
const lista = useTemplateRef('lista')
let siguiente = 1

async function enviar() {
  mensajes.value.push({ id: siguiente, texto: `Mensaje ${siguiente}` })
  siguiente++

  // El DOM todavía no tiene la fila nueva: sin esperar, el scroll llega a la anterior
  if (esperar.value) await nextTick()

  if (lista.value) lista.value.scrollTop = lista.value.scrollHeight
}
</script>

<template>
  <div :class="$style.row">
    <BaseButton size="sm" @click="enviar">Enviar mensaje</BaseButton>
    <label :class="$style.check">
      <input v-model="esperar" type="checkbox" />
      Esperar con <code>nextTick</code>
    </label>
  </div>
  <div ref="lista" role="log" aria-label="Mensajes" tabindex="0" :class="$style.log">
    <p v-if="mensajes.length === 0" :class="$style.empty">Sin mensajes todavía. Envía el primero.</p>
    <p v-for="m in mensajes" :key="m.id" :class="$style.msg">{{ m.texto }}</p>
  </div>
  <p :class="$style.hint">
    Desmárcalo y envía varios: el scroll se queda siempre un mensaje por encima del último.
  </p>
</template>

<style module>
.row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-sm) var(--space-lg);
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

.log {
  height: var(--demo-area-height);
  margin-top: var(--space-sm);
  padding: var(--space-xs) var(--space-sm);
  overflow-y: auto;
  background: var(--c-bg);
  border: 1px solid var(--c-control-border);
  border-radius: var(--radius-lg);
}

.msg {
  margin: 0;
  padding: var(--space-xs) 0;
  border-bottom: 1px solid var(--c-divider);
}

.empty {
  margin: 0;
  padding: var(--space-xs) 0;
  color: var(--c-text-2);
}

.hint {
  margin: var(--space-sm) 0 0;
  font-size: var(--font-size-label);
  color: var(--c-text-2);
}
</style>
