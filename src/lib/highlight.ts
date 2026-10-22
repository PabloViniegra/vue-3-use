type HighlightRequest = { id: number; code: string; lang: string }
type HighlightResponse = { id: number; html?: string; error?: string }
type PendingRequest = { resolve: (html: string) => void; reject: (error: Error) => void }

let worker: Worker | undefined
let nextId = 0
const pending = new Map<number, PendingRequest>()

function rejectPending(error: Error) {
  for (const request of pending.values()) request.reject(error)
  pending.clear()
}

function getWorker() {
  if (worker) return worker

  worker = new Worker(new URL('./highlight.worker.ts', import.meta.url), { type: 'module' })
  worker.addEventListener('message', ({ data }: MessageEvent<HighlightResponse>) => {
    const request = pending.get(data.id)
    if (!request) return

    pending.delete(data.id)
    if (data.error) request.reject(new Error(data.error))
    else request.resolve(data.html ?? '')
  })
  worker.addEventListener('error', (event) => {
    rejectPending(new Error(event.message || 'Falló el worker de resaltado'))
    worker?.terminate()
    worker = undefined
  })
  worker.addEventListener('messageerror', () => {
    rejectPending(new Error('No se pudo leer la respuesta del worker de resaltado'))
    worker?.terminate()
    worker = undefined
  })
  return worker
}

export function highlight(code: string, lang: string) {
  return new Promise<string>((resolve, reject) => {
    const id = nextId++
    pending.set(id, { resolve, reject })
    try {
      getWorker().postMessage({ id, code, lang } satisfies HighlightRequest)
    } catch (error) {
      pending.delete(id)
      reject(error instanceof Error ? error : new Error(String(error)))
    }
  })
}
