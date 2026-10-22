---
version: alpha
name: Vue 3 de cero
description: Guía de Vue 3 en una sola página con la identidad visual de vuejs.org (paleta de @vue/theme, layout tipo VitePress), en claro y oscuro, estilada con CSS Modules.
colors:
  brand: "#42b883"
  brand-light: "#42d392"
  brand-text: "#287953"
  brand-soft: "rgba(66, 184, 131, 0.12)"
  on-brand: "#1a1a1a"
  accent-blue: "#647eff"
  bg: "#ffffff"
  bg-soft: "#f9f9f9"
  bg-mute: "#f1f1f1"
  divider: "rgba(60, 60, 60, 0.12)"
  divider-strong: "rgba(60, 60, 60, 0.29)"
  text-1: "#213547"
  text-2: "rgba(60, 60, 60, 0.78)"
  text-code: "#476582"
  code-bg: "#f6f6f7"
  warning: "#e7c000"
  warning-soft: "rgba(255, 197, 23, 0.1)"
  warning-text: "#8a6d00"
  scrim: "rgba(0, 0, 0, 0.6)"
  focus: "#287953"
  brand-text-dark: "#42d392"
  brand-soft-dark: "rgba(66, 184, 131, 0.16)"
  bg-dark: "#1a1a1a"
  bg-soft-dark: "#242424"
  bg-mute-dark: "#2f2f2f"
  divider-dark: "rgba(84, 84, 84, 0.65)"
  divider-strong-dark: "#545454"
  text-1-dark: "rgba(255, 255, 245, 0.86)"
  text-2-dark: "rgba(235, 235, 235, 0.6)"
  text-code-dark: "#c9def1"
  code-bg-dark: "#161618"
  warning-soft-dark: "rgba(255, 197, 23, 0.08)"
  warning-text-dark: "#f0d264"
  focus-dark: "#42b883"
typography:
  display:
    fontFamily: Inter
    fontSize: 76px
    fontWeight: 900
    lineHeight: 1.1
    letterSpacing: -1.5px
  display-md:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: 900
    lineHeight: 1.1
    letterSpacing: -1px
  display-sm:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: 900
    lineHeight: 1.1
    letterSpacing: -1px
  headline-lg:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: -0.01em
  title:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.4
  headline-lg-sm:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: -0.02em
  lead:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: 400
    lineHeight: 1.5
  lead-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.7
  body-sm:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.5
  caption:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.5
  code:
    fontFamily: ui-monospace, Menlo, Monaco, Consolas, monospace
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.7
rounded:
  sm: 4px
  md: 6px
  lg: 8px
  xl: 12px
  full: 9999px
spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  4xl: 96px
  nav-height: 55px
  sidebar-width: 272px
  content-max: 784px
  layout-max: 1056px
  local-nav-height: 45px
  hero-max: 960px
  measure: 580px
  demo-area-height: 160px
  card-min: 220px
  doc-level-intrinsic-size: 8700px
  doc-level-intrinsic-size-mobile: 10400px
  doc-end-intrinsic-size: 480px
  doc-end-intrinsic-size-mobile: 720px
components:
  button-brand:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.on-brand}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: 20px
    height: 40px
  button-brand-hover:
    backgroundColor: "{colors.brand-light}"
    textColor: "{colors.on-brand}"
  button-alt:
    backgroundColor: "{colors.bg-mute}"
    textColor: "{colors.text-1}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: 20px
    height: 40px
  button-sm:
    typography: "{typography.caption}"
    padding: 14px
    height: 32px
  nav:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.text-1}"
    typography: "{typography.label}"
    height: "{spacing.nav-height}"
  sidebar:
    backgroundColor: "{colors.bg-soft}"
    textColor: "{colors.text-2}"
    typography: "{typography.label}"
    width: "{spacing.sidebar-width}"
  sidebar-link-active:
    textColor: "{colors.brand-text}"
    fontWeight: 600
  button-lg:
    typography: "{typography.body}"
    rounded: "{rounded.full}"
    padding: 28px
    height: 48px
  code-block:
    backgroundColor: "{colors.code-bg}"
    typography: "{typography.code}"
    rounded: "{rounded.lg}"
    padding: 24px
  inline-code:
    backgroundColor: "{colors.bg-mute}"
    textColor: "{colors.text-code}"
    rounded: "{rounded.sm}"
  callout-real:
    backgroundColor: "{colors.brand-soft}"
    textColor: "{colors.text-1}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.lg}"
    padding: 16px
  callout-warning:
    backgroundColor: "{colors.warning-soft}"
    textColor: "{colors.text-1}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.lg}"
    padding: 16px
  callout-info:
    backgroundColor: "{colors.bg-soft}"
    textColor: "{colors.text-1}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.lg}"
    padding: 16px
  demo-box:
    backgroundColor: "{colors.bg}"
    rounded: "{rounded.lg}"
    padding: 20px
  demo-box-label:
    backgroundColor: "{colors.bg-soft}"
    textColor: "{colors.text-2}"
    typography: "{typography.caption}"
  field:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.text-1}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.lg}"
    padding: 12px
  chip:
    backgroundColor: "{colors.brand-soft}"
    textColor: "{colors.brand-text}"
    typography: "{typography.label}"
    rounded: "{rounded.xl}"
  switch:
    backgroundColor: "{colors.bg-mute}"
    rounded: "{rounded.full}"
    width: 40px
    height: 22px
