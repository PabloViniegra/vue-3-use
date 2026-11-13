<script setup lang="ts">
import { computed, ref, useTemplateRef, version } from 'vue'
import { useHeroMotion } from '../../composables/useHeroMotion'
import BaseButton from '../ui/BaseButton.vue'
import HeroBackdrop from './HeroBackdrop.vue'
import HeroLevelPicker from './HeroLevelPicker.vue'
import HeroTitle from './HeroTitle.vue'
import HeroWires from './HeroWires.vue'

const { copy } = defineProps<{
  copy: Record<string, { label: string; phrase: string; target: string; tagline: string; cta: string }>
}>()

const options = Object.keys(copy)

const level = ref(options[0] ?? '')
const current = computed(() => copy[level.value])
const target = computed(() => current.value?.target ?? '#contenido')

const root = useTemplateRef('root')

useHeroMotion(root)

const title = useTemplateRef('title')
const picker = useTemplateRef('picker')
const button = useTemplateRef('button')
</script>

<template>
  <section id="top" ref="root" :class="$style.root" aria-labelledby="hero-title">
    <HeroBackdrop :step="options.indexOf(level)" />
    <div :class="$style.content">
      <div :class="$style.intro" data-hero-entry>
        <HeroTitle id="hero-title" ref="title" data-hero-part="title" :class="$style.title" :phrase="current?.phrase ?? ''" />
        <p data-hero-part="detail" :class="$style.tagline" aria-live="polite">{{ current?.tagline }}</p>
      </div>
      <div :class="$style.pickerSlot" data-hero-entry>
        <HeroLevelPicker
          ref="picker"
          data-hero-part="detail"
          v-model="level"
          :hint="current?.label ?? ''"
          :class="$style.picker"
          :options="options"
          :title="`Vue 3, ${current?.phrase}`"
          :target="target"
        />
      </div>
      <div :class="$style.cta" data-hero-entry>
        <div data-hero-part="action" :class="$style.actions">
          <BaseButton ref="button" size="lg" :href="target">{{ current?.cta }}</BaseButton>
        </div>
        <p data-hero-part="action" :class="$style.madeWith">Proyecto no oficial, hecho con Vue {{ version }}.</p>
      </div>
    </div>
    <!-- Después del contenido para que los puertos se pinten encima del panel y del botón -->
    <HeroWires
      data-hero-part="wires"
      :panel="picker?.$el ?? null"
      :title-row="picker?.titleRow ?? null"
      :target-row="picker?.targetRow ?? null"
      :accent="title?.accent ?? null"
      :button="button?.$el ?? null"
      :signal="level"
    />
  </section>
</template>

<style module>
.root {
  --hero-top: var(--nav-height);

  position: relative;
  display: grid;
  place-items: center;
  min-height: min(calc(100svh - var(--hero-top)), var(--hero-min-height));
  padding: var(--space-3xl) var(--space-xl);
  overflow: clip;
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

/* En móvil el panel va entre el texto y el botón: primero eliges, luego entras */
.intro {
  grid-area: intro;
  align-self: end;
}

.pickerSlot {
  grid-area: picker;
  align-self: center;
}

.cta {
  grid-area: cta;
}

.title {
  transform-origin: left center;
}

/* Reserva las líneas del tagline más largo: al cambiar de nivel el botón no se mueve */
.tagline {
  min-block-size: 3lh;
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
  font-size-adjust: var(--font-adjust-mono);
  font-size: var(--font-size-caption);
  color: var(--c-text-2);
}

@media (max-width: 960px) {
  .root {
    --hero-top: calc(var(--nav-height) + var(--local-nav-height));

    min-height: calc(100svh - var(--hero-top));
    padding: var(--space-3xl) var(--space-lg);
  }

  .content {
    grid-template: 'intro' 'picker' 'cta' / minmax(0, 1fr);
    row-gap: var(--space-xl);
    max-width: var(--box-max);
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

  .tagline {
    margin-top: var(--space-md);
    min-block-size: 4lh;
  }

  /* Botones a ancho completo sin tocar su estilo: los estira el contenedor */
  .actions {
    flex-direction: column;
  }
}
</style>
