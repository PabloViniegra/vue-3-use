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

export const classStyle = code`
<script setup>
import { ref, computed } from 'vue'

const seleccionado = ref(false)
const hayError = ref(false)
const progreso = ref(40)
const color = ref('#42b883')

// Si la lógica crece, que la devuelva un computed para que la
// plantilla quede limpia
const clases = computed(() => ({
  activo: seleccionado.value,
  'con-error': hayError.value,
}))
</script>

<template>
  <!-- Objeto: la clase está puesta si su valor es verdadero -->
  <button :class="{ activo: seleccionado, 'con-error': hayError }">
    Guardar
  </button>

  <!-- Array: clases fijas y condicionales mezcladas -->
  <button :class="['boton', { activo: seleccionado }]">Guardar</button>

  <!-- Se suma al class de siempre, no lo pisa -->
  <button class="boton" :class="clases">Guardar</button>

  <!-- :style recibe un objeto. Las propiedades van en camelCase
       (backgroundColor) o entre comillas con guion ('background-color') -->
  <div :style="{ width: progreso + '%', backgroundColor: color }" />
</template>
`

export const classStyleCss = code`
<script setup>
import { ref } from 'vue'

const color = ref('#42b883')
const urgente = ref(false)
</script>

<template>
  <!-- Con <style module>, las clases se leen desde $style -->
  <p :class="[$style.aviso, { [$style.urgente]: urgente }]">
    Tu pedido está en camino
  </p>
</template>

<style module>
.aviso {
  /* v-bind() en CSS: usa una variable del script y se actualiza sola */
  border-left: 4px solid v-bind(color);
}

.urgente {
  font-weight: 700;
}
</style>
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

// Precios en céntimos: con decimales, 1.8 * 2 + 2.2 da 5.800000000000001
const total = computed(
  () => cafes.value * 180 + croissants.value * 220,
)
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

export const events = code`
<script setup>
// Sin paréntesis, Vue le pasa el evento nativo
function pulsado(evento) {
  console.log(evento.target.textContent)
}

// Con paréntesis pasas tus argumentos; $event es el evento
function borrar(id, evento) {
  console.log(id, evento.shiftKey)
}
</script>

<template>
  <button @click="pulsado">Hola</button>
  <button @click="borrar(7, $event)">Borrar</button>
</template>
`

export const forms = code`
<script setup>
import { ref } from 'vue'

const nueva = ref('')
const lista = ref([{ id: 'leche', texto: 'Leche de avena' }])

function agregar() {
  const texto = nueva.value.trim()
  if (!texto) return
  // Un id que no se repite, aunque añadas dos en el mismo milisegundo.
  // crypto.randomUUID solo existe con HTTPS o en localhost
  lista.value.push({ id: crypto.randomUUID(), texto })
  nueva.value = ''
}
</script>

<template>
  <form @submit.prevent="agregar">
    <label for="nueva">¿Qué falta?</label>
    <input id="nueva" v-model="nueva" />
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

export const slotsAdvanced = code`
<!-- El nombre del slot puede ser dinámico: #[nombre] -->
<template v-for="columna in columnas" :key="columna.id" #[columna.id]="{ fila }">
  {{ fila[columna.id] }}
</template>

<!-- ConContador.vue: un componente "renderless". Pone la lógica
     y deja todo el HTML a quien lo use -->
<script setup>
import { ref } from 'vue'

const n = ref(0)
</script>

<template>
  <slot :n="n" :sumar="() => n++" />
</template>

<ConContador v-slot="{ n, sumar }">
  <button @click="sumar">{{ n }} clics</button>
</ConContador>
`

export const attrsFallthrough = code`
<!-- BotonBase.vue: una sola raíz, sin declarar ninguna prop -->
<template>
  <button class="base"><slot /></button>
</template>

<!-- class, id, aria-* y @click se aplican solos al <button>.
     El class se suma al que ya tiene, no lo pisa -->
<BotonBase class="grande" aria-label="Guardar" @click="guardar">
  💾
</BotonBase>
`

