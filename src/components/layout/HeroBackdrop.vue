<script setup lang="ts">
// Cada nivel de la guía abre más el fondo: 0 = cero, 1 = algo, 2 = bastante
defineProps<{ step: number }>()
</script>

<template>
  <div :class="$style.root" :style="{ '--step': step }" aria-hidden="true">
    <div :class="$style.glow" />
  </div>
</template>

<style module>
/* El halo nace detrás del panel de código, que es lo que hace cambiar la página */
.glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 45% 55% at 72% 50%, var(--c-brand-soft), transparent);
  /* "scale" se compone con el transform de la animación de scroll */
  scale: calc(1 + var(--step) * 0.2);
  transition: scale var(--duration-base) var(--ease-out);
}

/* Se anima con la timeline --hero que define TheHero */
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .glow {
      animation: glowGrow linear both;
      animation-timeline: --hero;
      animation-range: exit 0% exit 100%;
    }
  }
}

@media (max-width: 960px) {
  .glow {
    background: radial-gradient(ellipse 80% 40% at 50% 70%, var(--c-brand-soft), transparent);
  }
}

@media (prefers-reduced-motion: reduce) {
  .glow {
    transition: none;
  }
}

@keyframes glowGrow {
  to {
    opacity: 0.4;
    transform: translateY(var(--space-4xl)) scale(1.8);
  }
}
</style>
