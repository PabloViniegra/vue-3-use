import { code } from './snippets.ts'
import type { LevelId } from './toc.ts'

export interface Challenge {
  id: string
  title: string
  intro: string
  // Los fragmentos entre acentos graves se pintan como código
  requirements: string[]
  // El primer archivo es el que se monta
  starter: Record<string, string>
  solution: Record<string, string>
}

const tareasStarter = code`
<script setup>
import { ref } from 'vue'

const tareas = ref([
  { id: 1, texto: 'Leer el nivel Básico', hecha: true },
  { id: 2, texto: 'Resolver este reto', hecha: false },
])
const nueva = ref('')
let siguienteId = 3

// 1. Crea un computed con el número de tareas sin hacer.

function agregar() {
  // 2. Si hay texto, añade la tarea (usa siguienteId++) y vacía el campo.
}
</script>

<template>
  <h1>Mis tareas</h1>

  <!-- 3. Conecta el formulario con agregar() y el campo con nueva. -->
  <form @submit.prevent>
    <input aria-label="Nueva tarea" placeholder="Nueva tarea" />
    <button>Añadir</button>
  </form>

  <!-- 4. Pinta un <li> por tarea. El checkbox la marca y, si está hecha,
       el label lleva la clase "hecha". -->
  <ul>
    <li>
      <label><input type="checkbox" /> Una tarea de ejemplo</label>
    </li>
  </ul>

  <!-- 5. Cambia las interrogaciones por los números de verdad.
       Si no queda ninguna, enseña "¡Todo hecho!" en su lugar. -->
  <p>Te quedan ? de ?</p>
</template>

<style>
.hecha {
  text-decoration: line-through;
}
</style>
`

const tareasSolution = code`
<script setup>
import { computed, ref } from 'vue'

const tareas = ref([
  { id: 1, texto: 'Leer el nivel Básico', hecha: true },
  { id: 2, texto: 'Resolver este reto', hecha: false },
])
const nueva = ref('')
let siguienteId = 3

const pendientes = computed(() => tareas.value.filter((tarea) => !tarea.hecha).length)

function agregar() {
  if (!nueva.value) return

  tareas.value.push({ id: siguienteId++, texto: nueva.value, hecha: false })
  nueva.value = ''
}
</script>

<template>
  <h1>Mis tareas</h1>

  <form @submit.prevent="agregar">
    <input v-model.trim="nueva" aria-label="Nueva tarea" placeholder="Nueva tarea" />
    <button>Añadir</button>
  </form>

  <ul>
    <li v-for="tarea in tareas" :key="tarea.id">
      <label :class="{ hecha: tarea.hecha }">
        <input v-model="tarea.hecha" type="checkbox" /> {{ tarea.texto }}
      </label>
    </li>
  </ul>

  <p v-if="pendientes">Te quedan {{ pendientes }} de {{ tareas.length }}</p>
  <p v-else>¡Todo hecho!</p>
</template>

<style>
.hecha {
  text-decoration: line-through;
}
</style>
`

const notaAppStarter = code`
<script setup>
import { ref } from 'vue'
import Estrellas from './Estrellas.vue'

const nota = ref(3)
const cambios = ref([])

// 5. Con un watcher sobre nota, añade a cambios un objeto
//    { id, texto } con el texto "De 3 a 5" (anterior y nueva).
</script>

<template>
  <!-- 4. Pásale la nota y el máximo, escucha su evento y
       pon el título "¿Qué te ha parecido el nivel?" en su slot. -->
  <Estrellas />

  <p>Tu nota: {{ nota }} de 5</p>

  <h2>Historial</h2>
  <p v-if="!cambios.length">Todavía no has cambiado la nota.</p>
  <ol v-else>
    <li v-for="cambio in cambios" :key="cambio.id">{{ cambio.texto }}</li>
  </ol>
</template>
`

const notaStarsStarter = code`
<script setup>
// 1. Declara las props nota y maximo, y el evento valorar.
</script>

<template>
  <p class="titulo">
    <!-- 2. Deja aquí un slot para que el padre ponga el título. -->
  </p>

  <!-- 3. Pinta un botón por estrella: ★ hasta la nota y ☆ después.
       Al pulsarlo, avisa al padre con el número de esa estrella. -->
  <button type="button" class="estrella" aria-label="1 de 5">☆</button>
</template>

<style>
.titulo {
  font-weight: 600;
}

.estrella {
  font-size: 1.5rem;
}
</style>
`

