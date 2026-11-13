<script setup lang="ts">
import { nextTick, ref, shallowRef, useTemplateRef, type Component } from 'vue'
import BaseButton from '../../../components/ui/BaseButton.vue'
import DocTopic from '../../../components/ui/DocTopic.vue'
import type { Challenge } from '../content/challenges'

const { challenge } = defineProps<{ challenge: Challenge }>()

// El compilador de Vue pesa demasiado para quien solo viene a leer: se descarga al abrir el reto
const playground = shallowRef<Component>()
const status = ref<'idle' | 'loading' | 'error'>('idle')
const slot = useTemplateRef('slot')

async function open() {
  status.value = 'loading'

  try {
    playground.value = (await import('./ChallengePlayground.vue')).default
    status.value = 'idle'
    await nextTick()
    // El botón desaparece: el foco pasa al playground para no caer al principio de la página
    slot.value?.querySelector<HTMLElement>('[role="group"]')?.focus()
  } catch {
    status.value = 'error'
  }
}

// Los fragmentos entre acentos graves se pintan como código
const parts = (text: string) => text.split('`').map((value, index) => ({ value, isCode: index % 2 === 1 }))
</script>

<template>
  <DocTopic :id="challenge.id" :title="challenge.title">
    <p>
      <template v-for="(part, i) in parts(challenge.intro)" :key="i">
        <code v-if="part.isCode">{{ part.value }}</code>
        <template v-else>{{ part.value }}</template>
      </template>
    </p>
    <p>Lo que tiene que hacer cuando acabes:</p>
    <ul>
      <li v-for="requirement in challenge.requirements" :key="requirement">
        <template v-for="(part, i) in parts(requirement)" :key="i">
          <code v-if="part.isCode">{{ part.value }}</code>
          <template v-else>{{ part.value }}</template>
        </template>
      </li>
    </ul>
    <p>
      No hay corrector: lo has clavado cuando «Tu resultado» se comporta igual que «Resultado
      esperado», que es la solución funcionando. Lo que escribas se guarda en este navegador, y
      si te atascas tienes el código de la solución debajo del editor.
    </p>
    <div ref="slot">
      <component :is="playground" v-if="playground" :challenge="challenge" />
      <template v-else>
        <BaseButton :aria-disabled="status === 'loading'" @click="status === 'loading' || open()">
          {{ status === 'error' ? 'Reintentar' : 'Abrir el playground' }}
        </BaseButton>
        <p :class="$style.status" role="status">
          <template v-if="status === 'loading'">Cargando el editor y el compilador de Vue…</template>
          <template v-else-if="status === 'error'">
            No se ha podido cargar el playground. Revisa la conexión y vuelve a intentarlo.
          </template>
        </p>
      </template>
    </div>
  </DocTopic>
</template>

<style module>
.status {
  max-width: var(--measure);
  min-height: calc(var(--font-size-body-sm) * var(--line-height-body-sm));
  margin: var(--space-xs) 0 0;
  font-size: var(--font-size-body-sm);
  line-height: var(--line-height-body-sm);
  color: var(--c-text-2);
}
</style>
