// Un nivel de la guía por cada valor del ref del hero, en el mismo orden que toc.ts
export const heroCopy = {
  cero: {
    tagline:
      'Todo Vue 3 en una sola página: lo básico, lo intermedio y lo avanzado. Con código que puedes tocar y ejemplos de la vida real.',
    cta: 'Empezar desde cero',
  },
  algo: {
    tagline:
      'Ya sabes pintar cosas y qué es un ref. Toca partir la app en componentes: props, slots, watchers, composables y provide / inject.',
    cta: 'Seguir por lo intermedio',
  },
  bastante: {
    tagline:
      'La reactividad por dentro, defineModel, Transition y Teleport, rendimiento y TypeScript.',
    cta: 'Llévame a lo avanzado',
  },
} satisfies Record<string, { tagline: string; cta: string }>
