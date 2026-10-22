import { watch, type Ref } from 'vue'

// El disparador y el contenido se alternan: enfoca el botón que queda tras el render.
export function useDisclosureFocus(open: Ref<boolean>, root: Ref<HTMLElement | null>) {
  watch(open, () => root.value?.querySelector('button')?.focus(), { flush: 'post' })
}
