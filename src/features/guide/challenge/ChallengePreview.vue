<script setup lang="ts">
import { compileFile, File as ReplFile, Sandbox, useStore } from '@vue/repl'
import { computed, onMounted, onUnmounted, ref, useTemplateRef, watch } from 'vue'
import vueUrl from 'vue/dist/vue.runtime.esm-browser.js?url'
// Como texto y no como URL: el servidor de desarrollo reescribiría su import de "vue" y cargaría un segundo Vue.
// Por ruta porque el campo exports de Pinia no expone dist/
import piniaSource from '../../../../node_modules/pinia/dist/pinia.esm-browser.prod.js?raw'
import { useTheme } from '../../../composables/useTheme'
import tokensCss from '../../../styles/tokens.css?raw'

const { files, label } = defineProps<{ files: Record<string, string>; label: string }>()

const { isDark } = useTheme()
const toPath = (name: string) => `src/${name}`

// Uno por página: cada vista lo importa desde la misma URL
const piniaUrl = URL.createObjectURL(new Blob([piniaSource], { type: 'text/javascript' }))

const store = useStore({
  files: ref(
    Object.fromEntries(Object.entries(files).map(([name, code]) => [toPath(name), new ReplFile(toPath(name), code)])),
  ),
  mainFile: ref(toPath(Object.keys(files)[0] ?? 'App.vue')),
  // Vue y Pinia salen del propio sitio: el reto no depende de ningún CDN
  builtinImportMap: ref({
    imports: {
      vue: new URL(vueUrl, document.baseURI).href,
      pinia: piniaUrl,
    },
  }),
  // El sandbox carga siempre un polyfill de import maps desde un CDN; los navegadores actuales no lo necesitan
  resourceLinks: ref({ esModuleShims: 'data:text/javascript,' }),
})

const errors = ref<Record<string, string>>({})
const runtimeMessage = ref('')

const compileError = computed(() => {
  const failed = Object.entries(errors.value).find(([, message]) => message)

  return failed ? `${failed[0]}: ${failed[1]}` : ''
})

const statusText = computed(() => {
  if (compileError.value) return `«${label}» no compila. El error está debajo de la vista.`

  return runtimeMessage.value ? `«${label}» tiene un error o un aviso al ejecutarse. Está debajo de la vista.` : ''
})

function describe(error: string | Error) {
  if (!(error instanceof Error)) return error

  // SAFETY: los errores del compilador de Vue son un Error con un `loc` opcional.
  const start = (error as Error & { loc?: { start?: { line: number; column: number } } }).loc?.start

  return start ? `(${start.line}:${start.column}) ${error.message}` : error.message
}

// El store solo recompila por su cuenta el archivo activo, así que cada archivo cambiado se compila aquí.
// Se compila en copias y se aplica todo a la vez: la vista nunca ejecuta una mezcla de versiones.
async function sync(current: Record<string, string>, force = false) {
  const ready: [ReplFile, ReplFile][] = []
  const found: Record<string, string> = {}

  for (const [name, code] of Object.entries(current)) {
    const file = store.files[toPath(name)]

    if (!file) continue

    // Un archivo con error no actualiza su código, así que volver a la versión buena solo borra el aviso
    if (!force && file.code === code) {
      found[name] = ''
      continue
    }

    // compileFile ignora un archivo vacío y la vista seguiría con la versión anterior sin avisar
    if (!code.trim()) {
      found[name] = 'el archivo está vacío.'
      continue
    }

    const draft = new ReplFile(file.filename, code)
    const [error] = await compileFile(store, draft)
    found[name] = error ? describe(error) : ''

    if (!error) ready.push([file, draft])
  }

  errors.value = { ...errors.value, ...found }

  if (!ready.length) return

  runtimeMessage.value = ''

  for (const [file, draft] of ready) {
    file.code = draft.code
    file.compiled = draft.compiled
  }
}

void sync(files, true)

watch(() => files, (current) => sync(current))