export const attrsForward = code`
<!-- CampoEtiquetado.vue -->
<script setup>
// Que Vue no los pegue en el <label>, que es la raíz
defineOptions({ inheritAttrs: false })

defineProps({ etiqueta: String })
</script>

<template>
  <label class="campo">
    {{ etiqueta }}
    <!-- Todo lo que sobra (type, maxlength, @input...) va al input -->
    <input v-bind="$attrs" />
  </label>
</template>

<CampoEtiquetado etiqueta="Correo" type="email" maxlength="24" @input="contar" />

<!-- En el script: useAttrs() devuelve lo mismo que $attrs -->
import { useAttrs } from 'vue'
const attrs = useAttrs()
`

export const watchers = code`
import { ref, watch, onWatcherCleanup } from 'vue'

const busqueda = ref('')
const resultados = ref([])

watch(busqueda, async (texto) => {
  const controller = new AbortController()
  // Si busqueda cambia antes de que llegue la respuesta, se
  // cancela
  onWatcherCleanup(() => controller.abort())

  try {
    const url = \`/api/buscar?q=\${encodeURIComponent(texto)}\`
    const res = await fetch(url, { signal: controller.signal })
    if (!res.ok) throw new Error(\`Error \${res.status}\`)
    resultados.value = await res.json()
  } catch (e) {
    // Cancelar no es un error: es justo lo que queríamos
    if (e.name !== 'AbortError') throw e
  }
})
`

export const watchEffectSnippet = code`
import { ref, watchEffect } from 'vue'

const pendientes = ref(3)

// Se ejecuta ya y otra vez cada vez que cambie el valor de pendientes
watchEffect(() => {
  document.title = \`(\${pendientes.value}) Mi bandeja\`
})
`

export const watchOptions = code`
// Un getter: vigila una propiedad concreta de un objeto
watch(() => usuario.edad, (nueva, vieja) => { /* ... */ })

// deep: reacciona también a cambios dentro del objeto.
// Un número (3.5) limita hasta qué profundidad mirar
watch(filtros, recargar, { deep: true })

// immediate: ejecuta el callback ya, sin esperar al primer cambio.
// Útil para cargar la ficha del id con el que nace el componente
watch(id, cargarFicha, { immediate: true })

// once: se ejecuta una vez y se da de baja
watch(token, avisar, { once: true })
`

export const watchControl = code`
import { watch } from 'vue'

// Varias fuentes: el callback recibe un array de valores nuevos
watch([pagina, orden], ([p, o]) => cargarListado(p, o))

// Por defecto el callback corre ANTES de que Vue repinte.
// Con flush: 'post' corre después, con el DOM ya actualizado
watch(mensajes, () => bajarAlFinal(), { flush: 'post' })

// watch devuelve unos mandos (Vue 3.5)
const { stop, pause, resume } = watch(borrador, guardar)

pause()  // los cambios no ejecutan el callback
resume() // si algo cambió en la pausa, corre una vez con el valor actual
stop()   // se acabó: se da de baja y también lanza la limpieza
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

  onMounted(() => {
    window.addEventListener('mousemove', actualizar)
  })
  onUnmounted(() => {
    window.removeEventListener('mousemove', actualizar)
  })

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
// claves.js: con un Symbol, dos claves nunca chocan por nombre
export const claveIdioma = Symbol('idioma')

// App.vue, arriba del todo
import { provide, ref, readonly } from 'vue'
import { claveIdioma } from './claves'

const idioma = ref('es')
function cambiarIdioma(nuevo) {
  idioma.value = nuevo
}

// Los de abajo leen el idioma, pero solo lo cambian por la función
provide(claveIdioma, { idioma: readonly(idioma), cambiarIdioma })

// BotonEnElNivel7.vue, sin que nadie en medio se entere
import { inject } from 'vue'
import { claveIdioma } from './claves'

const { idioma, cambiarIdioma } = inject(claveIdioma)

// main.js: con app.provide lo ven todos los componentes de la app
// createApp(App).provide(claveIdioma, { ... })
`

