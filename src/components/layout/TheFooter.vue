<template>
  <footer :class="$style.root">
    <p>
      Hecha con Vue 3 y Vite. Estilo inspirado en
      <a href="https://vuejs.org" target="_blank" rel="noopener">vuejs.org</a>, contenido
      basado en su documentación.
    </p>
    <a :class="$style.top" href="#top">Volver arriba</a>
  </footer>
</template>

<style module>
.root {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-xs) var(--space-lg);
  margin-top: var(--space-4xl);
  padding-top: var(--space-lg);
  border-top: 1px solid var(--c-divider);
  font-size: var(--font-size-label);
  color: var(--c-text-2);
}

.root p {
  margin: 0;
}

.top {
  flex-shrink: 0;
  padding: var(--space-xs) 0;
  font-weight: var(--font-weight-medium);
}
</style>
