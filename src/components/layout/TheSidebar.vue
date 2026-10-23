<script setup lang="ts">
import { computed, nextTick, useTemplateRef } from 'vue'
import { useKeepActiveInView } from '../../composables/useKeepActiveInView'
import { useQueryParam } from '../../composables/useQueryParam'
import SidebarEmpty from './SidebarEmpty.vue'
import SidebarFilter from './SidebarFilter.vue'
import SidebarGroupList from './SidebarGroupList.vue'
import SidebarPanelHeader from './SidebarPanelHeader.vue'

interface SidebarGroup {
  id: string
  title: string
  topics?: { id: string; title: string; keywords?: string[] }[]
}

const props = defineProps<{ groups: SidebarGroup[]; activeId: string; open: boolean }>()
const emit = defineEmits<{ close: [restoreFocus?: boolean] }>()

const query = useQueryParam('tema')

// Sin tildes ni mayúsculas: "asincronos" encuentra "Componentes asíncronos"
const normalize = (text: string) =>
  text.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().trim()

// Si coincide el nivel se ve entero; si no, solo sus temas que coinciden
const visibleGroups = computed(() => {
  const q = normalize(query.value)

  if (!q) return props.groups

  return props.groups.flatMap((group) => {
    if (normalize(group.title).includes(q)) return [group]

    const topics = group.topics?.filter((topic) =>
      [topic.title, ...(topic.keywords ?? [])].some((text) => normalize(text).includes(q)),
    )

    return topics?.length ? [{ ...group, topics }] : []
  })
})

const matchCount = computed(() =>
  visibleGroups.value.reduce((total, group) => total + (group.topics?.length ?? 1), 0),
)

const filter = useTemplateRef('filter')
const focusFilter = () => nextTick(() => filter.value?.focus())

// El botón desaparece al vaciar: el foco vuelve al campo para no perderse
function clearFilter() {
  query.value = ''
  focusFilter()
}

const root = useTemplateRef('root')

useKeepActiveInView(root, () => props.activeId)

// El nivel en el que estás: su número se marca para que se note el avance
const currentGroupId = computed(
  () =>
    props.groups.find((g) => g.id === props.activeId || g.topics?.some((t) => t.id === props.activeId))
      ?.id,
)

defineExpose({ focusFilter, focusPanel: () => nextTick(() => root.value?.focus()) })
</script>

<template>
  <div v-if="open" :class="$style.scrim" @click="emit('close', true)" />
  <nav id="sidebar" ref="root" :tabindex="open ? -1 : undefined" :class="[$style.root, open && $style.open]" aria-label="Índice">
    <SidebarPanelHeader v-if="open" @close="emit('close', true)" />
    <SidebarFilter ref="filter" v-model="query" />
    <p class="visually-hidden" aria-live="polite">
      {{ query ? `${matchCount} ${matchCount === 1 ? 'tema' : 'temas'}` : '' }}
    </p>
    <SidebarEmpty v-if="!visibleGroups.length" :query="query" @clear="clearFilter" />
    <SidebarGroupList
      :groups="visibleGroups"
      :all-groups="props.groups"
      :active-id="activeId"
      :current-group-id="currentGroupId"
      :query="query"
      @select="emit('close')"
    />
  </nav>
</template>

<style module>
/* Solo recibe el foco por código al abrir el panel táctil; el anillo ahí no señala nada accionable */
.root:focus {
  outline: none;
}

.root {
  position: sticky;
  top: var(--nav-height);
  align-self: start;
  flex-shrink: 0;
  width: var(--sidebar-width);
  height: calc(100vh - var(--nav-height));
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: var(--space-xl) var(--space-lg) var(--space-4xl) var(--space-xl);
  background: var(--c-bg-soft);
  border-right: 1px solid var(--c-divider);
}

.scrim {
  display: none;
}

/* Centra sidebar + contenido en pantallas anchas sin cortar el fondo de la sidebar */
@media (min-width: 961px) {
  .root {
    --gutter: max(0px, (100vw - var(--layout-max)) / 2);

    width: calc(var(--sidebar-width) + var(--gutter));
    padding-left: calc(var(--space-xl) + var(--gutter));
  }
}

@media (min-width: 1280px) {
  .root {
    --gutter: max(0px, (100vw - var(--layout-max-wide)) / 2);
  }
}

@media (max-width: 960px) {
  .root {
    position: fixed;
    z-index: var(--z-panel);
    top: calc(var(--nav-height) + var(--local-nav-height));
    bottom: 0;
    left: 0;
    /* Con "start", Chrome encoge la caja al contenido y la sube al desbordar */
    align-self: auto;
    height: auto;
    max-width: 85vw;
    transform: translateX(-100%);
    visibility: hidden;
    transition:
      transform var(--duration-base) var(--ease-drawer),
      visibility var(--duration-base);
  }

  /* Al abrir, visible al instante: si no, el filtro no se puede enfocar en el primer frame */
  .root.open {
    transform: none;
    visibility: visible;
    transition:
      transform var(--duration-base) var(--ease-drawer),
      visibility 0s;
    box-shadow: var(--shadow-panel);
  }

  .scrim {
    display: block;
    position: fixed;
    inset: 0;
    z-index: var(--z-scrim);
    background: var(--c-scrim);
  }
}

@media (prefers-reduced-motion: reduce) {
  .root {
    transition: none;
  }
}
</style>
