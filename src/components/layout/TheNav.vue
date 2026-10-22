<script setup lang="ts">
defineProps<{ links: { id: string; title: string }[]; dark: boolean }>()

const emit = defineEmits<{ toggleTheme: [event: MouseEvent]; search: [] }>()
</script>

<template>
  <header :class="$style.root">
    <a :class="$style.brand" href="#top">
      <svg :class="$style.logo" viewBox="0 0 256 198" aria-hidden="true" focusable="false">
        <path :class="$style.green" d="M204.8 0H256L128 220.8L0 0h97.92L128 51.2L157.44 0h47.36Z" />
        <path :class="$style.green" d="m0 0l128 220.8L256 0h-51.2L128 132.48L50.56 0H0Z" />
        <path :class="$style.inner" d="M50.56 0L128 133.12L204.8 0h-47.36L128 51.2L97.92 0H50.56Z" />
      </svg>
      <span :class="$style.wordmark">Vue 3 <span :class="$style.accent">de cero</span></span>
    </a>

    <nav :class="$style.links" aria-label="Niveles">
      <a v-for="link in links" :key="link.id" :href="`#${link.id}`">{{ link.title }}</a>
      <a href="https://vuejs.org/guide/introduction.html" target="_blank" rel="noopener">
        Docs oficiales<span class="visually-hidden"> (se abre en otra pestaña)</span>
      </a>
    </nav>

    <button type="button" :class="$style.search" aria-keyshortcuts="/" @click="emit('search')">
      Buscar tema <kbd :class="$style.kbd" aria-hidden="true">/</kbd>
    </button>

    <button
      type="button"
      :class="$style.switch"
      role="switch"
      :aria-checked="dark"
      aria-label="Modo oscuro"
      @click="emit('toggleTheme', $event)"
    >
      <span :class="$style.knob" aria-hidden="true">
        <svg v-if="dark" viewBox="0 0 24 24"><path d="M12.1 22a10 10 0 0 1-1.1-19.9 1 1 0 0 1 .9 1.6A6 6 0 0 0 20.3 12a1 1 0 0 1 1.6.9A10 10 0 0 1 12.1 22Z" /></svg>
        <svg v-else viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>
      </span>
    </button>
  </header>
</template>

<style module>
.root {
  position: sticky;
  top: 0;
  z-index: var(--z-nav);
  display: flex;
  align-items: center;
  gap: var(--space-lg);
  height: var(--nav-height);
  padding: 0 var(--space-xl);
  background: var(--c-bg);
  border-bottom: 1px solid var(--c-divider);
}

.brand {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  margin-right: auto;
  color: var(--c-text-1);
  transition: transform var(--duration-fast) var(--ease-out);
}

.brand:hover {
  text-decoration: none;
}

.brand:active {
  transform: scale(var(--press-scale));
}

.logo {
  width: var(--logo-size);
  height: auto;
  overflow: visible;
}

.green {
  fill: var(--c-brand);
}

.inner {
  fill: var(--c-logo-inner);
  transition: transform var(--duration-base) var(--ease-out);
}

/* La V interior se hunde en la exterior: un valor que se asienta */
@media (hover: hover) {
  .brand:hover .inner {
    transform: translateY(var(--logo-dip));
  }
}

.brand:focus-visible .inner,
.brand:active .inner {
  transform: translateY(var(--logo-dip));
}

.wordmark {
  font-family: var(--font-display);
  font-size: var(--font-size-title);
  font-weight: var(--font-weight-heavy);
  line-height: 1;
  letter-spacing: var(--letter-spacing-headline-md);
  white-space: nowrap;
}

/* La misma palabra resaltada del hero: "de cero" es el valor elegido */
.accent {
  display: inline-block;
  padding: var(--space-xxs) var(--space-xs);
  border-radius: var(--radius-md);
  background: var(--c-brand-soft);
  color: var(--c-brand-text);
}

.links {
  display: flex;
  gap: var(--space-lg);
}

.links a {
  font-size: var(--font-size-label);
  font-weight: var(--font-weight-medium);
  color: var(--c-text-1);
  transition: color var(--duration-fast);
}

.links a:hover {
  color: var(--c-brand-text);
  text-decoration: none;
}

.search {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  height: var(--button-sm-height);
  padding: 0 var(--space-xs) 0 var(--space-sm);
  border: 1px solid var(--c-control-border);
  border-radius: var(--radius-lg);
  background: var(--c-bg-soft);
  font: inherit;
  font-size: var(--font-size-label);
  color: var(--c-text-2);
  cursor: pointer;
  transition: border-color var(--duration-fast);
}

.search:hover {
  border-color: var(--c-brand-text);
}

.kbd {
  padding: 0 var(--space-xs);
  border: 1px solid var(--c-divider-strong);
  border-radius: var(--radius-sm);
  font-family: var(--font-mono);
  font-size: var(--font-size-caption);
  color: var(--c-text-2);
}

.switch {
  position: relative;
  flex-shrink: 0;
  width: var(--switch-width);
  height: var(--switch-height);
  padding: 0;
  border-radius: var(--radius-full);
  border: 1px solid var(--c-control-border);
  background: var(--c-bg-mute);
  cursor: pointer;
}

.switch::after {
  content: '';
  position: absolute;
  inset: calc(var(--space-sm) * -1);
}

.switch:hover {
  border-color: var(--c-brand-text);
}

.knob {
  position: absolute;
  top: 1px;
  left: 1px;
  display: grid;
  place-items: center;
  width: var(--switch-knob);
  height: var(--switch-knob);
  border-radius: var(--radius-full);
  background: var(--c-bg);
  box-shadow: var(--shadow-knob);
  transition: transform var(--duration-base) var(--ease-out);
}

.switch[aria-checked='true'] .knob {
  transform: translateX(var(--switch-knob));
}

.knob svg {
  width: var(--icon-sm);
  height: var(--icon-sm);
  fill: var(--c-text-2);
  color: var(--c-text-2);
}

@media (max-width: 768px) {
  .root {
    padding: 0 var(--space-md);
  }

  .links,
  .search {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .brand,
  .inner,
  .knob,
  .search,
  .links a {
    transition: none;
  }
}
</style>
