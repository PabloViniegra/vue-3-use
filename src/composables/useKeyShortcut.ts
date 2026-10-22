import { onMounted, onUnmounted } from 'vue'

// Atajo de una sola tecla: no salta mientras escribes en un campo ni con modificadores
export function useKeyShortcut(key: string, handler: () => void) {
  function onKeydown(e: KeyboardEvent) {
    if (e.key !== key || e.ctrlKey || e.metaKey || e.altKey) return
    const target = e.target as HTMLElement
    if (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) {
      return
    }
    e.preventDefault()
    handler()
  }

  onMounted(() => document.addEventListener('keydown', onKeydown))
  onUnmounted(() => document.removeEventListener('keydown', onKeydown))
}