export const useIdSnippet = code`
<!-- CampoConAyuda.vue -->
<script setup>
import { useId } from 'vue'

defineProps({ etiqueta: String, ayuda: String })

// Un id distinto por cada instancia del componente
const id = useId()
</script>

<template>
  <label :for="id">{{ etiqueta }}</label>
  <input :id="id" :aria-describedby="\`\${id}-ayuda\`" />
  <small :id="\`\${id}-ayuda\`">{{ ayuda }}</small>
</template>
`

export const deepReactivity = code`
import { reactive, toRefs, shallowRef } from 'vue'

const estado = reactive({ nombre: 'Lucía', edad: 31 })

// Mal: al desestructurar te llevas una copia, no una conexión
// edad es un 31 suelto, ya no se entera de nada
const { edad } = estado

// Bien: toRefs convierte cada propiedad en un ref enlazado
const { nombre } = toRefs(estado)
nombre.value = 'Lu'       // estado.nombre también pasa a 'Lu'

// Mal: reasignar la variable
let pedido = reactive({ platos: [] })
pedido = reactive({ platos: ['tortilla'] })
// Con ref no pasa: pedido.value = { platos: ['tortilla'] }

// shallowRef solo reacciona si sustituyes el .value entero
const informe = shallowRef({ filas: [] })
informe.value.filas.push({ id: 1 })       // la vista NO se entera
informe.value = { filas: [{ id: 1 }] }    // ahora sí
`

export const proxyIdea = code`
// Una versión de juguete de reactive(), para que veas la idea
function reactivoDeJuguete(objeto) {
  return new Proxy(objeto, {
    get(target, clave) {
      track(target, clave) // apunta quién lee esta clave
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

export const nextTickSnippet = code`
<script setup>
import { ref, nextTick, useTemplateRef } from 'vue'

const mensajes = ref([])
const lista = useTemplateRef('lista')

async function enviar(texto) {
  mensajes.value.push({ id: crypto.randomUUID(), texto })
  // Aquí el DOM aún no tiene el mensaje nuevo
  await nextTick()
  // Ahora sí: scrollHeight ya cuenta la última fila
  lista.value.scrollTop = lista.value.scrollHeight
}
</script>

<template>
  <ul ref="lista" class="chat">
    <li v-for="m in mensajes" :key="m.id">{{ m.texto }}</li>
  </ul>
</template>
`

export const flushSnippet = code`
import { watch, watchPostEffect } from 'vue'

watch(
  mensajes,
  () => {
    lista.value.scrollTop = lista.value.scrollHeight
  },
  { flush: 'post', deep: true },
)

// Atajo: un watchEffect con flush: 'post'
watchPostEffect(() => {
  console.log('Filas en el DOM:', lista.value?.children.length)
})
`

export const reactivityTools = code`
import {
  ref, shallowRef, triggerRef, toRaw, readonly,
  toValue, watchEffect, effectScope, computed, watch,
} from 'vue'

// triggerRef: mutaste por dentro de un shallowRef y avisas a mano
const filas = shallowRef([])
filas.value.push(nueva)
triggerRef(filas)

// toRaw: el objeto original, sin el Proxy. Para librerías externas
const original = toRaw(estado)

// readonly: una vista de solo lectura del mismo estado.
// Escribir en ella no hace nada y en desarrollo avisa
const soloLectura = readonly(estado)

