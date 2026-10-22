<script setup lang="ts">
import vueLogo from '../../assets/vue.svg'

defineProps<{ links: { id: string; title: string }[]; dark: boolean }>()
const emit = defineEmits<{ toggleTheme: [] }>()
</script>

<template>
  <header :class="$style.root">
    <a :class="$style.brand" href="#top">
      <img :src="vueLogo" alt="" width="28" height="28" />
      <span>Vue 3 de cero</span>
    </a>

    <nav :class="$style.links" aria-label="Niveles">
      <a v-for="link in links" :key="link.id" :href="`#${link.id}`">{{ link.title }}</a>
      <a href="https://vuejs.org/guide/introduction.html" target="_blank" rel="noopener">
        Docs oficiales<span class="visually-hidden"> (se abre en otra pestaña)</span>
      </a>
    </nav>

    <button
      type="button"
      :class="$style.switch"
      role="switch"
      :aria-checked="dark"
      aria-label="Modo oscuro"
      @click="emit('toggleTheme')"
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
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-semibold);
  color: var(--c-text-1);
}

.brand:hover {
  text-decoration: none;
}

.brand img {
  width: var(--logo-size);
  height: auto;
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

.switch {
  position: relative;
  flex-shrink: 0;
  width: var(--switch-width);
  height: var(--switch-height);
  padding: 0;
  border-radius: var(--radius-full);
  border: 1px solid var(--c-divider-strong);
  background: var(--c-bg-mute);
  cursor: pointer;
}

.switch::after {
  content: '';
  position: absolute;
  inset: calc(var(--space-sm) * -1);
}

.switch:hover {
  border-color: var(--c-brand);
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

  .links {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .knob,
  .links a {
    transition: none;
  }
}
</style>
