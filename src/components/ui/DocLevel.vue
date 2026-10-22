<script setup lang="ts">
defineProps<{ id: string; title: string; eyebrow?: string; summary?: string }>()
</script>

<template>
  <section :id="id" :class="$style.root">
    <p v-if="eyebrow" :class="$style.eyebrow"><span aria-hidden="true">// </span>{{ eyebrow }}</p>
    <h2 :class="$style.heading">{{ title }}</h2>
    <p v-if="summary" :class="$style.summary">{{ summary }}</p>
    <slot />
  </section>
</template>

<style module>
.root {
  padding-top: var(--space-3xl);
}

.root + .root {
  margin-top: var(--space-3xl);
  border-top: 1px solid var(--c-divider);
}

.eyebrow {
  margin: 0 0 var(--space-xs);
  font-family: var(--font-mono);
  font-size: var(--font-size-caption);
  font-weight: var(--font-weight-medium);
  color: var(--c-brand-text);
}

.heading {
  text-wrap: balance;
  margin: 0 0 var(--space-sm);
  font-family: var(--font-display);
  font-size: var(--font-size-headline-lg);
  font-weight: var(--font-weight-heavy);
  line-height: var(--line-height-heading);
  letter-spacing: var(--letter-spacing-headline-lg);
}

.summary,
.root > p,
.root > ol {
  max-width: var(--measure);
}

.summary {
  margin: 0;
  font-size: var(--font-size-lead-sm);
  color: var(--c-text-2);
}

.root > ol {
  padding-left: var(--space-lg);
}

.root li + li {
  margin-top: var(--space-xs);
}

@media (max-width: 960px) {
  .root {
    padding-top: var(--space-2xl);
  }

  .heading {
    font-size: var(--font-size-headline-lg-sm);
  }
}
</style>
