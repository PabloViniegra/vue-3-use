# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **El autor**, que la usa para aprender Vue 3 y como chuleta propia.
- **Compañeros de trabajo** del autor, que la consultan para entender un concepto o
  repasarlo rápido. Nivel variable: desde quien no ha tocado Vue hasta quien ya lo usa.

## Product Purpose

Guía de Vue 3 en una sola página, en castellano, de nivel básico a avanzado. Tiene éxito si:

1. El lector entiende cada concepto y es capaz de explicarlo con sus palabras.
2. Sirve como referencia: un concepto se encuentra y se recuerda en segundos.

## Positioning

Todo Vue 3 en una página, contado en castellano informal, con una estructura fija por tema
(explicación → código → demo que funciona → analogía "En la vida real"). Es un recurso propio
y para un equipo concreto, no un sustituto de la documentación oficial.

## Operating Context

- Lectura de principio a fin para aprender y consulta puntual saltando desde la sidebar.
- Se comparte con compañeros mediante un enlace público.

## Capabilities and Constraints

- SPA de una sola página, sin rutas ni backend. Debe seguir así.
- En este repo está configurado un workflow de publicación a GitHub Pages
  (`.github/workflows/pages.yml`). El dominio y el hosting efectivos no se verifican aquí.
- Solo castellano de España; no habrá traducciones.
- Cuatro niveles (Básico, Intermedio, Avanzado y Ecosistema) definidos en `src/features/guide/content/toc.ts`, que alimenta
  sidebar, hero y sección activa.
- Demos interactivas reales en `src/features/guide/demos/`.
- Stack fijado: Vue 3.5, Vite, TypeScript, pnpm. No se añaden dependencias sin preguntar.

## Brand Commitments

- **Proyecto no oficial de Vue.** Usa la identidad visual de vuejs.org, pero no debe
  parecer ni presentarse como documentación oficial.
- Voz: castellano de España, tuteando, informal y algo desenfadado pero técnicamente exacto.

## Evidence on Hand

- Contenido de los temas, snippets (`src/features/guide/content/snippets.ts`) y demos propias.
- No hay testimonios, métricas de uso ni avales. No se inventan.

## Product Principles

1. Exactitud antes que gracia: el tono es ligero, el contenido no.
2. Entender, no memorizar: cada concepto con demo y analogía para poder explicarlo.
3. Encontrable en segundos: estructura predecible y navegación directa a cada tema.
4. Una página, un idioma, sin dependencias superfluas.

## Accessibility & Inclusion

WCAG AA medido (4.5:1 texto, 3:1 controles), teclado completo, foco visible y respeto a
`prefers-reduced-motion`.
