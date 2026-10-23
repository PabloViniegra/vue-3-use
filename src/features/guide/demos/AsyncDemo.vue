<script setup lang="ts">
import { type Component, defineAsyncComponent, h, onErrorCaptured, onUnmounted, ref, shallowRef } from 'vue'
import BaseButton from '../../../components/ui/BaseButton.vue'

const fallar = ref(false)
const panel = shallowRef<Component>()
const timers = new Set<number>()
const GRAFICO = 'GraficoVentas ya está aquí. Su código se ha pedido ahora, no al abrir la página.'
const ERROR = 'No se pudo descargar. Desmarca el fallo y vuelve a intentarlo.'

// Simula la descarga: en una app real aquí iría import('./GraficoVentas.vue')
function descargar(falla: boolean) {
  return new Promise<Component>((resolve, reject) => {
    const id = window.setTimeout(() => {
      timers.delete(id)

      if (falla) reject(new Error('Sin conexión'))
      else resolve({ render: () => h('p', GRAFICO) })
    }, 1200)

    timers.add(id)
  })
}

// Cada intento crea un componente nuevo: uno que ya falló no vuelve a pedir el código
function cargar() {
  const falla = fallar.value
  panel.value = defineAsyncComponent({
    loader: () => descargar(falla),
    loadingComponent: { render: () => h('p', 'Descargando el componente…') },
    errorComponent: { render: () => h('p', { role: 'alert' }, ERROR) },
    delay: 200,
  })
}

// El fallo es simulado y ya lo pinta el errorComponent: que no llegue a la consola
onErrorCaptured((err) => !(err instanceof Error && err.message === 'Sin conexión'))

onUnmounted(() => timers.forEach((id) => clearTimeout(id)))
</script>

<template>
  <div :class="$style.row">
    <BaseButton size="sm" @click="cargar">
      {{ panel ? 'Reintentar carga' : 'Cargar el gráfico' }}
    </BaseButton>
    <label :class="$style.check">
      <input v-model="fallar" type="checkbox" />
      Simular que falla la red
    </label>
  </div>
  <div :class="$style.out" aria-live="polite">
    <component :is="panel" v-if="panel" />
    <p v-else>Todavía no se ha descargado nada.</p>
  </div>
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

.out {
  min-height: var(--space-3xl);
  margin-top: var(--space-sm);
  font-size: var(--font-size-label);
  color: var(--c-text-2);
}

.out p {
  margin: 0;
}
</style>