// El iframe recibe los tokens tal cual y los resuelve con su propio color-scheme, que sigue al tema de la guía
const headHTML = `<style>
  ${tokensCss}
  html:root { color-scheme: light; }
  html.dark:root { color-scheme: dark; }
  body { margin: 0; padding: var(--space-md); color: var(--c-text-1); background: var(--c-bg); line-height: var(--line-height-body); }
  h1 { margin-top: 0; font-size: var(--font-size-title); }
  h2 { font-size: var(--font-size-body); }
  button, input { font: inherit; }
</style>`

const previewOptions = {
  headHTML,
  // Los avisos del sandbox no se pueden traducir ni adaptar: se pintan aquí a partir de sus mensajes
  showRuntimeError: false,
  showRuntimeWarning: false,
  customCode: {
    importCode: `import { createPinia } from 'pinia'`,
    useCode: 'app.use(createPinia())',
  },
}

// El sandbox crea el iframe sin título y lo recrea al recargar
const sandbox = useTemplateRef('sandbox')
const frame = () => sandbox.value?.container?.querySelector('iframe')
let observer: MutationObserver | undefined

type SandboxValue = string | Error

type SandboxMessage =
  | { action: 'error' | 'unhandledrejection'; value: SandboxValue }
  | { action: 'console'; level: string; args?: SandboxValue[] | string }

const textOf = (value: SandboxValue) => (value instanceof Error ? value.message : String(value))

function onMessage({ source, data }: MessageEvent<SandboxMessage>) {
  if (!source || source !== frame()?.contentWindow) return

  if (data.action === 'error' || data.action === 'unhandledrejection') runtimeMessage.value = textOf(data.value)
  else if (data.action === 'console' && Array.isArray(data.args) && data.args.length) {
    const text = data.args.map(textOf).join(' ')

    if (data.level === 'error') runtimeMessage.value = text
    else if (data.level === 'warn' && text.includes('[Vue warn]')) runtimeMessage.value ||= text
  }
}

onMounted(() => {
  const container = sandbox.value?.container

  window.addEventListener('message', onMessage)

  if (!container) return

  const setTitle = () => frame()?.setAttribute('title', label)

  setTitle()
  observer = new MutationObserver(setTitle)
  observer.observe(container, { childList: true })
})

onUnmounted(() => {
  window.removeEventListener('message', onMessage)
  observer?.disconnect()
})
</script>

<template>
  <div :class="$style.root">
    <p :class="$style.label">{{ label }}</p>
    <div :class="$style.frame">
      <Sandbox
        ref="sandbox"
        :store="store"
        :theme="isDark ? 'dark' : 'light'"
        :clear-console="false"
        :preview-options="previewOptions"
      />
    </div>
    <pre v-if="compileError || runtimeMessage" :class="$style.error">{{ compileError || runtimeMessage }}</pre>
    <!-- Siempre montado y con un texto que solo cambia al aparecer o desaparecer el error, no a cada tecla -->
    <p class="visually-hidden" role="status">{{ statusText }}</p>
  </div>
</template>

<style module>
.root {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.label {
  margin: 0;
  padding: var(--space-xs) var(--bleed);
  font-family: var(--font-mono);
  font-size-adjust: var(--font-adjust-mono);
  font-size: var(--font-size-caption);
  font-weight: var(--font-weight-medium);
  color: var(--c-brand-text);
  background: var(--c-brand-soft);
  border-bottom: 1px solid var(--c-divider);
}

/* El iframe lo genera @vue/repl, que ya lo ajusta al 100 % de este marco */
.frame {
  height: var(--preview-height);
}

.frame :global(iframe) {
  display: block;
}

.error {
  margin: 0;
  padding: var(--space-xs) var(--bleed);
  border-top: 1px solid var(--c-divider);
  font-family: var(--font-mono);
  font-size-adjust: var(--font-adjust-mono);
  font-size: var(--font-size-caption);
  line-height: var(--line-height-code);
  color: var(--c-warning-text);
  background: var(--c-warning-soft);
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}
</style>
