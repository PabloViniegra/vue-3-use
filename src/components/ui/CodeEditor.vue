<script setup lang="ts">
import { computed, onWatcherCleanup, ref, useId, useTemplateRef, watch } from 'vue'

const code = defineModel<string>({ required: true })
const { lang = 'vue', label } = defineProps<{ lang?: string; label: string }>()

const hintId = useId()
const html = ref('')
const lineCount = computed(() => code.value.split('\n').length)

// Un salto de línea final no genera caja de línea: sin el espacio, la capa pintada mediría una línea menos que el textarea
const painted = computed(() => (code.value.endsWith('\n') || !code.value ? `${code.value} ` : code.value))

watch(
  () => [painted.value, lang] as const,
  async ([source, language]) => {
    let stale = false
    onWatcherCleanup(() => (stale = true))

    try {
      const { highlight } = await import('../../lib/highlight')
      const result = await highlight(source, language)

      if (!stale) html.value = result
    } catch {
      if (!stale) html.value = ''
    }
  },
  { immediate: true },
)

// Tab sangra, así que hace falta una salida de teclado: Esc y después Tab
let escaped = false
const field = useTemplateRef('field')

defineExpose({ focus: () => field.value?.focus() })

function insert(input: HTMLTextAreaElement, text: string) {
  // execCommand conserva el historial de deshacer; setRangeText lo perdería
  if (document.execCommand('insertText', false, text)) return

  input.setRangeText(text, input.selectionStart, input.selectionEnd, 'end')
  code.value = input.value
}

function onKeydown(event: KeyboardEvent) {
  const input = field.value

  if (!input || event.isComposing || event.ctrlKey || event.altKey || event.metaKey) return

  if (event.key === 'Escape') {
    escaped = true

    return
  }

  if (event.key === 'Tab' && !event.shiftKey && !escaped) {
    event.preventDefault()
    insert(input, '  ')
  } else if (event.key === 'Enter') {
    const lineStart = input.value.lastIndexOf('\n', input.selectionStart - 1) + 1
    const indent = /^[ \t]*/.exec(input.value.slice(lineStart, input.selectionStart))?.[0] ?? ''

    event.preventDefault()
    insert(input, `\n${indent}`)
  }

  if (event.key !== 'Shift') escaped = false
}
</script>

<template>
  <div>
    <div :class="$style.scroll" translate="no">
      <div :class="$style.gutter" aria-hidden="true"><span v-for="line in lineCount" :key="line">{{ line }}</span></div>
      <div :class="$style.stack">
        <div :class="$style.paint" inert>
          <div v-if="html" v-html="html" />
          <pre v-else><code>{{ painted }}</code></pre>
        </div>
        <textarea
          ref="field"
          v-model="code"
          :class="$style.input"
          :aria-label="label"
          :aria-describedby="hintId"
          spellcheck="false"
          autocapitalize="off"
          autocomplete="off"
          autocorrect="off"
          wrap="off"
          @keydown="onKeydown"
          @blur="escaped = false"
        />
      </div>
    </div>
    <p :id="hintId" :class="$style.hint">
      <kbd>Tab</kbd> sangra el código. Para salir del editor con el teclado, pulsa <kbd>Esc</kbd> y
      después <kbd>Tab</kbd>.
    </p>
  </div>
</template>

<style module>
.scroll {
  display: flex;
  max-height: var(--editor-max-height);
  overflow: auto;
  background: var(--c-code-bg);
  scrollbar-width: thin;
  scrollbar-color: var(--c-control-border) var(--c-code-bg);
}

.scroll:has(.input:focus-visible) {
  outline: var(--focus-ring) solid var(--c-focus);
  outline-offset: calc(var(--focus-ring) * -1);
}

.gutter {
  position: sticky;
  left: 0;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  min-width: var(--button-height);
  height: max-content;
  min-height: 100%;
  padding: var(--space-md) var(--space-xs);
  border-right: 1px solid var(--c-divider);
  color: var(--c-text-2);
  background: var(--c-code-bg);
  font-family: var(--font-mono);
  font-size-adjust: var(--font-adjust-mono);
  font-size: var(--font-size-code);
  line-height: var(--line-height-code);
  text-align: right;
  font-variant-numeric: tabular-nums;
  user-select: none;
}

/* Las dos capas ocupan la misma celda: la pintada da el tamaño y el textarea, transparente, la cubre */
.stack {
  display: grid;
  flex: 1;
  min-width: max-content;
}

.paint,
.input {
  grid-area: 1 / 1;
}

/* Shiki genera el <pre> vía v-html, así que no lleva nuestras clases */
.paint :global(pre),
.input {
  margin: 0;
  padding: var(--space-md);
  border: 0;
  background: none;
  font-family: var(--font-mono);
  font-size-adjust: var(--font-adjust-mono);
  font-variant-ligatures: none;
  font-size: var(--font-size-code);
  line-height: var(--line-height-code);
  letter-spacing: normal;
  white-space: pre;
  tab-size: 2;
}

.paint :global(pre) {
  overflow: visible;
}

.paint :global(code) {
  display: block;
  padding: 0;
  background: none;
  color: var(--c-text-1);
  font-size: inherit;
}

.input {
  width: 100%;
  height: 100%;
  overflow: hidden;
  resize: none;
  outline: none;
  color: transparent;
  caret-color: var(--c-text-1);
}

.input::selection {
  color: transparent;
}

.hint {
  margin: 0;
  padding: var(--space-xs) var(--bleed);
  border-top: 1px solid var(--c-divider);
  font-size: var(--font-size-caption);
  color: var(--c-text-2);
}

.hint kbd {
  font-family: var(--font-mono);
  font-size-adjust: var(--font-adjust-mono);
  color: var(--c-text-1);
}
</style>
