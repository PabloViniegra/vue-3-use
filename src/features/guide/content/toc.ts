export interface Topic {
  id: string
  title: string
  // Lo que alguien buscaría en el filtro aunque no salga en el título
  keywords?: string[]
}

export type LevelId = 'basico' | 'intermedio' | 'avanzado' | 'ecosistema'

export interface Level {
  id: LevelId
  title: string
  summary: string
  topics: Topic[]
}

export const levels: Level[] = [
  {
    id: 'basico',
    title: 'Básico',
    summary: 'Qué es Vue, cómo se pinta algo en pantalla y cómo hacer que cambie solo.',
    topics: [
      {
        id: 'que-es',
        title: 'Qué es Vue',
        keywords: ['framework', 'progresivo', 'querySelector', 'interfaces reactivas'],
      },
      {
        id: 'empezar',
        title: 'Tu primer proyecto',
        keywords: [
          'Vite',
          'npm create vue',
          'script setup',
          'Options API',
          'SFC',
          '.vue',
          'scoped',
          'estilos',
          'CSS',
          'crear una app con Vue',
        ],
      },
      {
        id: 'plantillas',
        title: 'Plantillas',
        keywords: ['interpolación', 'v-bind', 'v-on', 'v-html', 'directivas', 'mostrar datos en pantalla'],
      },
      {
        id: 'reactividad',
        title: 'ref y reactive',
        keywords: ['.value', 'estado', 'actualizar la interfaz al cambiar un dato'],
      },
      {
        id: 'computed',
        title: 'computed',
        keywords: ['derivado', 'caché', 'calcular un valor a partir de otros'],
      },
      {
        id: 'condicionales-listas',
        title: 'v-if, v-show y v-for',
        keywords: ['key', 'listas', 'condicionales', 'mostrar u ocultar elementos', 'repetir una lista'],
      },
      {
        id: 'clases-estilos',
        title: 'Clases y estilos dinámicos',
        keywords: [':class', ':style', 'v-bind:class', 'v-bind() en CSS', 'CSS Modules', 'cambiar el aspecto según el estado'],
      },
      {
        id: 'formularios',
        title: 'Eventos y v-model',
        keywords: ['v-model', '@submit', 'modificadores', 'eventos', 'input', 'enviar un formulario'],
      },
    ],
  },
  {
    id: 'intermedio',
    title: 'Intermedio',
    summary: 'Partir la app en componentes que se hablan entre sí y reutilizar lógica.',
    topics: [
      {
        id: 'componentes',
        title: 'Props y eventos',
        keywords: ['defineProps', 'defineEmits', 'emit', 'props', 'pasar datos al hijo', 'avisar al padre'],
      },
      {
        id: 'slots',
        title: 'Slots',
        keywords: ['v-slot', 'scoped slots', 'template #', 'insertar contenido en un componente'],
      },
      {
        id: 'atributos-heredados',
        title: 'Atributos heredados',
        keywords: ['$attrs', 'useAttrs', 'inheritAttrs', 'defineOptions', 'fallthrough', 'class en un componente', 'reenviar atributos'],
      },
      {
        id: 'watchers',
        title: 'watch y watchEffect',
        keywords: ['onWatcherCleanup', 'flush', 'pause', 'resume', 'stop', 'localStorage', 'efectos', 'reaccionar cuando cambia un valor'],
      },
      {
        id: 'ciclo-de-vida',
        title: 'Ciclo de vida',
        keywords: ['onMounted', 'onUnmounted', 'onUpdated', 'hooks', 'lifecycle', 'al montar un componente'],
      },
      {
        id: 'template-refs',
        title: 'Template refs',
        keywords: ['useTemplateRef', 'ref', 'defineExpose', 'DOM', 'focus', 'acceder al DOM', 'enfocar un input'],
      },
      {
        id: 'composables',
        title: 'Composables',
        keywords: ['use', 'reutilizar lógica', 'hooks'],
      },
      {
        id: 'provide-inject',
        title: 'provide / inject',
        keywords: ['inyección de dependencias', 'prop drilling', 'InjectionKey', 'readonly', 'pasar datos a componentes lejanos'],
      },
      {
        id: 'use-id',
        title: 'useId',
        keywords: ['id único', 'label for', 'accesibilidad', 'aria-describedby', 'SSR', 'ids repetidos'],
      },
    ],
  },
  {
    id: 'avanzado',
    title: 'Avanzado',
    summary: 'Lo que pasa por debajo, las piezas internas de Vue y cómo exprimirlas.',
    topics: [
      {
        id: 'reactividad-a-fondo',
        title: 'Reactividad a fondo',
        keywords: ['Proxy', 'toRefs', 'toRef', 'shallowRef', 'markRaw', 'track', 'trigger'],
      },
      {
        id: 'next-tick',
        title: 'nextTick y el DOM',
        keywords: ['nextTick', 'flush', 'post', 'sync', 'actualización en lote', 'el DOM no se ha actualizado', 'scroll al final'],
      },
      {
        id: 'utilidades-reactividad',
        title: 'Utilidades de reactividad',
        keywords: ['customRef', 'triggerRef', 'toRaw', 'readonly', 'toValue', 'MaybeRefOrGetter', 'effectScope', 'debounce'],
      },
      {
        id: 'define-model',
        title: 'defineModel',
        keywords: ['v-model', 'modelValue', 'update:modelValue', 'modificadores', 'v-model en un componente hijo'],
      },
      {
        id: 'built-ins',
        title: 'Transition, Teleport y KeepAlive',
        keywords: ['Transition', 'TransitionGroup', 'Teleport', 'KeepAlive', 'animaciones', 'modal', 'dialog'],
      },
      {
        id: 'async',
        title: 'Componentes asíncronos',
        keywords: [
          'defineAsyncComponent',
          'Suspense',
          'lazy',
          'carga perezosa',
          'loadingComponent',
          'errorComponent',
          'hydrateOnVisible',
          'hidratación',
          'cargar componentes cuando se necesitan',
        ],
      },
      {
        id: 'directivas',
        title: 'Directivas propias',
        keywords: ['v-focus', 'custom directives', 'mounted', 'añadir comportamiento a un elemento'],
      },
      {
        id: 'plugins-errores',
        title: 'Plugins y gestión de errores',
        keywords: ['app.use', 'install', 'app.config.errorHandler', 'onErrorCaptured', 'globalProperties', 'capturar errores'],
      },
      {
        id: 'rendimiento',
        title: 'Rendimiento',
        keywords: ['shallowRef', 'v-once', 'v-memo', 'import()', 'performance', 'optimizar'],
      },
      {
        id: 'typescript',
        title: 'TypeScript',
        keywords: ['lang="ts"', 'withDefaults', 'vue-tsc', 'genéricos', 'defineSlots', 'InjectionKey', 'tipos', 'tipar props y eventos'],
      },
    ],
  },
  {
    id: 'ecosistema',
    title: 'Ecosistema',
    summary: 'Las librerías que suelen acompañar a Vue: rutas, estado global y datos del servidor.',
    topics: [
      {
        id: 'mapa-ecosistema',
        title: 'Qué hay alrededor de Vue',
        keywords: ['Nuxt', 'Vitest', 'DevTools', 'Vite', 'plugins', 'app.use', 'librerías para Vue'],
      },
      {
        id: 'vue-router',
        title: 'Vue Router',
        keywords: [
          'rutas',
          'RouterLink',
          'RouterView',
          'useRoute',
          'params',
          'beforeEach',
          'guards',
          'rutas anidadas',
          'children',
          'scrollBehavior',
          'onBeforeRouteLeave',
          'cambiar de página sin recargar',
        ],
      },
      {
        id: 'pinia',
        title: 'Pinia',
        keywords: [
          'estado global',
          'store',
          'defineStore',
          'storeToRefs',
          'Vuex',
          'compartir estado entre componentes',
        ],
      },
      {
        id: 'tanstack-query',
        title: 'TanStack Query',
        keywords: [
          'Vue Query',
          'useQuery',
          'useMutation',
          'caché',
          'fetch',
          'API',
          'estado del servidor',
          'isPending',
          'carga y errores',
          'pedir datos a una API',
          'guardar respuestas en caché',
        ],
      },
      {
        id: 'testing',
        title: 'Testing',
        keywords: ['Vitest', 'Vue Test Utils', 'mount', 'wrapper', 'emitted', 'flushPromises', 'tests de componentes', 'probar un componente'],
      },
    ],
  },
]

// Cierre de la guía: no es un nivel, pero tiene entrada propia en el índice
export const closing = { id: 'y-ahora-que', title: 'Y ahora, ¿qué?' }
