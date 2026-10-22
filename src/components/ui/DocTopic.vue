<script setup lang="ts">
defineProps<{ id: string; title: string }>()
</script>

<template>
  <section :id="id" :class="$style.root">
    <h3 :class="$style.heading">
      {{ title }}
      <a :class="$style.anchor" :href="`#${id}`" :aria-label="`Enlace a ${title}`">#</a>
    </h3>
    <slot />
  </section>
</template>

<style module>
.root {
  padding-top: var(--space-xs);
  margin-top: var(--space-2xl);
}

.heading {
  margin: 0 0 var(--space-md);
  font-size: var(--font-size-headline-md);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-title);
  letter-spacing: var(--letter-spacing-headline-md);
}

.anchor {
  margin-left: var(--space-xs);
  opacity: 0;
  transition: opacity var(--duration-fast);
}

.heading:hover .anchor,
.anchor:focus-visible {
  opacity: 1;
}

/* El contenido llega por slot y es HTML normal del tema */
.root > p,
.root > ul,
.root > ol {
  max-width: var(--measure);
  margin: var(--space-md) 0;
}

.root li + li {
  margin-top: var(--space-xs);
}

@media (hover: none) {
  .anchor {
    opacity: 1;
  }
}
</style>
