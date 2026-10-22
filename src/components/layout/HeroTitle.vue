<script setup lang="ts">
// El aria-label del h1 existe porque el inline-block del acento hace que el lector de pantalla
// meta un espacio antes de la coma
defineProps<{ phrase: string }>()
</script>

<template>
  <h1 :class="$style.title" :aria-label="`Vue 3, ${phrase}, hasta que te pregunten a ti`">
    Vue 3,
    <Transition
      mode="out-in"
      :enter-from-class="$style.wordEnter"
      :leave-to-class="$style.wordLeave"
      :enter-active-class="$style.wordActive"
      :leave-active-class="$style.wordActive"
    >
      <span :key="phrase" :class="$style.accent">{{ phrase }}</span>
    </Transition
    >,<br />
    hasta que te pregunten&nbsp;a&nbsp;ti
  </h1>
</template>

<style module>
.title {
  margin: 0;
  font-family: var(--font-display);
  font-size: var(--font-size-display);
  font-weight: var(--font-weight-heavy);
  line-height: var(--line-height-display);
  letter-spacing: var(--letter-spacing-display);
  color: var(--c-text-1);
  text-wrap: balance;
}

/* El mismo verde que el valor elegido en el panel: la palabra es ese ref */
.accent {
  display: inline-block;
  padding: 0 var(--space-xs);
  border-radius: var(--radius-lg);
  background: var(--c-brand-soft);
  color: var(--c-brand-text);
}

/* El cursor de editor: la palabra es un valor que se puede cambiar */
.accent::after {
  content: '';
  display: inline-block;
  width: var(--space-xxs);
  height: 0.75em;
  margin-left: var(--space-xxs);
  border-radius: var(--radius-sm);
  background: var(--c-brand-text);
  vertical-align: -0.04em;
}

@media (prefers-reduced-motion: no-preference) {
  .accent::after {
    animation: caret 1.1s steps(1) infinite;
  }

  .wordActive {
    transition-property: opacity, transform;
    transition-duration: var(--duration-fast);
    transition-timing-function: var(--ease-out);
  }
}

.wordEnter,
.wordLeave {
  opacity: 0;
  transform: translateY(var(--space-xs));
}

.wordLeave {
  transform: translateY(calc(var(--space-xs) * -1));
}

@keyframes caret {
  50% {
    opacity: 0;
  }
}

@media (max-width: 960px) {
  .title {
    font-size: var(--font-size-display-md);
  }
}

@media (max-width: 480px) {
  .title {
    font-size: var(--font-size-display-sm);
  }
}
</style>
