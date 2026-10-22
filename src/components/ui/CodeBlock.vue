<script setup lang="ts">
import { computed, onWatcherCleanup, ref, useTemplateRef, watch } from 'vue'
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
  if (value !== 'copied') return
  const timer = setTimeout(() => (status.value = 'idle'), 2000)
  onWatcherCleanup(() => clearTimeout(timer))
})

const labels = { idle: 'Copiar', copied: 'Copiado', error: 'No se pudo copiar' }
const copyError = 'Selecciona el código y cópialo manualmente.'
const lineCount = computed(() => props.code.split('\n').length)
const languageLabel = computed(() => ({ vue: 'Vue', js: 'JavaScript', javascript: 'JavaScript', ts: 'TypeScript', typescript: 'TypeScript', bash: 'Terminal' })[props.lang] ?? props.lang)
</script>

<template>
  <div ref="root" :class="$style.root">
    <div :class="$style.header">
      <span :class="$style.lang">
        <svg :class="$style.icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-13-2 16" /></svg>
        {{ languageLabel }}
      </span>
      <button type="button" :class="[$style.copy, { [$style.copied]: status === 'copied' }]" @click="copy">
        <svg :class="$style.icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path v-if="status === 'copied'" d="m5 12 4 4L19 6" />
          <template v-else><rect x="8" y="8" width="12" height="13" rx="2" /><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" /></template>
        </svg>
        {{ labels[status] }}<span class="visually-hidden"> código {{ lang }}</span>
      </button>
    </div>
    <span class="visually-hidden" role="status">{{ status === 'idle' ? '' : `${labels[status]}${status === 'error' ? `. ${copyError}` : ''}` }}</span>
    <p v-if="status === 'error'" :class="$style.error">{{ copyError }}</p>
    <div :class="$style.body" translate="no">
      <div :class="$style.gutter" aria-hidden="true"><span v-for="line in lineCount" :key="line">{{ line }}</span></div>
      <div v-if="html" :class="$style.source" v-html="html" />
      <div v-else :class="$style.source"><pre tabindex="0"><code>{{ code }}</code></pre></div>
    </div>
  </div>
</template>

<style module>
/* Sobresale por los lados lo mismo que su padding: el código queda alineado con la prosa */
.root {
  max-width: var(--box-max);
  margin: var(--space-md) calc(var(--bleed) * -1);
  background: var(--c-code-bg);
  border-radius: var(--radius-lg);
  border: 1px solid var(--c-divider);
  overflow: hidden;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-xs);
  padding: var(--space-xs) var(--space-sm) var(--space-xs) var(--bleed);
  background: var(--c-bg-soft);
  border-bottom: 1px solid var(--c-divider);
}

.body {
  display: flex;
}

.error {
  margin: 0;
  padding: var(--space-xs) var(--bleed);
  font-size: var(--font-size-label);
  color: var(--c-text-1);
}

.gutter {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  min-width: var(--button-height);
  padding: var(--space-md) var(--space-xs);
  border-right: 1px solid var(--c-divider);
  color: var(--c-text-2);
  font-family: var(--font-mono);
  font-size: var(--font-size-code);
  line-height: var(--line-height-code);
  text-align: right;
  font-variant-numeric: tabular-nums;
  user-select: none;
}

.source {
  flex: 1;
  min-width: 0;
}

/* Shiki genera el <pre> vía v-html, así que no lleva nuestras clases */
.root :global(pre) {
  margin: 0;
  padding: var(--space-md) var(--space-md);
  overflow-x: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--c-control-border) var(--c-code-bg);
}

.root :global(pre:focus-visible) {
  outline-offset: calc(var(--focus-ring) * -1);
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
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  font-family: var(--font-mono);
  font-size: var(--font-size-caption);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-label);
  color: var(--c-brand-text);
}

.icon {
  width: var(--icon-md);
  height: var(--icon-md);
  flex-shrink: 0;
}

.copy {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-xs);
  min-height: var(--button-sm-height);
  padding: var(--space-xxs) var(--space-sm);
  font-size: var(--font-size-caption);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-label);
  color: var(--c-text-2);
  background: var(--c-bg);
  border: 1px solid var(--c-control-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition:
    background-color var(--duration-fast),
    color var(--duration-fast);
}

.copy:hover {
  color: var(--c-text-1);
  background: var(--c-bg-mute);
}

.copy.copied {
  color: var(--c-brand-text);
  background: var(--c-brand-soft);
}

@media (max-width: 640px) {
  .root {
    border-inline: 0;
    border-radius: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .copy {
    transition: none;
  }
}
</style>
