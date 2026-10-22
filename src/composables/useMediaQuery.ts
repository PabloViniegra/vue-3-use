import { onMounted, onUnmounted, ref } from 'vue'

export function useMediaQuery(query: string) {
  const mql = matchMedia(query)
  const matches = ref(mql.matches)
  const update = (e: MediaQueryListEvent) => (matches.value = e.matches)

  onMounted(() => mql.addEventListener('change', update))
  onUnmounted(() => mql.removeEventListener('change', update))

  return matches
}
