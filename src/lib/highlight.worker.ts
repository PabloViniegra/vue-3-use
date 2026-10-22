import { createHighlighterCore, type HighlighterCore } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'

type HighlightRequest = { id: number; code: string; lang: string }

type HighlightResponse = { id: number; html?: string; error?: string }

type WorkerScope = {
  addEventListener(type: 'message', listener: (event: MessageEvent<HighlightRequest>) => void): void
  postMessage(message: HighlightResponse): void
}

// SAFETY: este módulo solo se carga como Worker dedicado desde `highlight.ts`.
const workerScope = self as WorkerScope

// Mantiene los colores accesibles sobre los fondos de código de ambos temas.
const colorReplacements = {
  'github-light': {
    '#6a737d': '#5c646d',
    '#22863a': '#116329',
    '#d73a49': '#cf222e',
    '#e36209': '#bc4c00',
  },
  'github-dark': {
    '#6a737d': '#8b949e',
  },
}

let highlighter: Promise<HighlighterCore> | undefined

function getHighlighter() {
  highlighter ??= createHighlighterCore({
    themes: [import('shiki/themes/github-light.mjs'), import('shiki/themes/github-dark.mjs')],
    langs: [
      import('shiki/langs/vue.mjs'),
      import('shiki/langs/javascript.mjs'),
      import('shiki/langs/typescript.mjs'),
      import('shiki/langs/bash.mjs'),
    ],
    engine: createJavaScriptRegexEngine(),
  })

  return highlighter
}

workerScope.addEventListener('message', async ({ data }) => {
  try {
    const hl = await getHighlighter()

    const html = hl.codeToHtml(data.code, {
      lang: data.lang,
      themes: { light: 'github-light', dark: 'github-dark' },
      defaultColor: false,
      colorReplacements,
      transformers: [
        {
          pre(node) {
            node.properties.tabindex = '0'
          },
        },
      ],
    })

    workerScope.postMessage({ id: data.id, html })
  } catch (error) {
    workerScope.postMessage({
      id: data.id,
      error: error instanceof Error ? error.message : String(error),
    })
  }
})
