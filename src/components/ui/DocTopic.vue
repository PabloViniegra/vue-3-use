<script setup lang="ts">
defineProps<{ id: string; title: string }>()
</script>

<template>
  <section :id="id" :class="$style.root">
    <div :class="$style.main">
      <h3 :class="$style.heading">
        {{ title }}
        <a :class="$style.anchor" :href="`#${id}`" :aria-label="`Enlace a ${title}`">#</a>
      </h3>
      <slot />
    </div>
    <div v-if="$slots.note" :class="$style.note">
      <slot name="note" />
    </div>
  </section>
</template>

<style module>
.root {
  padding-top: var(--space-xs);
  margin-top: var(--space-2xl);
}

.heading {
  text-wrap: balance;
  margin: 0 0 var(--space-md);
  font-family: var(--font-display);
  font-size: var(--font-size-headline-md);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-title);
  letter-spacing: var(--letter-spacing-headline-md);
}

.anchor {
  display: inline-block;
  min-width: var(--button-sm-height);
  margin-left: var(--space-xxs);
  text-align: center;
  opacity: 0;
  transition: opacity var(--duration-fast);
}

.heading:hover .anchor,
.anchor:focus-visible {
  opacity: 1;
}

/* El contenido llega por slot y es HTML normal del tema */
.main > p,
.main > ul,
.main > ol {
  max-width: var(--measure);
  margin: var(--space-md) 0;
}

.main li + li {
  margin-top: var(--space-xs);
}

/* Con sitio, la nota sale al margen a la altura del código y acompaña al tema: la analogía no se adelanta al concepto */
@media (min-width: 1280px) {
  .root {
    display: grid;
    grid-template-columns: var(--measure) var(--note-width);
    column-gap: var(--space-2xl);
  }

  .note {
    position: sticky;
    top: calc(var(--nav-height) + var(--space-lg));
    align-self: start;
    margin-top: var(--space-3xl);
  }
}

@media (hover: none) {
  .anchor {
    opacity: 1;
  }
}
</style>