const notaAppSolution = code`
<script setup>
import { ref, watch } from 'vue'
import Estrellas from './Estrellas.vue'

const nota = ref(3)
const cambios = ref([])

watch(nota, (nueva, anterior) => {
  cambios.value.push({
    id: cambios.value.length,
    texto: 'De ' + anterior + ' a ' + nueva,
  })
})
</script>

<template>
  <Estrellas :nota="nota" :maximo="5" @valorar="nota = $event">
    ¿Qué te ha parecido el nivel?
  </Estrellas>

  <p>Tu nota: {{ nota }} de 5</p>

  <h2>Historial</h2>
  <p v-if="!cambios.length">Todavía no has cambiado la nota.</p>
  <ol v-else>
    <li v-for="cambio in cambios" :key="cambio.id">{{ cambio.texto }}</li>
  </ol>
</template>
`

const notaStarsSolution = code`
<script setup>
defineProps({
  nota: { type: Number, required: true },
  maximo: { type: Number, default: 5 },
})

const emit = defineEmits(['valorar'])
</script>

<template>
  <p class="titulo">
    <slot />
  </p>

  <button
    v-for="n in maximo"
    :key="n"
    type="button"
    class="estrella"
    :aria-label="n + ' de ' + maximo"
    :aria-pressed="n === nota"
    @click="emit('valorar', n)"
  >
    {{ n <= nota ? '★' : '☆' }}
  </button>
</template>

<style>
.titulo {
  font-weight: 600;
}

.estrella {
  font-size: 1.5rem;
}
</style>
`

const etiquetasApp = code`
<script setup lang="ts">
import { ref } from 'vue'
import CampoEtiquetas from './CampoEtiquetas.vue'

const etiquetas = ref(['vue', 'pinia'])
</script>

<template>
  <h1>Etiquetas del artículo</h1>

  <CampoEtiquetas v-model="etiquetas" />

  <p>El padre ve: {{ etiquetas.join(', ') || 'ninguna' }}</p>
  <button type="button" :disabled="!etiquetas.length" @click="etiquetas = []">
    Quitar todas
  </button>
</template>
`

const etiquetasStyles = `
<style>
.etiquetas {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 0;
  list-style: none;
}

.etiquetas li {
  padding: 2px 4px 2px 12px;
  border: 1px solid;
  border-radius: 999px;
}

.etiqueta-enter-active,
.etiqueta-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}

.etiqueta-enter-from,
.etiqueta-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

@media (prefers-reduced-motion: reduce) {
  .etiqueta-enter-active,
  .etiqueta-leave-active {
    transition: none;
  }
}
</style>`

const etiquetasFieldStarter = code`
<script setup lang="ts">
import { ref } from 'vue'

// 1. Recibe el v-model del padre con defineModel (es un string[]).
const texto = ref('')

function agregar() {
  // 2. Añade el texto en minúsculas y sin espacios alrededor, y vacía
  //    el campo. Ni vacías ni repetidas. Ojo: no mutes el array que
  //    te llega, asigna uno nuevo.
}

function quitar(etiqueta: string) {
  // 3. Quita la etiqueta, también con un array nuevo.
}
</script>

<template>
  <form @submit.prevent="agregar">
    <input v-model="texto" aria-label="Nueva etiqueta" placeholder="Escribe y pulsa Enter" />
  </form>

  <!-- 4. Cambia el <ul> por un TransitionGroup con name="etiqueta" (las
       clases ya están abajo) y pinta un <li> por etiqueta. El botón
       necesita un nombre accesible: "Quitar vue". -->
  <ul class="etiquetas">
    <li>
      ejemplo
      <button type="button" @click="quitar('ejemplo')">×</button>
    </li>
  </ul>
</template>
${etiquetasStyles}
`

