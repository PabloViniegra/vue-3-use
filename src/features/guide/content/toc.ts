export interface Topic {
  id: string
  title: string
  // Lo que alguien buscaría en el filtro aunque no salga en el título
  keywords?: string[]
}

export interface Level {
  id: string
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
        keywords: ['framework', 'progresivo', 'querySelector'],
      },
      {
        id: 'empezar',
        title: 'Tu primer proyecto',
        keywords: ['Vite', 'npm create vue', 'script setup', 'Options API', 'SFC', '.vue'],
      },
      {
        id: 'plantillas',
        title: 'Plantillas',
        keywords: ['interpolación', 'v-bind', 'v-on', 'v-html', 'directivas'],
      },
      {
        id: 'reactividad',
        title: 'ref y reactive',
        keywords: ['.value', 'estado'],
      },
      {
        id: 'computed',
        title: 'computed',
        keywords: ['derivado', 'caché'],
      },
      {
        id: 'condicionales-listas',
        title: 'v-if, v-show y v-for',
        keywords: ['key', 'listas', 'condicionales'],
      },
      {
        id: 'formularios',
        title: 'Eventos y v-model',
        keywords: ['v-model', '@submit', 'modificadores', 'eventos', 'input'],
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
        keywords: ['defineProps', 'defineEmits', 'emit', 'props'],
      },
      {
        id: 'slots',
        title: 'Slots',
        keywords: ['v-slot', 'scoped slots', 'template #'],
      },
      {
        id: 'watchers',
        title: 'watch y watchEffect',
        keywords: ['onWatcherCleanup', 'localStorage', 'efectos'],
      },
      {
        id: 'ciclo-de-vida',
        title: 'Ciclo de vida',
        keywords: ['onMounted', 'onUnmounted', 'onUpdated', 'hooks'],
      },
      {
        id: 'composables',
        title: 'Composables',
        keywords: ['use', 'reutilizar lógica', 'hooks'],
      },
      {
        id: 'provide-inject',
        title: 'provide / inject',
        keywords: ['inyección de dependencias', 'prop drilling'],
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
        keywords: ['Proxy', 'toRefs', 'toRef', 'shallowRef', 'markRaw', 'nextTick'],
      },
      {
        id: 'define-model',
        title: 'defineModel',
        keywords: ['v-model', 'modelValue', 'update:modelValue'],
      },
      {
        id: 'template-refs',
        title: 'Template refs',
        keywords: ['useTemplateRef', 'ref', 'defineExpose', 'DOM', 'focus'],
      },
      {
        id: 'built-ins',
        title: 'Transition, Teleport y KeepAlive',
        keywords: ['Transition', 'Teleport', 'KeepAlive', 'animaciones', 'modal'],
      },
      {
        id: 'async',
        title: 'Componentes asíncronos',
        keywords: ['defineAsyncComponent', 'Suspense', 'lazy', 'carga perezosa'],
      },
      {
        id: 'directivas',
        title: 'Directivas propias',
        keywords: ['v-focus', 'custom directives', 'mounted'],
      },
      {
        id: 'rendimiento',
        title: 'Rendimiento',
        keywords: ['shallowRef', 'import()', 'performance', 'optimizar'],
      },
      {
        id: 'typescript',
        title: 'TypeScript',
        keywords: ['lang="ts"', 'withDefaults', 'vue-tsc', 'genéricos', 'tipos'],
      },
    ],
  },
  {
    id: 'ecosistema',
    title: 'Ecosistema',
    summary: 'Las librerías que vas a meter en casi cualquier app real: rutas, estado global y datos del servidor.',
    topics: [
      {
        id: 'mapa-ecosistema',
        title: 'Qué hay alrededor de Vue',
        keywords: ['Nuxt', 'Vitest', 'DevTools', 'Vite', 'plugins', 'app.use'],
      },
      {
        id: 'vue-router',
        title: 'Vue Router',
        keywords: ['rutas', 'RouterLink', 'RouterView', 'useRoute', 'params', 'beforeEach', 'guards'],
      },
      {
        id: 'pinia',
        title: 'Pinia',
        keywords: ['estado global', 'store', 'defineStore', 'storeToRefs', 'Vuex'],
      },
      {
        id: 'tanstack-query',
        title: 'TanStack Query',
        keywords: ['Vue Query', 'useQuery', 'useMutation', 'caché', 'fetch', 'API', 'estado del servidor'],
      },
    ],
  },
]
