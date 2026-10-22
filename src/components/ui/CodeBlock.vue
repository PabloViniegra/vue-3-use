<script setup lang="ts">
import { onWatcherCleanup, ref, useTemplateRef, watch } from 'vue'
import { useNearViewport } from '../../composables/useNearViewport'

const props = withDefaults(defineProps<{ code: string; lang?: string }>(), { lang: 'vue' })

// Mientras carga Shiki (o si falla) se ve el código sin colores
const html = ref('')

// El worker hace el resaltado fuera del hilo principal; solo se solicita al acercarse al bloque
const root = useTemplateRef('root')
const isNear = useNearViewport(root)

watch(
  () => [props.code, props.lang, isNear.value] as const,
  async ([code, lang, near]) => {
    if (!near) return
    let stale = false
    onWatcherCleanup(() => (stale = true))
    try {
      const { highlight } = await import('../../lib/highlight')
      const result = await highlight(code, lang)
      if (!stale) html.value = result
    } catch {
      html.value = ''
    }
  },
  { immediate: true },
)

const status = ref<'idle' | 'copied' | 'error'>('idle')

async function copy() {
  try {
    await navigator.clipboard.writeText(props.code)
    status.value = 'copied'
  } catch {
    status.value = 'error'
  }
}

watch(status, (value) => {
  if (value === 'idle') return
  const timer = setTimeout(() => (status.value = 'idle'), 2000)
  onWatcherCleanup(() => clearTimeout(timer))
})

const labels = { idle: 'Copiar', copied: 'Copiado', error: 'No se pudo copiar' }
</script>

<template>
  <div ref="root" :class="$style.root">
    <span :class="$style.lang" aria-hidden="true">{{ lang }}</span>
    <button type="button" :class="$style.copy" @click="copy">
      {{ labels[status] }}<span class="visually-hidden"> código {{ lang }}</span>
    </button>
    <span class="visually-hidden" role="status">{{ status === 'idle' ? '' : labels[status] }}</span>
    <div v-if="html" v-html="html" />
    <pre v-else tabindex="0"><code>{{ code }}</code></pre>
  </div>
</template>

<style module>
.root {
  position: relative;
  margin: var(--space-md) 0;
  background: var(--c-code-bg);
  border-radius: var(--radius-lg);
}

/* Shiki genera el <pre> vía v-html, así que no lleva nuestras clases */
.root :global(pre) {
  margin: 0;
  padding: var(--space-lg);
  overflow-x: auto;
  border-radius: var(--radius-lg);
}

.root :global(pre code) {
  display: block;
  padding: 0;
  background: none;
  color: var(--c-text-1);
  font-size: var(--font-size-code);
  line-height: var(--line-height-code);
  white-space: pre;
}

.lang {
  position: absolute;
  top: var(--space-xs);
  right: var(--space-sm);
  font-size: var(--font-size-caption);
  font-weight: var(--font-weight-medium);
  line-height: 1;
  color: var(--c-text-2);
  transition: opacity var(--duration-fast);
}

.copy {
  position: absolute;
  top: var(--space-xs);
  right: var(--space-xs);
  z-index: 1;
  padding: var(--space-xxs) var(--space-sm);
  font-size: var(--font-size-caption);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-label);
  color: var(--c-text-2);
  background: var(--c-bg);
  border: 1px solid var(--c-divider);
  border-radius: var(--radius-md);
  cursor: pointer;
  opacity: 0;
  transition:
    opacity var(--duration-fast),
    color var(--duration-fast);
}

.root:hover .copy,
.copy:focus-visible {
  opacity: 1;
}

.root:hover .lang,
.root:focus-within .lang {
  opacity: 0;
}

.copy:hover {
  color: var(--c-text-1);
}

@media (hover: none) {
  .copy {
    opacity: 1;
  }

  .lang {
    display: none;
  }
}

@media (max-width: 640px) {
  .root {
    margin-inline: calc(var(--space-lg) * -1);
    border-radius: 0;
  }

  .root :global(pre) {
    border-radius: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .lang,
  .copy {
    transition: none;
  }
}
</style>
