<script setup lang="ts">
import { computed, useTemplateRef, watch } from 'vue'
import TheFooter from './components/layout/TheFooter.vue'
import TheHero from './components/layout/TheHero.vue'
import TheLocalNav from './components/layout/TheLocalNav.vue'
import TheNav from './components/layout/TheNav.vue'
import TheSidebar from './components/layout/TheSidebar.vue'
import { useActiveSection } from './composables/useActiveSection'
import { useAnchorNavigation } from './composables/useAnchorNavigation'
import { useDisclosure } from './composables/useDisclosure'
import { useKeyShortcut } from './composables/useKeyShortcut'
import { useMediaQuery } from './composables/useMediaQuery'
import { useTheme } from './composables/useTheme'
import GuideContent from './features/guide/GuideContent.vue'
import { levels } from './features/guide/content/toc'

const sidebarGroups = [...levels, { id: 'y-ahora-que', title: 'Y ahora, ¿qué?' }]

const activeId = useActiveSection([
  ...levels.flatMap((level) => level.topics.map((t) => t.id)),
  'y-ahora-que',
])

useAnchorNavigation()

// "Nivel › tema" para la barra del índice en móvil
const location = computed(() => {
  for (const level of levels) {
    const topic = level.topics.find((t) => t.id === activeId.value)

    if (topic) return { level: level.title, topic: topic.title }
  }

  return { topic: sidebarGroups.find((g) => g.id === activeId.value)?.title ?? 'Introducción' }
})

const { isDark, toggle: toggleTheme } = useTheme()
const localNav = useTemplateRef('localNav')
const menu = useDisclosure(() => localNav.value?.focus())
const sidebar = useTemplateRef('sidebar')
const isMobile = useMediaQuery('(max-width: 960px)')

// Con el índice abierto en móvil, lo de detrás no se enfoca ni se lee: Tab no se escapa
const isModal = computed(() => menu.open.value && isMobile.value)

// El botón que abre el índice pasa a inert: sin esto el foco cae en <body>
watch(isModal, (modal) => {
  if (modal) sidebar.value?.focusFilter()
})

// En móvil el índice está plegado: hay que abrirlo antes de enfocar el filtro
useKeyShortcut('/', () => {
  if (isMobile.value) menu.open.value = true
  sidebar.value?.focusFilter()
})
</script>

<template>
  <a :class="$style.skip" href="#contenido">Saltar al contenido</a>
  <TheNav :links="levels" :dark="isDark" :inert="isModal" @toggle-theme="toggleTheme" />

  <TheLocalNav
    ref="localNav"
    :open="menu.open.value"
    :location="location"
    :inert="isModal"
    @toggle="menu.toggle"
  />

  <div :inert="isModal">
    <TheHero :levels="levels" />
  </div>

  <div :class="$style.layout">
    <TheSidebar
      ref="sidebar"
      :groups="sidebarGroups"
      :active-id="activeId"
      :open="menu.open.value"
      @close="menu.close"
    />

    <main id="contenido" :class="$style.content" :inert="isModal">
      <GuideContent />
      <TheFooter />
    </main>
  </div>
</template>

<style module>
.skip {
  position: absolute;
  top: var(--space-xs);
  left: var(--space-md);
  z-index: var(--z-skip);
  padding: var(--space-xs) var(--space-md);
  background: var(--c-bg);
  border-radius: var(--radius-lg);
  transform: translateY(calc(-100% - var(--space-md)));
}

.skip:focus {
  transform: none;
}

.layout {
  display: flex;
  border-top: 1px solid var(--c-divider);
}

.content {
  flex: 1;
  min-width: 0;
  max-width: var(--content-max);
  padding: 0 var(--space-2xl) var(--space-3xl) var(--space-3xl);
}

@media (max-width: 960px) {
  .layout {
    border-top: 0;
  }

  .content {
    padding: 0 var(--space-lg) var(--space-2xl);
  }
}
</style>
