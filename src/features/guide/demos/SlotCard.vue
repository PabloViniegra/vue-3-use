<template>
  <article :class="$style.root">
    <header :class="$style.title">
      <slot name="titulo">Sin título</slot>
    </header>
    <slot />
  </article>
</template>

<style module>
.root {
  padding: var(--space-md);
  border-radius: var(--radius-md);
  background: var(--c-bg-soft);
}

.title {
  margin: 0 0 var(--space-xs);
  font-family: var(--font-display);
  font-size: var(--font-size-title);
  font-weight: var(--font-weight-bold);
}

.root > :last-child {
  margin-bottom: 0;
}
</style>
