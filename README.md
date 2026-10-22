# Vue 3 de cero

[![Vue.js 3.5](https://img.shields.io/badge/Vue.js-3.5-4FC08D?logo=vuedotjs&logoColor=white)](https://vuejs.org/)
[![Vite 8](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![TypeScript 6](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![pnpm](https://img.shields.io/badge/pnpm-F69220?logo=pnpm&logoColor=white)](https://pnpm.io/)

> Guía interactiva de Vue 3, en castellano, desde los primeros pasos hasta los conceptos avanzados y su ecosistema. Es un proyecto no oficial y no sustituye la [documentación de Vue](https://vuejs.org/guide/).

Los temas combinan explicación y ejemplos de código; cuando aporta, incluyen demos interactivas y una analogía de «En la vida real». Puedes recorrerlos por nivel o buscar un tema desde el índice.

## Desarrollo local

Necesitas Node.js y pnpm.

```sh
pnpm install
pnpm dev
```

| Comando | Para qué sirve |
| --- | --- |
| `pnpm dev` | Inicia el servidor de desarrollo de Vite. |
| `pnpm lint` | Pasa oxlint con las reglas anti-slop de `tools/oxlint/anti-slop/`. |
| `pnpm build` | Comprueba los tipos con `vue-tsc` y genera la versión de producción en `dist/`. |
| `pnpm preview` | Sirve localmente la versión generada; ejecuta antes `pnpm build`. |

No hay scripts de tests configurados.

## Estructura

- `src/features/guide/`: niveles, contenido y demos de la guía.
- `src/components/`: componentes de interfaz y piezas de layout.
- `src/composables/`: estado y efectos reutilizables.
- `src/lib/`: utilidades y adaptación del resaltado de código con Shiki.
- [`DESIGN.md`](./DESIGN.md): sistema visual y arquitectura del frontend.

## Documentación

- [Guía oficial de Vue](https://vuejs.org/guide/)
- [Guía de Vite](https://vite.dev/guide/)
- [Documentación de TypeScript](https://www.typescriptlang.org/docs/)
