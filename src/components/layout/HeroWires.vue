<script setup lang="ts">
import { onWatcherCleanup, ref, useTemplateRef, watch } from 'vue'

type Point = [x: number, y: number]

const { panel, titleRow, targetRow, accent, button, signal } = defineProps<{
  panel: HTMLElement | null
  titleRow: HTMLElement | null
  targetRow: HTMLElement | null
  accent: HTMLElement | null
  button: HTMLElement | null
  signal: string
}>()

const CORNER = 8
const PORT = 3

const svg = useTemplateRef<SVGSVGElement>('svg')
const wires = ref<{ d: string; ends: Point[] }[]>([])
const pulses = ref(0)

// Mientras la palabra de acento cambia (Transition out-in) no existe: se reutiliza su última posición
let lastAccent: ReturnType<typeof boxOf> | undefined

// offsetLeft/offsetTop ignoran los transform: las animaciones de entrada y de scroll no descolocan el cable
function boxOf(element: HTMLElement, root: Element) {
  let x = 0
  let y = 0

  for (let node: Element | null = element; node instanceof HTMLElement && node !== root; node = node.offsetParent) {
    x += node.offsetLeft
    y += node.offsetTop
  }

  return { x, y, w: element.offsetWidth, h: element.offsetHeight }
}

function trace(points: Point[]) {
  return points
    .map(([x, y], i) => {
      const prev = points[i - 1]
      const next = points[i + 1]

      if (!prev) return `M${x} ${y}`

      if (!next) return `L${x} ${y}`

      const toward = ([tx, ty]: Point) => {
        const length = Math.hypot(tx - x, ty - y)
        const radius = Math.min(CORNER, length / 2)

        return length ? `${x + ((tx - x) / length) * radius} ${y + ((ty - y) / length) * radius}` : `${x} ${y}`
      }

      return `L${toward(prev)}Q${x} ${y} ${toward(next)}`
    })
    .join('')
}

function measure() {
  const root = svg.value?.parentElement

  if (!root || !panel || !titleRow || !targetRow || !button) return

  const a = accent ? boxOf(accent, root) : lastAccent

  if (!a) return

  lastAccent = a
  const p = boxOf(panel, root)
  const b = boxOf(button, root)
  const titleY = boxOf(titleRow, root).y + titleRow.offsetHeight / 2
  const targetY = boxOf(targetRow, root).y + targetRow.offsetHeight / 2
  const buttonY = b.y + b.h / 2
  const inletX = a.x + 24
  // Apilado (móvil): el panel queda encima del botón y el cable del título sube por el margen
  const stacked = p.x < b.x + b.w
  const lane = stacked ? 12 : 24

  // Si la palabra empieza la línea (móvil estrecho), entrar por arriba cruzaría «Vue 3,»: entra por la izquierda
  const routes: Point[][] = [
    a.x - b.x < lane
      ? [[p.x, titleY], [p.x - lane, titleY], [p.x - lane, a.y + a.h / 2], [a.x, a.y + a.h / 2]]
      : [[p.x, titleY], [p.x - lane, titleY], [p.x - lane, a.y - lane], [inletX, a.y - lane], [inletX, a.y]],
    stacked
      ? [[b.x + 28, p.y + p.h], [b.x + 28, b.y]]
      : [[p.x, targetY], [p.x - 40, targetY], [p.x - 40, buttonY], [b.x + b.w, buttonY]],
  ]

  wires.value = routes.map((points) => ({ d: trace(points), ends: [points[0]!, points.at(-1)!] }))
}

watch(
  () => [panel, titleRow, targetRow, accent, button],
  (elements) => {
    const root = svg.value?.parentElement

    if (!root) return

    const observer = new ResizeObserver(measure)

    for (const element of [root, ...elements]) if (element) observer.observe(element)
    onWatcherCleanup(() => observer.disconnect())
  },
  { flush: 'post' },
)

watch(
  () => signal,
  () => pulses.value++,
)
</script>

<template>
  <svg ref="svg" :class="$style.root" aria-hidden="true" focusable="false">
    <g v-for="(wire, i) in wires" :key="i" :style="{ '--wire': i }">
      <path :class="$style.wire" :d="wire.d" pathLength="1" />
      <path v-if="pulses" :key="pulses" :class="$style.pulse" :d="wire.d" pathLength="1" />
      <circle v-for="([x, y], end) in wire.ends" :key="end" :class="$style.port" :cx="x" :cy="y" :r="PORT" />
    </g>
  </svg>
</template>

<style module>
.root {
  --wire-delay: calc(var(--duration-base) + var(--stagger) * 2);

  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  pointer-events: none;
  fill: none;
}

.wire {
  stroke: var(--c-brand-text);
  stroke-width: var(--wire-width);
  stroke-dasharray: 1;
}

.port {
  fill: var(--c-bg);
  stroke: var(--c-brand-text);
  stroke-width: var(--wire-width);
}

/* Un guion de longitud cero con extremos redondos es un punto: recorre el cable del panel al destino */
.pulse {
  stroke: var(--c-brand-text);
  stroke-width: var(--space-xs);
  stroke-linecap: round;
  stroke-dasharray: 0 2;
  opacity: 0;
}

.wire,
.port {
  animation: wireFade var(--duration-base) var(--ease-out) var(--wire-delay) both;
}

@keyframes wireFade {
  from {
    opacity: 0;
  }
}

@media (prefers-reduced-motion: no-preference) {
  /* Cada cable se traza cuando el hero ya ha entrado, y el puerto de llegada aparece al terminar */
  .wire {
    animation-name: wireDraw;
    animation-delay: calc(var(--wire-delay) + var(--wire) * var(--stagger));
  }

  .port:last-child {
    animation-delay: calc(var(--wire-delay) + var(--duration-base) + var(--wire) * var(--stagger));
  }

  .pulse {
    animation: wirePulse var(--duration-base) linear;
  }

  /* Se van los primeros al hacer scroll: el título se mueve y dejarían de tocarlo */
  @supports (animation-timeline: view()) {
    .root {
      animation: wiresAway linear both;
      animation-timeline: --hero;
      animation-range: exit 0% exit 12%;
    }
  }
}

@keyframes wireDraw {
  from {
    stroke-dashoffset: 1;
  }
}

@keyframes wirePulse {
  from {
    opacity: 1;
  }

  to {
    stroke-dashoffset: -1;
    opacity: 1;
  }
}

@keyframes wiresAway {
  to {
    opacity: 0;
  }
}
</style>
