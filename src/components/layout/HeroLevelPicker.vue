<script setup lang="ts">
defineProps<{ options: readonly string[]; hint: string; title: string; target: string }>()

const level = defineModel<string>({ required: true })
</script>

<template>
  <div :class="$style.root">
    <p :class="$style.file">TheHero.vue</p>
    <fieldset :class="$style.code">
      <legend class="visually-hidden">¿Cuánto Vue sabes?</legend>
      <p :class="$style.comment" aria-hidden="true">// ¿Cuánto Vue sabes? Cambia el valor</p>
      <p><span :class="$style.keyword">const</span> nivel = <span :class="$style.fn">ref</span>(</p>
      <p :class="$style.indent">
        <template v-for="(option, i) in options" :key="option"
          ><span v-if="i > 0" :class="$style.union" aria-hidden="true"> | </span
          ><label :class="$style.option"
            ><input
              v-model="level"
              type="radio"
              name="hero-level"
              :value="option"
              class="visually-hidden"
              :class="$style.input" /><span :class="$style.chip"
                ><span aria-hidden="true">'</span>{{ option }}<span aria-hidden="true">'</span></span
              ></label
          ></template
        >
      </p>
      <p>)</p>
      <p :class="$style.comment">// Ahora mismo: {{ hint }}</p>
    </fieldset>
    <div :class="$style.code">
      <p :class="$style.comment">// El resto es computed y se recalcula solo</p>
      <p>
        titulo.value =
        <span :key="title" :class="$style.value">'{{ title }}'</span>
      </p>
      <p>
        destino.value =
        <span :key="target" :class="$style.value">'{{ target }}'</span>
      </p>
    </div>
  </div>
</template>

<style module>
.root {
  border: 1px solid var(--c-divider);
  border-radius: var(--radius-xl);
  background: var(--c-code-bg);
  font-family: var(--font-mono);
  font-variant-ligatures: none;
  font-size: var(--font-size-code);
  line-height: var(--line-height-code);
  color: var(--c-text-code);
  text-align: left;
  overflow: hidden;
}

.file {
  margin: 0;
  padding: var(--space-xs) var(--space-lg);
  border-bottom: 1px solid var(--c-divider);
  background: var(--c-bg-soft);
  font-size: var(--font-size-caption);
  color: var(--c-text-2);
}

.code {
  margin: 0;
  padding: var(--space-md) var(--space-lg);
  border: 0;
}

.code + .code {
  padding-top: 0;
}

.code p {
  margin: 0;
}

.indent {
  padding-left: var(--space-lg);
}

.keyword {
  color: var(--c-text-1);
  font-weight: var(--font-weight-semibold);
}

.fn,
.value {
  color: var(--c-brand-text);
}

.comment {
  color: var(--c-text-2);
}

.union {
  color: var(--c-text-2);
  white-space: pre;
}

.option {
  cursor: pointer;
}

.chip {
  position: relative;
  display: inline-block;
  padding: 0 var(--space-xs);
  border: 1px solid var(--c-text-2);
  border-radius: var(--radius-sm);
  transition:
    background-color var(--duration-fast) var(--ease-out),
    border-color var(--duration-fast) var(--ease-out),
    color var(--duration-fast) var(--ease-out);
}

/* Área táctil mayor sin mover el texto del código */
.chip::after {
  content: '';
  position: absolute;
  inset: calc(var(--space-xs) * -1);
}

.option:hover .chip {
  border-color: var(--c-brand-text);
}

/* En claro el verde contra el panel no llega a 3:1: el contorno oscuro marca el estado */
.input:checked + .chip {
  background: var(--c-brand);
  border-color: var(--c-brand-control-border);
  color: var(--c-on-brand);
  font-weight: var(--font-weight-semibold);
}

.input:focus-visible + .chip {
  outline: var(--focus-ring) solid var(--c-focus);
  outline-offset: var(--focus-ring);
}

/* El :key vuelve a montar el valor al cambiar, y el destello marca qué se ha recalculado */
.value {
  border-radius: var(--radius-sm);
  animation: recomputed var(--duration-base) var(--ease-out);
}

@keyframes recomputed {
  from {
    background: var(--c-brand-soft);
  }
}

@media (max-width: 480px) {
  .file,
  .code {
    padding-inline: var(--space-md);
  }

  .indent {
    padding-left: var(--space-md);
  }
}

@media (prefers-reduced-motion: reduce) {
  .chip {
    transition: none;
  }

  .value {
    animation: none;
  }
}
</style>
