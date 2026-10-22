// Los snippets viven aquí y no en los .vue: un "</script>" dentro de un
// <script> de SFC cerraría el bloque antes de tiempo.
const code = (s: TemplateStringsArray, ...values: unknown[]) =>
  String.raw({ raw: s }, ...values).replace(/^\n/, '').trimEnd()

export const createProject = code`
npm create vue@latest
cd mi-proyecto
npm install
npm run dev
`

export const firstSfc = code`
<script setup>
import { ref } from 'vue'

const nombre = ref('Lucía')
</script>

<template>
  <h1>Hola, {{ nombre }}</h1>
</template>

<style scoped>
h1 { color: #42b883; }
</style>
`

export const optionsApi = code`
// Options API: la verás en proyectos con unos años
export default {
  data() {
    return { contador: 0 }
  },
  methods: {
    sumar() {
      this.contador++
    }
  }
}
`

export const templateSyntax = code`
<template>
  <!-- Texto: doble llave -->
  <p>{{ mensaje }}</p>

  <!-- Valen expresiones de JS, no sentencias -->
  <p>{{ precio * 1.21 }} € con IVA</p>
  <p>{{ hayStock ? 'Disponible' : 'Agotado' }}</p>

  <!-- Atributos dinámicos: v-bind o su atajo ":" -->
  <img :src="avatarUrl" :alt="nombre" />

  <!-- Eventos: v-on o su atajo "@" -->
  <button @click="saludar">Saluda</button>
</template>
`

export const reactivity = code`
<script setup>
import { ref, reactive } from 'vue'

const contador = ref(0)
const usuario = reactive({ nombre: 'Lucía', edad: 31 })

function sumar() {
  contador.value++   // ref en JS: siempre con .value
  usuario.edad++     // reactive: sin .value
}
</script>

<template>
  <!-- En la plantilla Vue quita el .value por ti -->
  <button @click="sumar">{{ contador }} clics</button>
  <p>{{ usuario.nombre }} tiene {{ usuario.edad }} años</p>
</template>
`

export const computedSnippet = code`
import { ref, computed } from 'vue'

const cafes = ref(2)
const croissants = ref(1)

const total = computed(() => cafes.value * 1.8 + croissants.value * 2.2)
// total.value solo se recalcula si cambian cafes o croissants
`

export const conditionals = code`
<template>
  <p v-if="carrito.length === 0">El carrito está vacío</p>
  <p v-else-if="carrito.length > 10">Eso ya es una mudanza</p>
  <p v-else>Llevas {{ carrito.length }} productos</p>

  <!-- v-show solo oculta con CSS: el elemento sigue en el DOM -->
  <aside v-show="mostrarAyuda">Pulsa Enter para buscar</aside>

  <ul>
    <li v-for="producto in carrito" :key="producto.id">
      {{ producto.nombre }}
    </li>
  </ul>
</template>
`

export const forms = code`
<script setup>
import { ref } from 'vue'

const nueva = ref('')
const lista = ref([{ id: 1, texto: 'Leche de avena' }])

function agregar() {
  const texto = nueva.value.trim()
  if (!texto) return
  lista.value.push({ id: Date.now(), texto })
  nueva.value = ''
}
</script>

<template>
  <form @submit.prevent="agregar">
    <input v-model="nueva" placeholder="¿Qué falta?" />
    <button>Añadir</button>
  </form>

  <ul>
    <li v-for="item in lista" :key="item.id">{{ item.texto }}</li>
  </ul>
</template>
`

export const childComponent = code`
<!-- BotonLike.vue -->
<script setup>
defineProps({
  likes: { type: Number, required: true }
})
const emit = defineEmits(['like'])
</script>

<template>
  <button @click="emit('like')">♥ {{ likes }}</button>
</template>
`

export const parentComponent = code`
<!-- Post.vue -->
<script setup>
import { ref } from 'vue'
import BotonLike from './BotonLike.vue'

const likes = ref(0)
</script>

<template>
  <BotonLike :likes="likes" @like="likes++" />
</template>
`

export const slots = code`
<!-- Tarjeta.vue -->
<template>
  <article class="tarjeta">
    <header>
      <slot name="titulo">Sin título</slot>
    </header>
    <slot />
  </article>
</template>

<!-- Quien la usa decide el contenido -->
<Tarjeta>
  <template #titulo>Tortilla de patatas</template>
  <p>Con cebolla. Este debate está cerrado.</p>
</Tarjeta>
`