const etiquetasFieldSolution = code`
<script setup lang="ts">
import { ref } from 'vue'

const etiquetas = defineModel<string[]>({ required: true })
const texto = ref('')

function agregar() {
  const nueva = texto.value.trim().toLowerCase()
  texto.value = ''

  if (!nueva || etiquetas.value.includes(nueva)) return

  // Con push cambiarías el array del padre sin emitir update:modelValue
  etiquetas.value = [...etiquetas.value, nueva]
}

function quitar(etiqueta: string) {
  etiquetas.value = etiquetas.value.filter((actual) => actual !== etiqueta)
}
</script>

<template>
  <form @submit.prevent="agregar">
    <input v-model="texto" aria-label="Nueva etiqueta" placeholder="Escribe y pulsa Enter" />
  </form>

  <TransitionGroup name="etiqueta" tag="ul" class="etiquetas">
    <li v-for="etiqueta in etiquetas" :key="etiqueta">
      {{ etiqueta }}
      <button type="button" :aria-label="'Quitar ' + etiqueta" @click="quitar(etiqueta)">×</button>
    </li>
  </TransitionGroup>
</template>
${etiquetasStyles}
`

const recetas = `const recetas = [
  { id: 'tortilla', nombre: 'Tortilla de patatas' },
  { id: 'gazpacho', nombre: 'Gazpacho' },
  { id: 'paella', nombre: 'Paella' },
]`

const recetasStyles = `
<style>
.recetas {
  padding: 0;
  list-style: none;
}

.recetas li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 8px 0;
  border-top: 1px solid;
}
</style>`

const favoritosAppStarter = code`
<script setup>
import Resumen from './Resumen.vue'

${recetas}

// 2. Usa el store de favoritos.
</script>

<template>
  <Resumen />

  <ul class="recetas">
    <li v-for="receta in recetas" :key="receta.id">
      {{ receta.nombre }}
      <!-- 3. Al pulsar, alterna la receta en el store. El texto pasa a
           "♥ Guardada" y aria-pressed a true cuando es favorita. -->
      <button type="button">♡ Guardar</button>
    </li>
  </ul>
</template>
${recetasStyles}
`

const favoritosStoreStarter = code`
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

// 1. Completa el store: el estado es la lista de ids favoritos.
export const useFavoritos = defineStore('favoritos', () => {
  const ids = ref([])

  // total: un computed con cuántos hay
  // esFavorito(id): devuelve true o false
  // alternar(id): lo añade si no está y lo quita si está
  // vaciar(): los quita todos

  return { ids }
})
`

const favoritosSummaryStarter = code`
<script setup>
// 4. Lee el total del mismo store, sin props ni eventos.
</script>

<template>
  <p>
    <strong>Favoritas: ?</strong>
    <!-- 5. Vacía el store al pulsar; sin favoritas, el botón va deshabilitado. -->
    <button type="button">Quitar todas</button>
  </p>
</template>
`

const favoritosAppSolution = code`
<script setup>
import { useFavoritos } from './favoritos.js'
import Resumen from './Resumen.vue'

${recetas}

const favoritos = useFavoritos()
</script>

<template>
  <Resumen />

  <ul class="recetas">
    <li v-for="receta in recetas" :key="receta.id">
      {{ receta.nombre }}
      <button
        type="button"
        :aria-pressed="favoritos.esFavorito(receta.id)"
        @click="favoritos.alternar(receta.id)"
      >
        {{ favoritos.esFavorito(receta.id) ? '♥ Guardada' : '♡ Guardar' }}
      </button>
    </li>
  </ul>
</template>
${recetasStyles}
`

const favoritosStoreSolution = code`
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useFavoritos = defineStore('favoritos', () => {
  const ids = ref([])

  const total = computed(() => ids.value.length)

  function esFavorito(id) {
    return ids.value.includes(id)
  }

  function alternar(id) {
    if (esFavorito(id)) ids.value = ids.value.filter((actual) => actual !== id)
    else ids.value.push(id)
  }

  function vaciar() {
    ids.value = []
  }

  return { ids, total, esFavorito, alternar, vaciar }
})
`

const favoritosSummarySolution = code`
<script setup>
import { useFavoritos } from './favoritos.js'

const favoritos = useFavoritos()
</script>

<template>
  <p>
    <strong>Favoritas: {{ favoritos.total }}</strong>
    <button type="button" :disabled="!favoritos.total" @click="favoritos.vaciar()">
      Quitar todas
    </button>
  </p>
</template>
`