// toValue: acepta un valor, un ref o un getter (el tipo se llama
// MaybeRefOrGetter). Así un composable acepta lo que le pase quien lo use
function useTitulo(titulo) {
  watchEffect(() => {
    document.title = toValue(titulo)
  })
}
useTitulo('Fijo')
useTitulo(ref('Con ref'))
useTitulo(() => \`Pedidos: \${pedidos.value.length}\`)

// effectScope: agrupa efectos para pararlos todos de golpe.
// Es de nicho: lo usan sobre todo las librerías
const alcance = effectScope()
alcance.run(() => {
  const doble = computed(() => n.value * 2)
  watch(doble, (v) => console.log(v))
})
alcance.stop()
`

export const customRefSnippet = code`
// useRefConRetraso.js
import { customRef, onScopeDispose } from 'vue'

export function useRefConRetraso(valorInicial, ms = 400) {
  let valor = valorInicial
  let temporizador

  // Se limpia solo cuando el componente se desmonta
  onScopeDispose(() => clearTimeout(temporizador))

  return customRef((track, trigger) => ({
    get() {
      track() // apunta quién lo lee
      return valor
    },
    set(nuevo) {
      clearTimeout(temporizador)
      temporizador = setTimeout(() => {
        valor = nuevo
        trigger() // avisa a quien lo leyó
      }, ms)
    },
  }))
}

// const busqueda = useRefConRetraso('')
// Escribir en busqueda.value no avisa a nadie hasta 400 ms después
`

export const defineModelSnippet = code`
<!-- CampoBusqueda.vue -->
<script setup>
const texto = defineModel({ default: '' })
// Un segundo v-model, con nombre
const orden = defineModel('orden')
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

export const defineModelAdvanced = code`
<!-- CampoNombre.vue -->
<script setup lang="ts">
// Tipado y obligatorio: quien lo use tiene que pasar v-model:edad
const edad = defineModel<number>('edad', { required: true })

// Con el array recibes también los modificadores del v-model
const [nombre, modificadores] = defineModel<string>('nombre', {
  // get transforma lo que lees; set, lo que escribes
  set(valor) {
    return modificadores.mayusculas ? valor.toUpperCase() : valor
  },
})
</script>

<template>
  <input v-model="nombre" />
  <input v-model.number="edad" type="number" />
</template>

<!-- Quien lo usa -->
<CampoNombre v-model:nombre.mayusculas="titular" v-model:edad="anios" />
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
`

export const builtInsExtra = code`
<template>
  <!-- mode="out-in": primero sale lo viejo y luego entra lo nuevo -->
  <Transition name="fade" mode="out-in">
    <component :is="pagina" :key="pagina.name" />
  </Transition>

  <!-- TransitionGroup anima altas, bajas y cambios de orden -->
  <TransitionGroup name="lista" tag="ul">
    <li v-for="t in tareas" :key="t.id">{{ t.texto }}</li>
  </TransitionGroup>

  <!-- Solo cachea esas pestañas, y como mucho 3 a la vez -->
  <KeepAlive include="Ajustes,Perfil" :max="3">
    <component :is="pestana" />
  </KeepAlive>

  <!-- Teleport: el aviso se pinta en <body>, fuera de cualquier overflow -->
  <Teleport to="body">
    <div v-if="aviso" role="status" class="toast">{{ aviso }}</div>
  </Teleport>

  <!-- Un <dialog> modal ya vive en la capa superior del navegador y
       trae Esc, foco y fondo inerte de serie -->
  <dialog ref="modal">
    <p>¿Seguro que quieres borrarlo?</p>
    <button @click="modal.close()">Cancelar</button>
  </dialog>
</template>

<script setup>
import { onActivated, onDeactivated, useTemplateRef } from 'vue'

const modal = useTemplateRef('modal')
// Para abrirlo: modal.value.showModal()

// Dentro de un componente cacheado por KeepAlive
onActivated(() => { /* vuelve a verse: refresca lo que haga falta */ })
onDeactivated(() => { /* se oculta pero sigue vivo: pausa lo que gaste */ })
</script>
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
  timeout: 5000, // pasado este tiempo, se da por fallido
  // Reintenta un par de veces antes de enseñar el error
  onError(error, retry, fail, intentos) {
    if (intentos <= 2) retry()
    else fail()
  },
})
`

export const hydration = code`
import { defineAsyncComponent, hydrateOnVisible } from 'vue'