export const scopedSlots = code`
<!-- ListaUsuarios.vue: pone los datos -->
<li v-for="u in usuarios" :key="u.id">
  <slot :usuario="u" />
</li>

<!-- El padre pone el diseño de cada fila -->
<ListaUsuarios v-slot="{ usuario }">
  <strong>{{ usuario.nombre }}</strong>
</ListaUsuarios>
`

export const watchers = code`
import { ref, watch, watchEffect, onWatcherCleanup } from 'vue'

const busqueda = ref('')
const resultados = ref([])

watch(busqueda, async (texto) => {
  const controller = new AbortController()
  // Si busqueda cambia antes de que llegue la respuesta, se cancela
  onWatcherCleanup(() => controller.abort())

  try {
    const res = await fetch(\`/api/buscar?q=\${encodeURIComponent(texto)}\`, {
      signal: controller.signal
    })
    if (!res.ok) throw new Error(\`Error \${res.status}\`)
    resultados.value = await res.json()
  } catch (e) {
    // Cancelar no es un error: es justo lo que queríamos
    if (e.name !== 'AbortError') throw e
  }
})

// watchEffect vigila todo lo reactivo que lea, sin decirle qué
watchEffect(() => {
  document.title = \`\${resultados.value.length} resultados\`
})
`

export const watchOptions = code`
watch(() => usuario.edad, (nueva, vieja) => { /* ... */ }) // un getter
watch(filtros, recargar, { deep: true })      // cambios dentro del objeto
watch(id, cargarFicha, { immediate: true })   // también al arrancar
watch(token, avisar, { once: true })          // solo la primera vez
`

export const lifecycle = code`
import { onMounted, onUnmounted } from 'vue'

function ajustar() { /* recalcular el layout */ }

onMounted(() => {
  // El componente ya está en el DOM: puedes medir, enfocar
  // o engancharte a APIs del navegador
  window.addEventListener('resize', ajustar)
})

onUnmounted(() => {
  // Deja el piso como lo encontraste
  window.removeEventListener('resize', ajustar)
})
`

export const composable = code`
// composables/useRaton.js
import { ref, onMounted, onUnmounted } from 'vue'

export function useRaton() {
  const x = ref(0)
  const y = ref(0)

  function actualizar(e) {
    x.value = e.pageX
    y.value = e.pageY
  }

  onMounted(() => window.addEventListener('mousemove', actualizar))
  onUnmounted(() => window.removeEventListener('mousemove', actualizar))

  return { x, y }
}
`

export const composableUsage = code`
<script setup>
import { useRaton } from './composables/useRaton'

const { x, y } = useRaton()
</script>

<template>El ratón está en {{ x }}, {{ y }}</template>
`

export const provideInject = code`
// App.vue, arriba del todo
import { provide, ref } from 'vue'

const idioma = ref('es')
provide('idioma', idioma)

// BotonEnElNivel7.vue, sin que nadie en medio se entere
import { inject } from 'vue'

const idioma = inject('idioma', 'es') // el segundo argumento es el valor por defecto
`

export const deepReactivity = code`
import { ref, reactive, toRefs, shallowRef, nextTick } from 'vue'

const estado = reactive({ nombre: 'Lucía', edad: 31 })

// Mal: al desestructurar te llevas una copia, no una conexión
const { edad } = estado   // edad es un 31 suelto, ya no se entera de nada

// Bien: toRefs convierte cada propiedad en un ref enlazado
const { nombre } = toRefs(estado)
nombre.value = 'Lu'       // estado.nombre también pasa a 'Lu'

// shallowRef solo reacciona si sustituyes el .value entero
const informe = shallowRef({ filas: [] })
informe.value.filas.push(fila)            // la vista NO se entera
informe.value = { filas: nuevasFilas }    // ahora sí

// Vue agrupa los cambios y actualiza el DOM después
const contador = ref(0)
contador.value++
await nextTick()
// aquí el DOM ya refleja el nuevo valor
`

export const proxyIdea = code`
// Una versión de juguete de reactive(), para que veas la idea
function reactivoDeJuguete(objeto) {
  return new Proxy(objeto, {
    get(target, clave) {
      track(target, clave)    // apunta quién está leyendo esta clave
      return target[clave]
    },
    set(target, clave, valor) {
      target[clave] = valor
      trigger(target, clave)  // avisa solo a quien la leyó
      return true
    }
  })
}
`

