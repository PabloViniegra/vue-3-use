import { levels, type LevelId } from './toc'

// El CTA lleva al primer tema del nivel
const firstTopic = (id: LevelId) => `#${levels.find((level) => level.id === id)?.topics[0]?.id ?? id}`

// Un valor del ref del hero por nivel; el orden marca cuánto se abre el fondo
export const heroCopy = {
  cero: {
    label: 'nunca lo has tocado',
    phrase: 'de cero',
    target: firstTopic('basico'),
    tagline:
      'Todo Vue 3 en una sola página: lo básico, lo intermedio, lo avanzado y el ecosistema. Con código que puedes tocar y ejemplos de la vida real.',
    cta: 'Empezar desde cero',
  },
  algo: {
    label: 'sabes lo básico',
    phrase: 'con base',
    target: firstTopic('intermedio'),
    tagline:
      'Ya sabes pintar cosas y qué es un ref. Toca partir la app en componentes: props, slots, watchers, composables y provide / inject.',
    cta: 'Seguir por lo intermedio',
  },
  bastante: {
    label: 'ya lo usas',
    phrase: 'a fondo',
    target: firstTopic('avanzado'),
    tagline:
      'La reactividad por dentro, defineModel, Transition y Teleport, rendimiento y TypeScript.',
    cta: 'Llévame a lo avanzado',
  },
} satisfies Record<string, { label: string; phrase: string; target: string; tagline: string; cta: string }>