// Solo en renderizado en servidor: el HTML ya llega pintado,
// pero el componente no se "enciende" hasta que entra en pantalla
const Comentarios = defineAsyncComponent({
  loader: () => import('./Comentarios.vue'),
  hydrate: hydrateOnVisible(),
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

export const pluginSnippet = code`
// plugins/avisos.js
import { reactive, readonly } from 'vue'

export const claveAvisos = Symbol('avisos')

export const avisos = {
  // app es la aplicación; opciones, lo que pases en app.use
  install(app, { maximo = 5 } = {}) {
    const lista = reactive([])

    // Lo recoge cualquier componente con inject(claveAvisos)
    app.provide(claveAvisos, {
      lista: readonly(lista),
      avisar(texto) {
        lista.push(texto)
        if (lista.length > maximo) lista.shift()
      },
    })

    // También puedes registrar directivas o componentes globales
    app.directive('autofocus', { mounted: (el) => el.focus() })
  },
}

// main.js
createApp(App).use(avisos, { maximo: 3 }).mount('#app')
`

export const errorHandling = code`
// main.js: la red de seguridad final. Recibe lo que nadie capturó
app.config.errorHandler = (err, instancia, info) => {
  // info dice dónde ocurrió: 'setup function', 'native event handler'...
  // En producción llega un código corto en lugar del texto
  reportarError(err, info)
}

<!-- ErrorBoundary.vue -->
<script setup>
import { ref, onErrorCaptured } from 'vue'

const error = ref(null)

// Solo ve errores de sus descendientes, no los suyos
onErrorCaptured((err) => {
  error.value = err
  return false // el error no sigue subiendo
})
</script>

<template>
  <p v-if="error" role="alert">Algo ha fallado: {{ error.message }}</p>
  <slot v-else />
</template>
`

export const performance = code`
<!-- Se pinta una vez y Vue se olvida de él -->
<footer v-once>© {{ anio }} Panadería Lucía</footer>

<!-- La fila solo se re-renderiza si cambia lo del array -->
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
import { onMounted, useTemplateRef, watch } from 'vue'

interface Props {
  titulo: string
  likes?: number
}

// Desestructurar props es reactivo desde Vue 3.5
const { titulo, likes = 0 } = defineProps<Props>()

// watch(titulo, ...) es un error de compilación:
// pásalo como getter
watch(() => titulo, (nuevo) => console.log(nuevo))

const emit = defineEmits<{
  like: [total: number]
  borrar: []
}>()

function darLike() {
  emit('like', likes + 1)
}

const campo = useTemplateRef<HTMLInputElement>('campo')
onMounted(() => campo.value?.focus())
</script>
`

export const genericComponent = code`
<!-- Lista.vue: sirve para cualquier tipo de elemento -->
<script setup lang="ts" generic="T extends { id: number }">
defineProps<{ items: T[] }>()
defineEmits<{ elegir: [item: T] }>()
</script>

<template>
  <ul>
    <li v-for="item in items" :key="item.id">
      <button type="button" @click="$emit('elegir', item)">
        <slot :item="item">{{ item.id }}</slot>
      </button>
    </li>
  </ul>
</template>

<!-- T se deduce de items: aquí elegir recibe un usuario -->
<Lista :items="usuarios" @elegir="(u) => console.log(u.nombre)" />
`

export const typedContracts = code`
<!-- Tarjeta.vue: los slots también tienen contrato -->
<script setup lang="ts">
defineSlots<{
  default(): unknown
  titulo(props: { destacado: boolean }): unknown
}>()
</script>

// claves.ts: InjectionKey liga la clave con el tipo de lo inyectado
import { inject, provide, ref, type InjectionKey, type Ref } from 'vue'

export const claveIdioma: InjectionKey<Ref<string>> = Symbol('idioma')

provide(claveIdioma, ref('es'))

// quizas es Ref<string> | undefined: puede que nadie lo haya provisto
const quizas = inject(claveIdioma)

// Con un valor por defecto, ya es Ref<string>
const idioma = inject(claveIdioma, ref('es'))
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
    // El resto de páginas se descarga la primera vez que se abre
    {
      path: '/productos',
      name: 'productos',
      component: () => import('./pages/Productos.vue'),
    },
    {
      path: '/productos/:id',
      name: 'producto',
      component: () => import('./pages/Producto.vue'),
    },
    {
      path: '/cuenta',
      name: 'cuenta',
      component: () => import('./pages/Cuenta.vue'),
      meta: { requiereLogin: true },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./pages/Login.vue'),
    },
    // Cualquier otra URL: la página de 404
    {
      path: '/:pathMatch(.*)*',
      name: 'no-encontrada',
      component: () => import('./pages/NoEncontrada.vue'),
    },
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

export const routerNested = code`
// Si /cuenta tiene varias subpáginas, son rutas hijas
{
  path: '/cuenta',
  component: () => import('./pages/CuentaLayout.vue'), // lleva un <RouterView />
  meta: { requiereLogin: true }, // to.meta hereda el de los padres
  children: [
    { path: '', name: 'cuenta', component: () => import('./pages/Resumen.vue') },
    // Se resuelve como /cuenta/pedidos
    { path: 'pedidos', name: 'pedidos', component: () => import('./pages/Pedidos.vue') },
  ],
},
`

export const routerExtras = code`
// router.js: dónde se queda el scroll al navegar
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, guardada) {
    // guardada existe si vuelves con el botón atrás
    return guardada ?? { top: 0 }
  },
})