---

## Overview

Una guía técnica pero ligera de Vue 3. El tono es informal y algo desenfadado; la interfaz,
en cambio, es sobria: se apoya en la identidad oficial de vuejs.org para que la persona sienta
que está en "territorio Vue" y no en una plantilla genérica.

- **Identidad prestada, no inventada.** Paleta de `@vue/theme`, tipografía Inter, layout de
  VitePress (nav fija, sidebar, columna de contenido). Nada de estéticas ajenas al ecosistema.
- **El contenido manda.** Texto, código y demos son la interfaz. La decoración se limita al
  degradado del título y al verde de marca.
- **Claro y oscuro de primera clase.** Cada token de color tiene su pareja `-dark`; ninguna
  pieza se diseña solo para un modo.
- **Accesible por defecto.** AA como mínimo, foco visible, teclado completo y respeto a
  `prefers-reduced-motion`.

## Colors

Los tokens sin sufijo son el modo claro; los `-dark` los sustituyen cuando `<html>` tiene la
clase `dark`. Si un token no tiene variante `-dark`, vale para los dos modos.

- **`brand` (#42b883)** es el verde de Vue. Se usa como **superficie** (botón principal, barra
  de los callouts, punto de las demos). Sobre blanco da 2.5:1, así que **nunca** se usa
  como color de texto ni como anillo de foco en claro.
- **`brand-text`** es el verde para texto y enlaces: `#287953` en claro (5.3:1 sobre `bg` y ≥ 4.7:1 sobre cualquier superficie clara, `brand-soft` incluido) y `#42d392`
  en oscuro (9:1).