export const defineModelSnippet = code`
<!-- CampoBusqueda.vue -->
<script setup>
const texto = defineModel({ default: '' })
const orden = defineModel('orden') // un segundo v-model con nombre
</script>

<template>
  <input v-model="texto" type="search" />
  <select v-model="orden">
    <option value="fecha">Fecha</option>
    <option value="precio">Precio</option>
  </select>
</template>

<!-- Quien lo usa -->
<CampoBusqueda v-model="busqueda" v-model:orden="criterio" />
`

export const templateRefs = code`
<script setup>
import { useTemplateRef, onMounted } from 'vue'

const campo = useTemplateRef('buscador')

onMounted(() => campo.value?.focus())
</script>

<template>
  <input ref="buscador" type="search" />
</template>
`

export const builtIns = code`
<template>
  <!-- Transition: entrada y salida animadas -->
  <Transition name="fade">
    <p v-if="visible">Guardado</p>
  </Transition>

  <!-- Teleport: se pinta en otro lugar del DOM -->
  <Teleport to="body">
    <div v-if="modalAbierto" class="modal">...</div>
  </Teleport>

  <!-- KeepAlive: conserva el estado al cambiar de pestaña -->
  <KeepAlive>
    <component :is="pestanaActual" />
  </KeepAlive>
</template>

<style>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
`

export const asyncComponent = code`
import { defineAsyncComponent } from 'vue'

// El código del gráfico solo se descarga cuando se va a pintar
const GraficoVentas = defineAsyncComponent(() =>
  import('./GraficoVentas.vue')
)

// Con opciones: qué enseñar mientras carga y si falla
const MapaTiendas = defineAsyncComponent({
  loader: () => import('./MapaTiendas.vue'),
  loadingComponent: CargandoMapa,
  errorComponent: ErrorMapa,
  delay: 200, // si tarda menos, ni se ve el "cargando"
})
`

export const suspense = code`
<!-- PanelVentas.vue tiene un await en su script setup -->
<Suspense>
  <PanelVentas />
  <template #fallback>
    <p>Cargando ventas...</p>
  </template>
</Suspense>
`

export const directive = code`
<script setup>
// En script setup, cualquier variable que empiece por "v"
// en camelCase se puede usar como directiva
const vAutofocus = {
  mounted: (el) => el.focus()
}
</script>

<template>
  <input v-autofocus />
</template>
`

export const performance = code`
<!-- Se pinta una vez y Vue se olvida de él -->
<footer v-once>© {{ anio }} Panadería Lucía</footer>

<!-- La fila solo se re-renderiza si cambia lo que hay en el array -->
<div
  v-for="fila in filas"
  :key="fila.id"
  v-memo="[fila.id === seleccionada]"
>
  ...
</div>
`

export const typescript = code`
<script setup lang="ts">
import { useTemplateRef, watch } from 'vue'

interface Props {
  titulo: string
  likes?: number
}

// Desestructurar props es reactivo desde Vue 3.5
const { titulo, likes = 0 } = defineProps<Props>()

// Pero titulo suelto es un valor: para vigilarlo, pásalo como getter
watch(() => titulo, (nuevo) => console.log(nuevo))

const emit = defineEmits<{
  like: [id: number]
  borrar: []
}>()

const campo = useTemplateRef<HTMLInputElement>('campo')
</script>
`

export const genericComponent = code`
<!-- Lista.vue: sirve para cualquier tipo de elemento -->
<script setup lang="ts" generic="T extends { id: number }">
defineProps<{ items: T[] }>()
defineEmits<{ elegir: [item: T] }>()
</script>
`


export const ecosystemInstall = code`
npm install vue-router pinia @tanstack/vue-query
`

export const ecosystemMain = code`
// main.js: cada librería es un plugin que se registra una vez
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'
import App from './App.vue'
import { router } from './router'

createApp(App)
  .use(router)
  .use(createPinia())
  .use(VueQueryPlugin)
  .mount('#app')
`

export const routerSetup = code`
// router.js
import { createRouter, createWebHistory } from 'vue-router'
import Inicio from './pages/Inicio.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'inicio', component: Inicio },
    // Las demás páginas se descargan la primera vez que se visitan
    { path: '/productos', name: 'productos', component: () => import('./pages/Productos.vue') },
    { path: '/productos/:id', name: 'producto', component: () => import('./pages/Producto.vue') },
    {
      path: '/cuenta',
      name: 'cuenta',
      component: () => import('./pages/Cuenta.vue'),
      meta: { requiereLogin: true },
    },
    { path: '/login', name: 'login', component: () => import('./pages/Login.vue') },
    // Cualquier otra URL: la página de 404
    { path: '/:pathMatch(.*)*', name: 'no-encontrada', component: () => import('./pages/NoEncontrada.vue') },
  ],
})
`

