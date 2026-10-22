<script setup lang="ts">
defineProps<{ items: { name: string; href: string; text: string }[] }>()
</script>

<template>
  <ul :class="$style.root">
    <li v-for="item in items" :key="item.name" :class="$style.item">
      <a :href="item.href" target="_blank" rel="noopener">
        {{ item.name }}<span class="visually-hidden"> (se abre en otra pestaña)</span>
      </a>
      <span :class="$style.text">{{ item.text }}</span>
    </li>
  </ul>
</template>

<style module>
.root {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(var(--card-min), 1fr));
  gap: var(--space-sm);
  margin: var(--space-md) 0;
  padding: 0;
  list-style: none;
}

.root .item {
  display: flex;
  flex-direction: column;
  gap: var(--space-xxs);
  margin: 0;
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-lg);
  background: var(--c-bg-soft);
  font-size: var(--font-size-label);
}

.text {
  color: var(--c-text-2);
}
</style>