- **`on-brand`** (#1a1a1a) es el texto sobre `brand`. El blanco no llega a AA ahí.
- **`text-1` / `text-2`**: texto principal y secundario. `text-2` cumple AA sobre `bg` y
  `bg-soft` en los dos modos.
- **`bg` → `bg-soft` → `bg-mute`**: tres niveles de superficie. La jerarquía se marca con
  estos fondos y con `divider`, no con sombras.
- **`warning*`**: solo para callouts de advertencia.
- **`focus`**: color del anillo de `:focus-visible`. `#287953` en claro (≥ 4.7:1 sobre las
  superficies claras) y `#42b883` en oscuro (≥ 6.2:1).
- **Degradado de acento**: `linear-gradient(315deg, brand-text 25%, accent-blue)`, recortado
  al texto. Solo en una palabra del título del hero. Con `brand-text` ningún punto baja de
  3.5:1 sobre `bg` en claro; en oscuro equivale a `brand-light`.
- **Resaltado de sintaxis**: Shiki con `github-light` / `github-dark`. Los colores de token
  que no llegan a AA sobre `code-bg` se sustituyen en `src/lib/highlight.ts` y no se tocan
  desde CSS.

Todo color nuevo se mide antes de usarlo (4.5:1 para texto, 3:1 para bordes de controles y
texto grande). No se aprueba a ojo.

## Typography

Inter variable (`@fontsource-variable/inter`, eje `wght`; se usan 400/500/600/700/900) para
todo; monoespaciada del sistema para el código. El woff2 `latin` se precarga en `index.html`.

- `display` solo existe una vez: el h1 del hero. Baja a 48px por debajo de 960px y a 36px por
  debajo de 480px.
- `headline-lg` = h2 de cada nivel (28px en móvil). `headline-md` = h3 de cada tema.
- `lead` para el subtítulo del hero (18px en móvil); `body` para la prosa.
- `label` para la navegación, la sidebar y los botones; `caption` para metadatos (eyebrows,
  etiqueta de demo, lenguaje del bloque de código).
- El código inline va a `0.85em` del texto que lo rodea.

Jerarquía semántica estricta: un solo `h1`, `h2` por nivel y `h3` por tema. El tamaño visual
nunca decide qué etiqueta de encabezado se usa.

## Layout

- **Estructura**: nav fija (`nav-height`) → (en móvil, barra "Índice") → hero centrado (`hero-max`) →
  sidebar fija + columna de contenido (`content-max`). Por encima de `layout-max` (sidebar +
  contenido) el bloque se centra y el fondo de la sidebar se alarga hasta el borde izquierdo.
- **Escala de espaciado**: solo los valores de `spacing`. Entre temas, `2xl`; entre niveles,
  `3xl` con un divisor; dentro de un bloque, `md` o `lg`.
- **Breakpoints**: 960px (la sidebar pasa a panel deslizante y aparece la barra "Índice"),
  768px (se ocultan los enlaces de la nav), 640px (los bloques de código van a sangre completa)
  y 480px (botones del hero a ancho completo).
- **Scroll**: `scroll-padding-top` siempre tiene en cuenta la nav fija y, en móvil, la barra
  del índice.
- **Sin scroll horizontal** a 320px. El código largo hace scroll dentro de su bloque, que es
  enfocable con teclado.

## Elevation & Depth

Diseño plano. La profundidad se expresa con superficies (`bg-soft`, `bg-mute`) y con
`divider`.

Solo hay dos sombras, ambas funcionales:

- Panel de la sidebar en móvil: `0 12px 32px rgba(0, 0, 0, 0.2)` sobre un `scrim`.
- Pomo del interruptor de tema: `0 1px 2px rgba(0, 0, 0, 0.2)`.

Capas (`z-index`): nav 30, panel de la sidebar 25, scrim 24, barra del índice 20 y enlace
"saltar al contenido" 50. No se añaden capas fuera de esta tabla.

## Shapes

- `sm` (4px): código inline.
- `md` (6px): botón de copiar.
- `lg` (8px): bloques de código, callouts, demos y campos.
- `xl` (12px): tarjetas de nivel y chips.
- `full`: botones e interruptor (forma de píldora).

Los callouts llevan un borde de 1px en el color de su tipo (sin franja lateral, que es el
tópico de callout más reconocible). Párrafos, listas y callouts no pasan de `measure` (580px)
para que las líneas no superen unos 80 caracteres.

## Components

Cada componente vive en un único `.vue` con su CSS Module. Las variantes se expresan con props,
no con clases que pasa el padre.

- **Button** (`button-brand`, `button-alt`, `button-sm`, `button-lg`): una única acción principal por
  bloque. Estado `disabled` al 50 % de opacidad y con `cursor: not-allowed`. Si navega es un
  `<a>`; si ejecuta algo, un `<button type="button">`. `square` para botones de un carácter.
- **Field** (`BaseField`): input o, con `multiline`, textarea, con `v-model`. Siempre con
  `label`, aunque sea `.visually-hidden`.
- **CodeBlock**: código resaltado, etiqueta de lenguaje y botón "Copiar" con los estados
  Copiado y No se pudo copiar. Muestra el texto plano mientras Shiki carga o si falla.
- **CallOut** (`real` | `warning` | `info`): "En la vida real" es la variante por defecto y la
  firma de la guía. Una analogía por tema como máximo. Es un `div role="note"` con el título
  como nombre accesible, no un `<aside>`, para no llenar la página de landmarks.
- **DemoBox**: marco de las demos en vivo, con cabecera "Pruébalo · …". Las demos son
  funcionales y cubren su estado vacío o inicial.
- **DocTopic**: `section` con `id` + `h3` + ancla `#` que aparece al pasar el ratón o al
  enfocarla.
- **DocLevel**: `section` con `id` + `h2` de nivel, eyebrow y resumen opcionales.
- **LinkGrid** (`BaseLinkGrid`): rejilla de enlaces externos con descripción (el ecosistema).
- **Nav / Sidebar / Hero**: piezas de layout únicas. La sidebar marca la sección activa con
  `brand-text`, peso semibold y `aria-current="location"`. Arriba lleva un filtro de temas
  (`SidebarFilter`) que ignora tildes y mayúsculas, busca en el título y en las `keywords` de
  cada tema (`toc.ts`), anuncia el número de resultados y tiene estado vacío con "Vaciar
  filtro"; `/` lo enfoca (y en móvil abre antes el índice) y Esc lo vacía. En móvil, la
  barra "Índice" va justo debajo de la nav desde el principio de la página y muestra a la
  derecha dónde estás ("Nivel › tema", recortado con elipsis, o "Introducción" mientras se ve
  el hero: hasta la primera sección no hay ninguna activa). La sidebar desplaza su propio scroll
  para mantener visible el tema activo. "Y ahora, ¿qué?" también cuenta como sección activa. El footer lleva "Volver arriba". Con el índice
  abierto en móvil, el resto de la página queda `inert` y Esc devuelve el foco a "Índice".
- **Hero reactivo**: el hero hace lo que enseña la guía. `HeroLevelPicker` muestra
  `const nivel = ref('cero' | 'algo' | 'bastante')` como un grupo de radios con aspecto de
  código. El valor cambia la palabra con degradado del `h1` (con transición ≤ 250 ms), el
  subtítulo (`aria-live="polite"`) y el texto y el destino del botón principal, que lleva al
  primer tema del nivel correspondiente de `toc.ts`.
- **Switch de tema**: `role="switch"` con `aria-checked`. El modo elegido se guarda en
  `localStorage` y, si no hay ninguno, se sigue `prefers-color-scheme`.

## Do's and Don'ts

- Do: usar `brand` como superficie y `brand-text` para texto.
- Don't: poner texto blanco sobre `brand` ni texto `brand` sobre blanco.
- Do: expresar la jerarquía con superficies y divisores.
- Don't: añadir sombras, degradados o glassmorphism decorativos.
- Do: escribir contenido real (conceptos, analogías y código que funciona).
- Don't: inventar métricas, testimonios o frases de marketing vacías.
- Do: que toda animación dure ≤ 250 ms, tenga un propósito y se reduzca con
  `prefers-reduced-motion`.
- Don't: usar valores sueltos de color, espaciado o radio. Si falta uno, se añade como token.
- Do: medir el contraste de cada color nuevo en los dos modos.
- Don't: diseñar un componente solo en modo claro.

## Styling: CSS Modules

**CSS Modules es la única forma de estilar componentes.** Los tokens son lo único global.

### Capas de CSS

| Capa | Dónde | Qué contiene |
| --- | --- | --- |
| Tokens | `src/styles/tokens.css` | Custom properties de este archivo (`--c-*`, `--font-*`, `--line-height-*`, `--space-*`, `--radius-*`, medidas de componente, `--shadow-*`, `--duration-*` y `--z-*`) en `:root` y su versión `-dark` en `:root.dark`. |
| Base | `src/styles/base.css` | Reset mínimo, `body`, `a`, `:focus-visible`, `code` inline, `.visually-hidden` y los colores de `.shiki`. |
| Componente | `<style module>` en cada `.vue` | Todo lo demás. |

`main.ts` importa las fuentes, luego `tokens.css` y después `base.css`. Ningún otro archivo
CSS es global.

### Reglas

1. Se usa `<style module>` dentro del SFC y se aplica con `:class="$style.root"`. En el
   script, `useCssModule()` cuando haga falta.
2. Los nombres de clase van en camelCase y describen el papel, no el aspecto
   (`$style.summary`, no `$style.grayText`). La clase raíz se llama `root`.
3. Valores solo con `var(--token)`. Un literal (`#fff`, `13px`) en un módulo es un error de
   revisión, salvo `0` y `1px` en bordes.
4. Las variantes se expresan con props mapeadas a clases:
   `:class="[$style.root, $style[type]]"`. Para combinaciones complejas, un `computed`.
5. Nada de `:deep()`, `scoped` ni clases globales de utilidad (`.btn`). Si el padre necesita
   cambiar el aspecto de un hijo, el hijo expone una prop.
6. `:global()` solo dentro de una clase local y solo para HTML que no generamos nosotros
   (salida de Shiki en `v-html`). Por ejemplo: `.root :global(pre) { … }`.
7. Responsive y movimiento dentro del propio módulo:
   `@media (max-width: 960px)` y `@media (prefers-reduced-motion: reduce)`.
8. Modo oscuro sin selectores `.dark` en los módulos: se resuelve en `tokens.css`. Si un
   componente necesita un valor distinto en oscuro, ese valor es un token nuevo.

```vue
<script setup lang="ts">
defineProps<{ type?: 'real' | 'warning' | 'info' }>()
</script>

<template>
  <aside :class="[$style.root, $style[type ?? 'real']]">
    <slot />
  </aside>
</template>

<style module>
.root {
  padding: var(--space-md);
  border-radius: var(--radius-lg);
  border-left: 5px solid;
}

.real {
  border-color: var(--c-brand);
  background: var(--c-brand-soft);
}
</style>
```

## Frontend Architecture

Arquitectura por capas con dependencias en un solo sentido. Pensada para que cualquiera
encuentre dónde va cada cosa sin preguntar.

```text
src/
├── main.ts              # arranque: fuentes, estilos globales, createApp
├── App.vue              # composición de layout + features, sin lógica de dominio
├── styles/              # tokens.css y base.css (lo único global)
├── components/
│   ├── ui/              # primitivas sin dominio: BaseButton, BaseField, BaseLinkGrid,
│   │                    # CodeBlock, CallOut, DemoBox, DocTopic, DocLevel
│   └── layout/          # piezas únicas: TheNav, TheLocalNav, TheHero (+ HeroLevelPicker),
│                        # TheSidebar (+ SidebarFilter), TheFooter
├── features/
│   └── guide/
│       ├── GuideContent.vue  # niveles + "Y ahora, ¿qué?"
│       ├── levels/      # BasicLevel, IntermediateLevel, AdvancedLevel (= AdvancedInternals + AdvancedTooling),
│       │                # EcosystemLevel (= EcosystemRouting + EcosystemData)
│       ├── demos/       # una demo por archivo, autocontenida
│       └── content/     # toc.ts, snippets.ts y ecosystem.ts: datos puros, sin Vue
├── composables/         # useTheme, useActiveSection, useDisclosure, useKeyShortcut, useMediaQuery, useNearViewport: estado y efectos reutilizables
└── lib/                 # funciones puras o envoltorios de librerías (highlight.ts)
```

### Dirección de dependencias

```text
App → layout → ui
App → features → ui, composables, lib
ui → composables, lib
composables → lib
lib, content → (nada del proyecto)
```

- `ui/` no importa nada de `features/` ni de `layout/`. Si una primitiva necesita datos de la
  guía, los recibe por props.
- `layout/` tampoco importa de `features/`: `App` le pasa por props los datos de `toc.ts` y el
  estado del tema y del menú.
- Una feature no importa de otra feature. Lo compartido sube a `ui/`, `composables/` o
  `lib/`.
- `content/` es TypeScript puro (strings y objetos tipados). Los snippets viven ahí porque un
  `</script>` dentro de un SFC rompe el parser.

### Reglas de componentes

- **Nombres**: PascalCase. `Base*` para primitivas genéricas, `The*` para piezas únicas de
  layout y `*Demo` para demos.
- **Contrato**: `defineProps<T>()` y `defineEmits<T>()` tipados, con props bajando y eventos
  subiendo. Una prop nunca se muta.
- **Estado**: local con `ref`. El compartido entre componentes lejanos va en un composable de
  módulo (como `useTheme`) o con `provide/inject` si depende del árbol. Pinia solo cuando
  haya estado de dominio que varias features lean y escriban.
- **Efectos**: dentro de composables, siempre con limpieza (`onUnmounted`,
  `onWatcherCleanup`).
- **Carga pesada**: diferida con `import()` (como se hace con Shiki en `CodeBlock`).
- **Tamaño**: si un `.vue` pasa de unas 200 líneas o mezcla dos responsabilidades, se divide.

### Checklist antes de dar por buena una pieza

- [ ] Estilos en `<style module>`, solo con tokens y sin `:deep` ni `scoped`.
- [ ] Funciona en claro y oscuro, a 320px y a 1440px.
- [ ] Usable con teclado, foco visible y contraste medido.
- [ ] Cubre sus estados: vacío, carga, error y deshabilitado (los que apliquen).
- [ ] Respeta la dirección de dependencias.
- [ ] `pnpm build` (incluye `vue-tsc`) pasa.
