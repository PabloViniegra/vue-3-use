<script setup lang="ts">
import { computed, ref } from 'vue'
import BaseButton from '../../../components/ui/BaseButton.vue'

interface Ruta {
  path: string
  pagina: string
  requiereLogin?: boolean
}

// La misma tabla que en router.js, pero resuelta a mano: aquí no hay Vue Router instalado
const rutas: Ruta[] = [
  { path: '/', pagina: 'Inicio' },
  { path: '/productos', pagina: 'Listado de productos' },
  { path: '/productos/:id', pagina: 'Detalle del producto' },
  { path: '/cuenta', pagina: 'Tu cuenta', requiereLogin: true },
  { path: '/login', pagina: 'Inicia sesión' },
]

const enlaces = ['/', '/productos', '/productos/42', '/cuenta', '/no-existe']

function resolver(url: string) {
  const [ruta = '/'] = url.split('?')
  const partes = ruta.split('/').filter(Boolean)
  for (const r of rutas) {
    const patron = r.path.split('/').filter(Boolean)
    if (patron.length !== partes.length) continue
    const params: Record<string, string> = {}
    const encaja = patron.every((p, i) => {
      if (p.startsWith(':')) params[p.slice(1)] = partes[i]!
      return p.startsWith(':') || p === partes[i]
    })
    if (encaja) return { ...r, params }
  }
  return { path: '/:pathMatch(.*)*', pagina: 'Página no encontrada (404)', params: {} }
}

const logueado = ref(false)
const url = ref('/')
const redirigida = ref(false)
const actual = computed(() => resolver(url.value))

// Lo que haría router.beforeEach antes de cambiar de página
function navegar(destino: string) {
  const ruta = resolver(destino)
  redirigida.value = !!ruta.requiereLogin && !logueado.value
  url.value = redirigida.value ? `/login?volver=${encodeURIComponent(destino)}` : destino
}
</script>

<template>
  <nav :class="$style.links" aria-label="Enlaces de la demo">
    <BaseButton
      v-for="enlace in enlaces"
      :key="enlace"
      size="sm"
      :variant="url === enlace ? 'brand' : 'alt'"
      :aria-current="url === enlace ? 'page' : undefined"
      @click="navegar(enlace)"
    >
      {{ enlace }}
    </BaseButton>
  </nav>
  <label :class="$style.check">
    <input v-model="logueado" type="checkbox" />
    Has iniciado sesión
  </label>

  <div :class="$style.browser" aria-live="polite">
    <p :class="$style.bar"><span class="visually-hidden">URL: </span>tienda.com{{ url }}</p>
    <p :class="$style.page"><strong>{{ actual.pagina }}</strong></p>
    <p :class="$style.meta">
      Ruta: <code>{{ actual.path }}</code> · params: <code>{{ JSON.stringify(actual.params) }}</code>
    </p>
    <p v-if="redirigida" :class="$style.meta">
      El guard te ha mandado al login porque <code>/cuenta</code> pide sesión.
    </p>
  </div>
</template>

<style module>
.links {
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

.browser {
  margin-top: var(--space-md);
  border: 1px solid var(--c-divider);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.bar {
  margin: 0;
  padding: var(--space-xs) var(--space-sm);
  background: var(--c-bg-mute);
  font-family: var(--font-mono);
  font-size: var(--font-size-caption);
  overflow-wrap: anywhere;
}

.page,
.meta {
  margin: 0;
  padding: var(--space-xs) var(--space-sm) 0;
}

.meta {
  font-size: var(--font-size-label);
  color: var(--c-text-2);
  overflow-wrap: anywhere;
}

.meta:last-child {
  padding-bottom: var(--space-sm);
}
</style>
