<script setup lang="ts">
import { computed, ref, version } from 'vue'
import BaseButton from '../ui/BaseButton.vue'
import HeroLevelPicker from './HeroLevelPicker.vue'

const { levels } = defineProps<{ levels: { topics: { id: string }[] }[] }>()

// Un nivel de la guía por cada valor, en el mismo orden que toc.ts
const copy = {
  cero: {
    tagline:
      'Todo Vue 3 en una sola página: lo básico, lo intermedio y lo avanzado. Con código que puedes tocar y ejemplos de la vida real.',
    cta: 'Empezar desde cero',
  },
  algo: {
    tagline:
      'Ya sabes pintar cosas y qué es un ref. Toca partir la app en componentes: props, slots, watchers, composables y provide / inject.',
    cta: 'Seguir por lo intermedio',
  },
  bastante: {
    tagline:
      'La reactividad por dentro, defineModel, Transition y Teleport, rendimiento y TypeScript.',
    cta: 'Llévame a lo avanzado',
  },
}

type Level = keyof typeof copy

const options = Object.keys(copy)

const level = ref<Level>('cero')
const current = computed(() => copy[level.value])
const target = computed(() => levels[options.indexOf(level.value)]?.topics[0]?.id)
</script>

<template>
  <section id="top" :class="$style.root" aria-labelledby="hero-title">
    <h1 id="hero-title" :class="$style.title">
      Vue 3, de
      <Transition
        mode="out-in"
        :enter-from-class="$style.wordEnter"
        :leave-to-class="$style.wordLeave"
        :enter-active-class="$style.wordActive"
        :leave-active-class="$style.wordActive"
      >
        <span :key="level" :class="$style.accent">{{ level }}</span>
      </Transition>
      <br />
      a que te pregunten&nbsp;a&nbsp;ti
    </h1>
    <p :class="$style.tagline" aria-live="polite">{{ current.tagline }}</p>
    <HeroLevelPicker v-model="level" :options="options" />
    <div :class="$style.actions">
      <BaseButton size="lg" :href="`#${target}`">{{ current.cta }}</BaseButton>
    </div>
    <p :class="$style.madeWith">Esta página está hecha con Vue {{ version }}.</p>
  </section>
</template>

<style module>
.root {
  padding: var(--space-4xl) var(--space-xl) var(--space-3xl);
  text-align: center;
}

.title {
  margin: 0;
  font-size: var(--font-size-display);
  font-weight: var(--font-weight-black);
  line-height: var(--line-height-display);
  letter-spacing: var(--letter-spacing-display);
  color: var(--c-text-1);
  text-wrap: balance;
}

.accent {
  display: inline-block;
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.wordActive {
  transition:
    opacity var(--duration-fast) var(--ease-out),
    transform var(--duration-fast) var(--ease-out);
}

.wordEnter {
  opacity: 0;
  transform: translateY(var(--space-xs));
}

.wordLeave {
  opacity: 0;
  transform: translateY(calc(var(--space-xs) * -1));
}

.tagline {
  max-width: var(--hero-max);
  margin: var(--space-lg) auto var(--space-xl);
  font-size: var(--font-size-lead);
  line-height: var(--line-height-lead);
  color: var(--c-text-2);
  text-wrap: balance;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-md);
}

.madeWith {
  margin: var(--space-lg) 0 0;
  font-size: var(--font-size-caption);
  color: var(--c-text-2);
}

@media (max-width: 960px) {
  .root {
    padding: var(--space-3xl) var(--space-lg) var(--space-2xl);
  }

  .title {
    font-size: var(--font-size-display-md);
    letter-spacing: var(--letter-spacing-display-sm);
  }

  .wordActive {
  transition:
    opacity var(--duration-fast) var(--ease-out),
    transform var(--duration-fast) var(--ease-out);
}

.wordEnter {
  opacity: 0;
  transform: translateY(var(--space-xs));
}

.wordLeave {
  opacity: 0;
  transform: translateY(calc(var(--space-xs) * -1));
}

.tagline {
    font-size: var(--font-size-lead-sm);
  }
}

@media (prefers-reduced-motion: reduce) {
  .wordActive {
    transition: none;
  }
}

@media (max-width: 480px) {
  .root {
    padding: var(--space-xl) var(--space-lg) var(--space-lg);
  }

  .title {
    font-size: var(--font-size-display-sm);
  }

  .tagline {
    margin: var(--space-md) auto;
  }

  /* Botones a ancho completo sin tocar su estilo: los estira el contenedor */
  .actions {
    flex-direction: column;
  }
}
</style>