export const routerView = code`
<!-- App.vue -->
<template>
  <nav>
    <RouterLink to="/">Inicio</RouterLink>
    <RouterLink :to="{ name: 'productos' }">Productos</RouterLink>
  </nav>

  <!-- Aquí se pinta la página que toque según la URL -->
  <RouterView />
</template>
`

export const routerParams = code`
<!-- pages/Producto.vue -->
<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// En /productos/42, route.params.id vale '42' (siempre string)
const id = computed(() => Number(route.params.id))

function volver() {
  router.push({ name: 'productos' })
}
</script>

<template>
  <h1>Producto {{ id }}</h1>
  <button @click="volver">Volver al listado</button>
</template>
`

export const routerGuard = code`
// router.js: se ejecuta antes de cada navegación
router.beforeEach((to) => {
  if (to.meta.requiereLogin && !estaLogueado()) {
    // Devolver una ruta redirige; no devolver nada deja pasar
    return { name: 'login', query: { volver: to.fullPath } }
  }
})
`

export const pinia = code`
// stores/carrito.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCarrito = defineStore('carrito', () => {
  // state
  const items = ref([])

  // getters
  const unidades = computed(() => items.value.length)
  const total = computed(() =>
    items.value.reduce((suma, item) => suma + item.precio, 0)
  )

  // actions
  function agregar(producto) {
    items.value.push(producto)
  }

  function vaciar() {
    items.value = []
  }

  return { items, unidades, total, agregar, vaciar }
})
`

export const piniaUsage = code`
<!-- Cabecera.vue: no sabe nada de Catalogo.vue, pero ve los mismos datos -->
<script setup>
import { storeToRefs } from 'pinia'
import { useCarrito } from '@/stores/carrito'

const carrito = useCarrito()

// Desestructurar directamente rompe la reactividad: usa storeToRefs
const { unidades, total } = storeToRefs(carrito)
// Las actions son funciones normales, esas sí se sacan tal cual
const { vaciar } = carrito
</script>

<template>
  <span>🛒 {{ unidades }} · {{ total }} €</span>
  <button @click="vaciar">Vaciar</button>
</template>
`

export const queryBasic = code`
<script setup>
import { ref } from 'vue'
import { useQuery } from '@tanstack/vue-query'

const id = ref(1)

async function pedirUsuario(id) {
  const res = await fetch(\`/api/usuarios/\${id}\`)
  // fetch no falla con un 404: hay que lanzar el error a mano
  if (!res.ok) throw new Error(\`Error \${res.status}\`)
  return res.json()
}

const { data, error, isPending, isError, isFetching } = useQuery({
  // La clave identifica el dato en la caché. Como lleva un ref,
  // al cambiar id se pide el usuario nuevo (o se saca de la caché)
  queryKey: ['usuario', id],
  queryFn: () => pedirUsuario(id.value),
  staleTime: 60_000, // durante un minuto el dato se considera fresco
})
</script>

<template>
  <p v-if="isPending">Cargando…</p>
  <p v-else-if="isError">No se pudo cargar: {{ error.message }}</p>
  <template v-else>
    <h2>{{ data.nombre }}</h2>
    <small v-if="isFetching">Actualizando…</small>
  </template>
</template>
`

export const queryMutation = code`
<script setup>
import { useMutation, useQueryClient } from '@tanstack/vue-query'

const queryClient = useQueryClient()

const { mutate, isPending } = useMutation({
  mutationFn: async (cambios) => {
    const res = await fetch('/api/usuarios/1', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cambios),
    })
    // Sin esto, un 400 o un 500 contaría como guardado e invalidaría la caché
    if (!res.ok) throw new Error(\`Error \${res.status}\`)
    return res.json()
  },
  // Tras guardar, lo que había en caché ya no vale: que se vuelva a pedir
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ['usuario'] }),
})
</script>

<template>
  <button :disabled="isPending" @click="mutate({ nombre: 'Lucía' })">
    {{ isPending ? 'Guardando…' : 'Cambiar nombre' }}
  </button>
</template>
`
