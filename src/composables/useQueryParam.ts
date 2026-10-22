import { onMounted, onUnmounted, ref, watch } from 'vue'

export function useQueryParam(name: string) {
  const read = () => new URLSearchParams(location.search).get(name) ?? ''
  const value = ref(read())
  const restore = () => (value.value = read())

  watch(value, (next) => {
    const url = new URL(location.href)

    if ((url.searchParams.get(name) ?? '') === next) return

    if (next) url.searchParams.set(name, next)
    else url.searchParams.delete(name)
    history.replaceState(history.state, '', url)
  }, { flush: 'sync' })

  onMounted(() => window.addEventListener('popstate', restore))
  onUnmounted(() => window.removeEventListener('popstate', restore))

  return value
}
