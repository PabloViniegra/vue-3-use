<script setup lang="ts">
import { computed, onUnmounted, reactive, ref } from 'vue'
import BaseButton from '../../../components/ui/BaseButton.vue'

interface Entrada {
  nombre: string
  pedidoEn: number
}

const usuarios = [
  { id: 1, nombre: 'Lucía Martín' },
  { id: 2, nombre: 'Jorge Pérez' },
  { id: 3, nombre: 'Ana Ruiz' },
]

// Una caché casera para enseñar la idea; en una app real esto lo lleva TanStack Query
const STALE_MS = 5000
const cache = reactive(new Map<number, Entrada>())
const id = ref<number>()
const fetching = ref(false)
const error = ref('')
const desdeCache = ref(false)
const peticiones = ref(0)
const fallar = ref(false)

// Un timer por usuario: cambiar de usuario no cancela la petición anterior, igual que TanStack Query
const timers = new Map<number, number>()

const dato = computed(() => (id.value ? cache.get(id.value) : undefined))

// Simula la red: en una app real sería la queryFn con su fetch
function pedir(uid: number) {
  fetching.value = true
  error.value = ''

  // Si ya hay una petición en curso para este usuario, se reaprovecha
  if (timers.has(uid)) return
  const falla = fallar.value
  peticiones.value++
  timers.set(
    uid,
    window.setTimeout(() => {
      timers.delete(uid)
      const visible = id.value === uid

      if (visible) fetching.value = false

      if (falla) {
        if (visible) error.value = 'Sin conexión'

        return
      }

      cache.set(uid, { nombre: usuarios.find((u) => u.id === uid)!.nombre, pedidoEn: Date.now() })

      if (visible) desdeCache.value = false
    }, 900),
  )
}

function elegir(uid: number) {
  id.value = uid
  const entrada = cache.get(uid)
  desdeCache.value = !!entrada

  if (!entrada || Date.now() - entrada.pedidoEn > STALE_MS) return pedir(uid)
  fetching.value = false
  error.value = ''
}

// Lo que hace invalidateQueries después de una mutación
function invalidar() {
  cache.forEach((entrada) => (entrada.pedidoEn = 0))

  if (id.value) pedir(id.value)
}

onUnmounted(() => timers.forEach((t) => clearTimeout(t)))
</script>

<template>
  <div :class="$style.row">
    <BaseButton
      v-for="u in usuarios"
      :key="u.id"
      size="sm"
      :variant="id === u.id ? 'brand' : 'alt'"
      :aria-pressed="id === u.id"
      @click="elegir(u.id)"
    >
      Usuario {{ u.id }}
    </BaseButton>
    <BaseButton size="sm" variant="alt" :disabled="cache.size === 0" @click="invalidar">
      Invalidar caché
    </BaseButton>
  </div>
  <label :class="$style.check">
    <input v-model="fallar" type="checkbox" />
    Simular que falla la red
  </label>

  <div :class="$style.out" aria-live="polite">
    <p v-if="!id">Elige un usuario. Todavía no se ha pedido nada.</p>
    <template v-else-if="!dato">
      <p v-if="fetching">Cargando… <code>isPending</code></p>
      <p v-else-if="error">No se pudo cargar: {{ error }}. <code>isError</code></p>
    </template>
    <template v-else>
      <p :class="$style.name">{{ dato.nombre }}</p>
      <p v-if="fetching">Ves la caché mientras se actualiza por detrás. <code>isFetching</code></p>
      <p v-else-if="error">El refresco ha fallado ({{ error }}); sigues viendo el último dato bueno.</p>
      <p v-else-if="desdeCache">Sacado de la caché al instante, sin petición.</p>
      <p v-else>Recién llegado del servidor. Durante 5 s se considera fresco.</p>
    </template>
  </div>
  <p :class="$style.count">Peticiones al servidor: {{ peticiones }}</p>
</template>

<style module>
.row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
}

.check {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  margin-top: var(--space-sm);
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
  margin-top: var(--space-md);
  font-size: var(--font-size-label);
  color: var(--c-text-2);
}

.out p {
  margin: 0 0 var(--space-xxs);
}

.out .name {
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-semibold);
  color: var(--c-text-1);
}

.count {
  margin: var(--space-sm) 0 0;
  font-size: var(--font-size-caption);
  color: var(--c-text-2);
  font-variant-numeric: tabular-nums;
}
</style>
