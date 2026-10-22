<script setup lang="ts">
// Cada nivel de la guía abre más el fondo: 0 = cero, 1 = algo, 2 = bastante
defineProps<{ step: number }>()
</script>

<template>
  <div :class="$style.root" :style="{ '--step': step }" aria-hidden="true">
    <div :class="$style.glow" />
    <div :class="$style.orb" />
  </div>
</template>

<style module>
.glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 60% 50% at 50% 40%, var(--c-brand-soft), transparent);
  /* "scale" se compone con el transform de la animación de scroll */
  scale: calc(1 + var(--step) * 0.2);
  transition: scale var(--duration-base) var(--ease-out);
}

/* Se anima con la timeline --hero que define TheHero */
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .glow,
    .orb {
      animation-timing-function: linear;
      animation-fill-mode: both;
      animation-timeline: --hero;
      animation-range: exit 0% exit 100%;
    }

    .glow {
      animation-name: glowGrow;
    }

    .orb {
      animation-name: orbRise;
    }
  }
}

.orb {
  position: absolute;
  top: 55%;
  left: 62%;
  width: 40vmin;
  height: 40vmin;
  border-radius: var(--radius-full);
  background: radial-gradient(circle, var(--c-accent-soft), transparent 70%);
  scale: calc(0.6 + var(--step) * 0.5);
  transition: scale var(--duration-base) var(--ease-out);
}

@media (prefers-reduced-motion: reduce) {
  .glow,
  .orb {
    transition: none;
  }
}

@keyframes glowGrow {
  to {
    opacity: 0.4;
    transform: translateY(var(--space-4xl)) scale(1.8);
  }
}

@keyframes orbRise {
  to {
    transform: translate(calc(var(--space-4xl) * -1), calc(var(--space-4xl) * -2)) scale(1.6);
  }
}
</style>
