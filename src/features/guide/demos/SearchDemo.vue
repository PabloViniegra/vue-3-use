<script setup lang="ts">
import { computed, onWatcherCleanup, ref, useTemplateRef, watch } from 'vue'
import BaseButton from '../../../components/ui/BaseButton.vue'
import BaseField from '../../../components/ui/BaseField.vue'

const CAPITALES = [
  'A Coruña', 'Albacete', 'Alicante', 'Almería', 'Ávila', 'Badajoz', 'Barcelona', 'Bilbao',
  'Burgos', 'Cáceres', 'Cádiz', 'Castellón de la Plana', 'Ciudad Real', 'Córdoba', 'Cuenca',
  'Girona', 'Granada', 'Guadalajara', 'Huelva', 'Huesca', 'Jaén', 'Las Palmas de Gran Canaria',
  'León', 'Lleida', 'Logroño', 'Lugo', 'Madrid', 'Málaga', 'Murcia', 'Ourense', 'Oviedo', 'Palencia', 'Palma', 'Pamplona',
  'Pontevedra', 'Salamanca', 'San Sebastián', 'Santa Cruz de Tenerife', 'Santander', 'Segovia',
  'Sevilla', 'Soria', 'Tarragona', 'Teruel', 'Toledo', 'Valencia', 'Valladolid', 'Vitoria',
  'Zamora', 'Zaragoza',
]

const busqueda = ref('')
const fallar = ref(false)
const intento = ref(0)
const resultados = ref<string[]>([])
const cargando = ref(false)
const error = ref('')
const lanzadas = ref(0)
const canceladas = ref(0)
const buscador = useTemplateRef('buscador')

const texto = computed(() => busqueda.value.trim())

const normalizar = (valor: string) => valor.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()

// Simula la red: una respuesta tarda 800 ms y se puede cancelar con un AbortSignal
function pedirCapitales(consulta: string, signal: AbortSignal) {
  return new Promise<string[]>((resolve, reject) => {
    const timer = window.setTimeout(() => {
      if (fallar.value) return reject(new Error('Sin conexión'))
      resolve(CAPITALES.filter((capital) => normalizar(capital).includes(normalizar(consulta))))
    }, 800)

    signal.addEventListener('abort', () => {
      clearTimeout(timer)
      reject(new DOMException('Cancelada', 'AbortError'))
    }, { once: true })
  })
}

watch([texto, intento], async ([consulta]) => {
  error.value = ''

  if (!consulta) {
    cargando.value = false

    return
  }

  const controller = new AbortController()
  let terminada = false

  onWatcherCleanup(() => {
    if (terminada) return
    controller.abort()
    canceladas.value++
  })

  cargando.value = true
  lanzadas.value++

  try {
    resultados.value = await pedirCapitales(consulta, controller.signal)
  } catch (e) {
    if (e instanceof DOMException && e.name === 'AbortError') return
    error.value = e instanceof Error ? e.message : String(e)
  } finally {
    terminada = true

    if (!controller.signal.aborted) cargando.value = false
  }
})

const resumen = computed(() => {
  if (!texto.value) return 'Escribe para buscar. Todavía no se ha pedido nada.'

  if (cargando.value) return `Buscando «${texto.value}»…`

  if (error.value) return `No se ha podido buscar: ${error.value}.`

  if (!resultados.value.length) return `Ninguna capital de provincia contiene «${texto.value}».`

  return resultados.value.length === 1 ? '1 capital encontrada.' : `${resultados.value.length} capitales encontradas.`
})

// El botón desaparece al reintentar: el foco vuelve al buscador para no perderse
function reintentar() {
  buscador.value?.querySelector('input')?.focus()
  intento.value++
}
</script>

<template>
  <div ref="buscador">
    <label for="demo-capitales" :class="$style.label">Busca una capital de provincia</label>
    <BaseField
      id="demo-capitales"
      v-model="busqueda"
      name="capital"
      type="search"
      autocomplete="off"
      spellcheck="false"
      placeholder="Por ejemplo, sev…"
    />
  </div>
  <label :class="$style.check">
    <input v-model="fallar" type="checkbox" />
    Simular que falla la red
  </label>

  <p role="status" :class="$style.summary">{{ resumen }}</p>
  <BaseButton v-if="error && !cargando" size="sm" variant="alt" @click="reintentar">Reintentar</BaseButton>
  <ul v-else-if="texto && !cargando && resultados.length" aria-label="Capitales encontradas" :class="$style.list">
    <li v-for="capital in resultados" :key="capital">{{ capital }}</li>
  </ul>

  <p :class="$style.count">
    Peticiones lanzadas: {{ lanzadas }} · canceladas antes de responder: {{ canceladas }}
  </p>
</template>

<style module>
.label {
  display: block;
  margin-bottom: var(--space-xs);
  font-size: var(--font-size-label);
  font-weight: var(--font-weight-medium);
}

.check {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  margin-top: var(--space-sm);
  font-size: var(--font-size-label);
}

.summary {
  margin: var(--space-sm) 0 var(--space-xs);
  font-size: var(--font-size-label);
}

.list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
  list-style: none;
  margin: 0;
  padding: 0;
}

.list li {
  padding: var(--space-xxs) var(--space-xs);
  font-size: var(--font-size-caption);
  background: var(--c-bg-mute);
  border-radius: var(--radius-md);
}

.count {
  margin: var(--space-sm) 0 0;
  font-size: var(--font-size-caption);
  color: var(--c-text-2);
}
</style>
