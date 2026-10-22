<script setup lang="ts">
defineProps<{ options: readonly string[] }>()
const level = defineModel<string>({ required: true })
</script>

<template>
  <fieldset :class="$style.root">
    <legend class="visually-hidden">¿Cuánto Vue sabes?</legend>
    <p :class="$style.line">
      <span :class="$style.keyword">const</span> nivel = <span :class="$style.fn">ref</span>(<template
        v-for="(option, i) in options"
        :key="option"
        ><span v-if="i > 0" :class="$style.union" aria-hidden="true"> | </span
        ><label :class="$style.option"
          ><input
            v-model="level"
            type="radio"
            name="hero-level"
            :value="option"
            class="visually-hidden"
            :class="$style.input" /><span :class="$style.chip">'{{ option }}'</span></label
        ></template
      >)
    </p>
    <p :class="$style.comment">// Cambia el valor: el título, el texto y el botón son computed.</p>
  </fieldset>
</template>

<style module>
.root {
  display: inline-block;
  max-width: 100%;
  margin: 0 0 var(--space-xl);
  padding: var(--space-md) var(--space-lg);
  border: 1px solid var(--c-divider);
  border-radius: var(--radius-lg);
  background: var(--c-code-bg);
  font-family: var(--font-mono);
  font-size: var(--font-size-code);
  line-height: var(--line-height-code);
  color: var(--c-text-code);
  text-align: left;
}

.line,
.comment {
  margin: 0;
}

.keyword {
  color: var(--c-text-1);
  font-weight: var(--font-weight-semibold);
}

.fn {
  color: var(--c-brand-text);
}

.union {
  color: var(--c-text-2);
  white-space: pre;
}

.option {
  cursor: pointer;
}

.chip {
  display: inline-block;
  padding: 0 var(--space-xs);
  border: 1px solid var(--c-text-2);
  border-radius: var(--radius-sm);
  transition:
    background-color var(--duration-fast) var(--ease-out),
    border-color var(--duration-fast) var(--ease-out),
    color var(--duration-fast) var(--ease-out);
}

.option:hover .chip {
  border-color: var(--c-brand-text);
}

.input:checked + .chip {
  background: var(--c-brand);
  border-color: var(--c-brand);
  color: var(--c-on-brand);
  font-weight: var(--font-weight-semibold);
}

.input:focus-visible + .chip {
  outline: var(--focus-ring) solid var(--c-focus);
  outline-offset: var(--focus-ring);
}

.comment {
  margin-top: var(--space-xxs);
  color: var(--c-text-2);
  font-size: var(--font-size-caption);
}

@media (prefers-reduced-motion: reduce) {
  .chip {
    transition: none;
  }
}
</style>