<!-- pages/Producto.vue -->
<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, onBeforeRouteLeave } from 'vue-router'

const route = useRoute()
const id = computed(() => Number(route.params.id))
const hayCambios = ref(false)

// De /productos/7 a /productos/42 el componente se reutiliza:
// onMounted no vuelve a ejecutarse. Reacciona al parámetro
// (cargarProducto es tu función que pide los datos)
watch(id, cargarProducto, { immediate: true })

// Guard dentro del componente: false cancela la navegación
onBeforeRouteLeave(() => {
  if (hayCambios.value) return window.confirm('¿Salir sin guardar?')
})
</script>
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
<!-- Cabecera.vue: no conoce Catalogo.vue, pero ve sus datos -->
<script setup>
import { storeToRefs } from 'pinia'
import { useCarrito } from '@/stores/carrito'

const carrito = useCarrito()

// Desestructurar sin más rompe la reactividad: usa storeToRefs
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
  // al cambiar id se pide el usuario nuevo (o sale de la caché)
  queryKey: ['usuario', id],
  queryFn: () => pedirUsuario(id.value),
  // Durante 5 segundos el dato se considera fresco (en una app real
  // suele ser más: un minuto, o lo que aguante tu dato)
  staleTime: 5_000,
})
</script>

<template>
  <p v-if="isPending">Cargando…</p>
  <p v-else-if="isError">
    No se pudo cargar: {{ error.message }}
  </p>
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
    // Sin esto, un 400 o un 500 contaría como guardado e
    // invalidaría la caché
    if (!res.ok) throw new Error(\`Error \${res.status}\`)
    return res.json()
  },
  // Tras guardar, lo que había en caché ya no vale: que se
  // vuelva a pedir
  onSuccess: () =>
    queryClient.invalidateQueries({ queryKey: ['usuario'] }),
})
</script>

<template>
  <button
    :disabled="isPending"
    @click="mutate({ nombre: 'Lucía' })"
  >
    {{ isPending ? 'Guardando…' : 'Cambiar nombre' }}
  </button>
</template>
`

export const testingInstall = code`
npm install -D vitest @vue/test-utils jsdom
`

export const testingConfig = code`
// vite.config.js
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  // jsdom simula un navegador para que mount tenga un DOM
  test: { environment: 'jsdom' },
})
`

export const testingSnippet = code`
// BotonLike.test.js
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import BotonLike from './BotonLike.vue'

describe('BotonLike', () => {
  it('pinta los likes que recibe', () => {
    const wrapper = mount(BotonLike, { props: { likes: 3 } })
    expect(wrapper.text()).toContain('3')
  })

  it('avisa al padre al pulsar', async () => {
    const wrapper = mount(BotonLike, { props: { likes: 0 } })

    // trigger devuelve una promesa: espera a que el DOM se actualice
    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted('like')).toHaveLength(1)
  })
})
`
