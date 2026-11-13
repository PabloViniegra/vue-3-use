<script setup lang="ts">
import { computed, nextTick, ref, useTemplateRef } from 'vue'
import BaseButton from '../../../components/ui/BaseButton.vue'
import CodeBlock from '../../../components/ui/CodeBlock.vue'
import CodeEditor from '../../../components/ui/CodeEditor.vue'
import type { Challenge } from '../content/challenges'
import ChallengePreview from './ChallengePreview.vue'
import { useChallengeFiles } from './useChallengeFiles'

const { challenge } = defineProps<{ challenge: Challenge }>()

const { files, settled, isPristine, reset } = useChallengeFiles(challenge.id, challenge.starter)
const names = Object.keys(challenge.starter)
const active = ref(names[0] ?? '')

const activeCode = computed({
  get: () => files.value[active.value] ?? '',
  set: (code) => (files.value[active.value] = code),
})

const showSolution = ref(false)
const langOf = (name: string) => name.slice(name.lastIndexOf('.') + 1)

const editor = useTemplateRef('editor')

async function confirmReset() {
  if (!window.confirm('Vas a perder lo que has escrito en este reto. ¿Lo reinicias?')) return

  reset()
  // Reiniciar se deshabilita con el foco dentro y el navegador lo dejaría caer en <body>
  await nextTick()
  editor.value?.focus()
}
</script>

<template>
  <div :class="$style.root" role="group" :aria-label="`Playground. ${challenge.title}`" tabindex="-1">
    <div :class="$style.bar">
      <div :class="$style.files" role="group" aria-label="Archivos">
        <button
          v-for="name in names"
          :key="name"
          type="button"
          :class="$style.file"
          :aria-pressed="name === active"
          @click="active = name"
        >
          {{ name }}
        </button>
      </div>
      <BaseButton variant="alt" size="sm" :disabled="isPristine" @click="confirmReset">Reiniciar</BaseButton>
    </div>
    <!-- La key evita pintar un archivo con el resaltado del anterior -->
    <CodeEditor :key="active" ref="editor" v-model="activeCode" :lang="langOf(active)" :label="`Código de ${active}`" />
    <div :class="$style.previews">
      <ChallengePreview :files="settled" label="Tu resultado" />
      <ChallengePreview :files="challenge.solution" label="Resultado esperado" />
    </div>
    <div :class="$style.solution">
      <BaseButton variant="alt" size="sm" :aria-expanded="showSolution" @click="showSolution = !showSolution">
        {{ showSolution ? 'Ocultar la solución' : 'Ver la solución' }}
      </BaseButton>
      <template v-if="showSolution">
        <template v-for="(code, name) in challenge.solution" :key="name">
          <p :class="$style.filename">{{ name }}</p>
          <CodeBlock :code="code" :lang="langOf(name)" />
        </template>
      </template>
    </div>
  </div>
</template>

<style module>
/* Mismo sangrado que los bloques de código; con sitio ocupa también la columna de la nota */
.root {
  max-width: var(--box-max);
  margin: var(--space-lg) calc(var(--bleed) * -1);
  border: 1px solid var(--c-divider);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-xs);
  padding: var(--space-xs) var(--space-sm) var(--space-xs) var(--bleed);
  background: var(--c-bg-soft);
  border-bottom: 1px solid var(--c-divider);
}

.files {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xxs);
}

.file {
  min-height: var(--button-sm-height);
  padding: var(--space-xxs) var(--space-sm);
  font-family: var(--font-mono);
  font-size-adjust: var(--font-adjust-mono);
  font-size: var(--font-size-caption);
  font-weight: var(--font-weight-medium);
  color: var(--c-text-2);
  background: none;
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition:
    background-color var(--duration-fast),
    color var(--duration-fast);
}

.file:hover {
  color: var(--c-text-1);
  background: var(--c-bg-mute);
}

.file[aria-pressed='true'] {
  color: var(--c-brand-text);
  background: var(--c-brand-soft);
  border-color: var(--c-brand-control-border);
}

.previews {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  border-top: 1px solid var(--c-divider);
}

.previews > * + * {
  border-left: 1px solid var(--c-divider);
}

.solution {
  padding: var(--space-sm) var(--bleed);
  border-top: 1px solid var(--c-divider);
}

.filename {
  margin: var(--space-md) 0 0;
  font-family: var(--font-mono);
  font-size-adjust: var(--font-adjust-mono);
  font-size: var(--font-size-caption);
  color: var(--c-text-2);
}

@media (min-width: 1280px) {
  .root {
    width: var(--box-max-wide);
    max-width: none;
  }
}

@media (max-width: 640px) {
  .root {
    border-inline: 0;
    border-radius: 0;
  }

  .previews {
    grid-template-columns: minmax(0, 1fr);
  }

  .previews > * + * {
    border-left: 0;
    border-top: 1px solid var(--c-divider);
  }
}

@media (prefers-reduced-motion: reduce) {
  .file {
    transition: none;
  }
}
</style>
