<script setup lang="ts">
import { computed, ref, version } from 'vue'
import BaseButton from '../ui/BaseButton.vue'
import HeroBackdrop from './HeroBackdrop.vue'
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
    <HeroBackdrop :step="options.indexOf(level)" />
    <div :class="$style.content">
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
    </div>
  </section>
</template>

<style module>
.root {
  --hero-top: var(--nav-height);

  position: relative;
  display: grid;
  place-items: center;
  min-height: calc(100vh - var(--hero-top));
  min-height: calc(100svh - var(--hero-top));
  padding: var(--space-3xl) var(--space-xl);
  overflow: clip;
  text-align: center;
  view-timeline: --hero block;
}

.content {
  position: relative;
  width: 100%;
}

/* Al salir el hero cada capa se va a su ritmo: el título se aleja y se
   desenfoca, y el resto se desvanece antes para dejar el título como último en irse */
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .title,
    .tagline,
    .actions,
    .madeWith {
      animation-timing-function: linear;
      animation-fill-mode: both;
      animation-timeline: --hero;
    }

    .title {
      animation-name: titleAway;
      animation-range: exit 0% exit 85%;
    }

    .tagline {
      animation-name: fadeDown;
      animation-range: exit 0% exit 60%;
    }

    .actions,
    .madeWith {
      animation-name: fadeDown;
      animation-range: exit 0% exit 40%;
    }
  }
}

@keyframes titleAway {
  to {
    opacity: 0;
    filter: blur(var(--blur-scroll));
    transform: translateY(var(--space-3xl)) scale(0.88);
  }
}

@keyframes fadeDown {
  to {
    opacity: 0;
    transform: translateY(var(--space-2xl));
  }
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
    transform var(--duration-fast) var(--ease-out),
    filter var(--duration-fast) var(--ease-out);
}

.wordEnter {
  opacity: 0;
  filter: blur(var(--blur-swap));
  transform: translateY(var(--space-xs));
}

.wordLeave {
  opacity: 0;
  filter: blur(var(--blur-swap));
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
    --hero-top: calc(var(--nav-height) + var(--local-nav-height));

    padding: var(--space-3xl) var(--space-lg);
  }

  .title {
    font-size: var(--font-size-display-md);
    letter-spacing: var(--letter-spacing-display-sm);
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
    padding: var(--space-xl) var(--space-lg);
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
