<script setup lang="ts">
const {
  variant = 'brand',
  size = 'md',
  href,
  type = 'button',
  square = false,
} = defineProps<{
  variant?: 'brand' | 'alt'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  type?: 'button' | 'submit'
  // Para botones de un solo carácter (− / +): mismo ancho que alto
  square?: boolean
}>()
</script>

<template>
  <a
    v-if="href"
    :href="href"
    :class="[$style.root, $style[variant], $style[size], square && $style.square]"
  >
    <slot />
  </a>
  <button
    v-else
    :type="type"
    :class="[$style.root, $style[variant], $style[size], square && $style.square]"
  >
    <slot />
  </button>
</template>

<style module>
.root {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-xs);
  border: 1px solid transparent;
  border-radius: var(--radius-full);
  font-weight: var(--font-weight-semibold);
  line-height: 1;
  text-align: center;
  cursor: pointer;
  transition:
    background-color var(--duration-fast),
    border-color var(--duration-fast),
    color var(--duration-fast);
}

.root:hover {
  text-decoration: none;
}

.root:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.brand {
  background: var(--c-brand);
  color: var(--c-on-brand);
}

.brand:not(:disabled):hover {
  background: var(--c-brand-light);
}

.alt {
  background: var(--c-bg-mute);
  color: var(--c-text-1);
  border-color: var(--c-divider);
}

.alt:not(:disabled):hover {
  border-color: var(--c-divider-strong);
}

.sm {
  min-height: var(--button-sm-height);
  padding: 0 var(--button-sm-padding);
  font-size: var(--font-size-caption);
}

.md {
  min-height: var(--button-height);
  padding: 0 var(--button-padding);
  font-size: var(--font-size-label);
}

.lg {
  min-height: var(--button-lg-height);
  padding: 0 var(--button-lg-padding);
  font-size: var(--font-size-body);
}

.square {
  width: var(--button-sm-height);
  padding: 0;
}

.md.square {
  width: var(--button-height);
}

@media (prefers-reduced-motion: reduce) {
  .root {
    transition: none;
  }
}
</style>
