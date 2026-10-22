<script setup lang="ts">
import { computed, ref, version } from 'vue'
import BaseButton from '../ui/BaseButton.vue'
import HeroBackdrop from './HeroBackdrop.vue'
import HeroLevelPicker from './HeroLevelPicker.vue'

const { levels, copy } = defineProps<{
  levels: { topics: { id: string }[] }[]
  copy: Record<string, { tagline: string; cta: string }>
}>()

const options = Object.keys(copy)

const level = ref(options[0] ?? '')
const current = computed(() => copy[level.value])
const target = computed(() => `#${levels[options.indexOf(level.value)]?.topics[0]?.id}`)
</script>

<template>
  <section id="top" :class="$style.root" aria-labelledby="hero-title">
    <HeroBackdrop :step="options.indexOf(level)" />
    <div :class="$style.content">
      <div :class="$style.intro">
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
        <p :class="$style.tagline" aria-live="polite">{{ current?.tagline }}</p>
      </div>
      <HeroLevelPicker
        v-model="level"
        :class="$style.picker"
        :options="options"
        :title="`Vue 3, de ${level}`"
        :target="target"
      />
      <div :class="$style.cta">
        <div :class="$style.actions">
          <BaseButton size="lg" :href="target">{{ current?.cta }}</BaseButton>
        </div>
        <p :class="$style.madeWith">Esta página está hecha con Vue {{ version }}.</p>
      </div>
    </div>
  </section>
</template>

<style module>
.root {
  --hero-top: var(--nav-height);

  position: relative;
  display: grid;
  place-items: center;
  min-height: calc(100svh - var(--hero-top));
  padding: var(--space-3xl) var(--space-xl);
  overflow: clip;
  view-timeline: --hero block;
}

.content {
  position: relative;
  display: grid;
  grid-template:
    'intro picker' auto
    'cta picker' auto / minmax(0, 7fr) minmax(0, 5fr);
  column-gap: var(--space-3xl);
  width: 100%;
  max-width: var(--hero-max);
}

/* Al salir el hero cada capa se va a su ritmo: el título se aleja y se
   desenfoca, y el resto se desvanece antes para dejar el título como último en irse */
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .title,
    .tagline,
    .actions,
    .madeWith,
    .picker {
      animation-timing-function: linear;
      animation-fill-mode: both;
      animation-timeline: --hero;
    }

    .title {
      animation-name: titleAway;
      animation-range: exit 0% exit 85%;
    }

    .tagline,
    .picker {
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

/* En móvil el panel va entre el texto y el botón: primero eliges, luego entras */
.intro {
  grid-area: intro;
  align-self: end;
}

.picker {
  grid-area: picker;
  align-self: center;
}

.cta {
  grid-area: cta;
}

.title {
  margin: 0;
  font-family: var(--font-display);
  font-size: var(--font-size-display);
  font-weight: var(--font-weight-heavy);
  line-height: var(--line-height-display);
  letter-spacing: var(--letter-spacing-display);
  color: var(--c-text-1);
  text-wrap: balance;
  transform-origin: left center;
}

/* El mismo verde que el valor elegido en el panel: la palabra es ese ref */
.accent {
  display: inline-block;
  padding: 0 var(--space-xs);
  border-radius: var(--radius-lg);
  background: var(--c-brand-soft);
  color: var(--c-brand-text);
}

@media (prefers-reduced-motion: no-preference) {
  .wordActive {
    transition-property: opacity, transform, filter;
    transition-duration: var(--duration-fast);
    transition-timing-function: var(--ease-out);
  }
}

.wordEnter,
.wordLeave {
  opacity: 0;
  filter: blur(var(--blur-swap));
  transform: translateY(var(--space-xs));
}

.wordLeave {
  transform: translateY(calc(var(--space-xs) * -1));
}

.tagline {
  max-width: var(--measure);
  margin: var(--space-lg) 0 var(--space-xl);
  font-size: var(--font-size-lead);
  line-height: var(--line-height-lead);
  color: var(--c-text-2);
  text-wrap: pretty;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-md);
}

.madeWith {
  margin: var(--space-lg) 0 0;
  font-family: var(--font-mono);
  font-size: var(--font-size-caption);
  color: var(--c-text-2);
}

@media (max-width: 960px) {
  .root {
    --hero-top: calc(var(--nav-height) + var(--local-nav-height));

    padding: var(--space-3xl) var(--space-lg);
  }

  .content {
    grid-template: 'intro' 'picker' 'cta' / minmax(0, 1fr);
    row-gap: var(--space-xl);
    max-width: var(--box-max);
  }


  .title {
    font-size: var(--font-size-display-md);
  }

  .tagline {
    margin-bottom: 0;
    font-size: var(--font-size-lead-sm);
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
    margin-top: var(--space-md);
  }


  /* Botones a ancho completo sin tocar su estilo: los estira el contenedor */
  .actions {
    flex-direction: column;
  }
}
</style>
