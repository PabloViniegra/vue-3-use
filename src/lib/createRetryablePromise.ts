export function createRetryablePromise<T>(create: () => Promise<T>) {
  let promise: Promise<T> | undefined

  return () => {
    if (!promise) {
      const created = create()
      promise = created
      void created.catch(() => {
        if (promise === created) promise = undefined
      })
    }

    return promise
  }
}
