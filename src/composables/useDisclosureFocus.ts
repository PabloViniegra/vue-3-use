import { watch, type Ref } from 'vue'

// El disparador y el contenido se alternan: enfoca el botón que queda tras el render.
// Sin scroll: al cerrar con un clic lejano, la página no debe volver de golpe a la demo
export function useDisclosureFocus(open: Ref<boolean>, root: Ref<HTMLElement | null>) {
  watch(open, () => root.value?.querySelector('button')?.focus({ preventScroll: true }), { flush: 'post' })
}
