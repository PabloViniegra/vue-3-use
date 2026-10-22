<script setup lang="ts">
import { type Directive, ref } from 'vue'
import BaseButton from '../../../components/ui/BaseButton.vue'

type ClickOutsideEl = HTMLElement & { _onClickOutside?: (e: PointerEvent) => void }

// La directiva solo sabe de DOM: escucha el documento y avisa si el clic cae fuera de él
const vClickFuera: Directive<ClickOutsideEl, () => void> = {
  mounted(el, binding) {
    el._onClickOutside = (e) => {
      if (!(e.target instanceof Node) || !el.contains(e.target)) binding.value()
    }

    document.addEventListener('pointerdown', el._onClickOutside)
  },
  unmounted(el) {
    if (el._onClickOutside) document.removeEventListener('pointerdown', el._onClickOutside)
  },
}

const abierto = ref(false)
const cierres = ref(0)

function cerrar() {
  abierto.value = false
  cierres.value++
}
</script>

<template>
  <div v-if="abierto" v-click-fuera="cerrar" :class="$style.menu">
    <p>Este menú tiene <code>v-click-fuera</code>. Pincha en cualquier otro sitio de la página.</p>
    <BaseButton size="sm" variant="alt" @click="abierto = false">Cerrar desde dentro</BaseButton>
  </div>
  <BaseButton v-else size="sm" @click="abierto = true">Abrir el menú</BaseButton>
  <p :class="$style.out" aria-live="polite">
    Cerrado desde fuera {{ cierres }} {{ cierres === 1 ? 'vez' : 'veces' }}
  </p>
</template>

<style module>
.menu {
  padding: var(--space-md);
  border: 1px solid var(--c-divider);
  border-radius: var(--radius-lg);
  background: var(--c-bg-soft);
}

.menu p {
  margin: 0 0 var(--space-sm);
}

.out {
  margin: var(--space-sm) 0 0;
  font-size: var(--font-size-label);
  color: var(--c-text-2);
}
</style>
