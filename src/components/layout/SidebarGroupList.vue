<script setup lang="ts">
interface SidebarGroup {
  id: string
  title: string
  topics?: { id: string; title: string; keywords?: string[] }[]
}

const props = defineProps<{
  groups: SidebarGroup[]
  allGroups: SidebarGroup[]
  activeId: string
  currentGroupId: string | undefined
  query: string
}>()

const emit = defineEmits<{ select: [] }>()

const normalize = (text: string) =>
  text.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().trim()

function matchedKeyword(topic: { title: string; keywords?: string[] }) {
  const query = normalize(props.query)

  if (!query || normalize(topic.title).includes(query)) return undefined

  return topic.keywords?.find((keyword) => normalize(keyword).includes(query))
}

const groupNumber = (id: string) =>
  String(props.allGroups.findIndex((group) => group.id === id) + 1).padStart(2, '0')
</script>

<template>
  <div v-for="group in groups" :key="group.id" :class="$style.group">
    <a
      :class="[$style.groupTitle, activeId === group.id && $style.active]"
      :href="`#${group.id}`"
      :aria-current="activeId === group.id ? 'location' : undefined"
      @click="emit('select')"
    >
      <span
        v-if="group.topics"
        :class="[$style.number, currentGroupId === group.id && $style.current]"
        aria-hidden="true"
        >{{ groupNumber(group.id) }}</span
      >{{ group.title }}
    </a>
    <ul v-if="group.topics" :class="$style.list">
      <li v-for="topic in group.topics" :key="topic.id">
        <a
          :href="`#${topic.id}`"
          :class="[$style.link, activeId === topic.id && $style.active]"
          :aria-current="activeId === topic.id ? 'location' : undefined"
          @click="emit('select')"
        >
          {{ topic.title }}
          <span v-if="matchedKeyword(topic)" :class="$style.reason" aria-hidden="true">
            coincide con «{{ matchedKeyword(topic) }}»
          </span>
        </a>
      </li>
    </ul>
  </div>
</template>

<style module>
.group + .group {
  margin-top: var(--space-md);
  padding-top: var(--space-md);
  border-top: 1px solid var(--c-divider);
}

.groupTitle {
  display: flex;
  align-items: baseline;
  gap: var(--space-xs);
  font-family: var(--font-display);
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-bold);
  color: var(--c-text-1);
}

.number {
  font-family: var(--font-mono);
  font-size: var(--font-size-caption);
  font-weight: var(--font-weight-medium);
  color: var(--c-text-2);
  transition: color var(--duration-fast);
}

.number.current {
  color: var(--c-brand-text);
}

.list {
  list-style: none;
  margin: var(--space-xs) 0 0;
  padding: 0;
}

.link {
  display: block;
  min-block-size: var(--space-lg);
  padding: var(--space-xxs) 0;
  font-size: var(--font-size-label);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-label);
  color: var(--c-text-2);
  transition: color var(--duration-fast);
}

.reason {
  display: block;
  font-size: var(--font-size-caption);
  font-weight: var(--font-weight-regular);
  color: var(--c-text-2);
}

.link:hover {
  color: var(--c-text-1);
  text-decoration: none;
}

/* El peso refuerza el color: el tema activo no se distingue solo por el tono */
.groupTitle.active,
.link.active {
  font-weight: var(--font-weight-semibold);
  color: var(--c-brand-text);
}

@media (prefers-reduced-motion: reduce) {
  .number,
  .link {
    transition: none;
  }
}
</style>