export const challenges: Record<LevelId, Challenge> = {
  basico: {
    id: 'reto-basico',
    title: 'Reto: lista de tareas',
    intro:
      'Ya sabes pintar datos, hacerlos reactivos y escuchar eventos. Ahora júntalo todo en un solo componente.',
    requirements: [
      'Escribir en el campo y pulsar «Añadir» (o Enter) añade la tarea al final y vacía el campo.',
      'Un texto vacío o solo con espacios no añade nada.',
      'Marcar el checkbox tacha la tarea y desmarcarlo la deja como estaba.',
      'Debajo se lee «Te quedan N de M», calculado con `computed`.',
      'Cuando no queda ninguna, ese texto cambia a «¡Todo hecho!».',
    ],
    starter: { 'App.vue': tareasStarter },
    solution: { 'App.vue': tareasSolution },
  },
  intermedio: {
    id: 'reto-intermedio',
    title: 'Reto: valoración con estrellas',
    intro:
      'Toca repartir el trabajo entre dos componentes: un hijo que pinta las estrellas y un padre que manda sobre la nota.',
    requirements: [
      '`Estrellas.vue` recibe `nota` y `maximo` por props y no cambia la nota por su cuenta: avisa al padre con el evento `valorar`.',
      'Se ven 5 estrellas: rellenas (★) hasta la nota y vacías (☆) después.',
      'Pulsar una estrella actualiza «Tu nota: N de 5».',
      'El título de encima de las estrellas lo pone `App.vue` a través de un slot.',
      'Cada cambio de nota añade una línea al historial («De 3 a 5») desde un watcher. Pulsar la nota que ya tienes no añade nada.',
    ],
    starter: { 'App.vue': notaAppStarter, 'Estrellas.vue': notaStarsStarter },
    solution: { 'App.vue': notaAppSolution, 'Estrellas.vue': notaStarsSolution },
  },
  avanzado: {
    id: 'reto-avanzado',
    title: 'Reto: campo de etiquetas',
    intro:
      'Un componente de formulario de los que acaban en una librería interna: con `v-model` propio, tipos y animación. `App.vue` ya está hecho; lo tuyo es `CampoEtiquetas.vue`.',
    requirements: [
      '`CampoEtiquetas.vue` implementa su `v-model` con `defineModel`, sin declarar props ni emits a mano.',
      'Escribir una etiqueta y pulsar Enter la añade en minúsculas y vacía el campo. Las vacías y las repetidas no se añaden.',
      'Cada etiqueta lleva un botón × con nombre accesible («Quitar vue») que la elimina.',
      '«El padre ve: …» coincide siempre con las etiquetas, y «Quitar todas» las borra desde el padre.',
      'Las etiquetas entran y salen con una transición de `TransitionGroup`.',
      'El hijo nunca muta el array que recibe: asigna uno nuevo.',
    ],
    starter: { 'App.vue': etiquetasApp, 'CampoEtiquetas.vue': etiquetasFieldStarter },
    solution: { 'App.vue': etiquetasApp, 'CampoEtiquetas.vue': etiquetasFieldSolution },
  },
  ecosistema: {
    id: 'reto-ecosistema',
    title: 'Reto: favoritos con Pinia',
    intro:
      'Dos componentes que no se pasan nada entre ellos y aun así van sincronizados, porque leen el mismo store. Pinia ya está instalado en la app del playground con `app.use(createPinia())`.',
    requirements: [
      'El estado vive en el store de `favoritos.js`, no en `App.vue`.',
      'El botón de cada receta alterna entre «♡ Guardar» y «♥ Guardada».',
      '`Resumen.vue` muestra «Favoritas: N» leyendo el mismo store, sin props ni eventos.',
      '«Quitar todas» vacía el store y todos los botones vuelven a «♡ Guardar». Sin favoritas, está deshabilitado.',
      'El total es un getter del store (un `computed`), no una cuenta hecha en el componente.',
    ],
    starter: {
      'App.vue': favoritosAppStarter,
      'favoritos.js': favoritosStoreStarter,
      'Resumen.vue': favoritosSummaryStarter,
    },
    solution: {
      'App.vue': favoritosAppSolution,
      'favoritos.js': favoritosStoreSolution,
      'Resumen.vue': favoritosSummarySolution,
    },
  },
}
