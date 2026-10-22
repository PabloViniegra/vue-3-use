/// <reference lib="dom" />
import { expect, test } from '@playwright/test'

for (const width of [390, 1440]) {
  test(`el tema se revela desde el interruptor a ${width}px en ambos sentidos`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'no-preference' })
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text())
    })
    await page.goto('/')

    for (const dark of [true, false]) {
      const result = await page.evaluate(async () => {
        const button = document.querySelector<HTMLButtonElement>('[role="switch"]')!
        const bounds = button.getBoundingClientRect()
        const start = document.startViewTransition.bind(document)
        let transition: ViewTransition | undefined
        document.startViewTransition = (callback) => {
          transition = start(callback)

          return transition
        }

        button.click()
        document.startViewTransition = start
        await transition!.ready
        const root = document.documentElement
        const animation = document.getAnimations().find((item) => item instanceof CSSAnimation && item.animationName === 'themeReveal')

        const state = {
          duration: animation?.effect?.getTiming().duration,
          originX: root.style.getPropertyValue('--theme-reveal-x'),
          originY: root.style.getPropertyValue('--theme-reveal-y'),
          expectedX: `${bounds.left + bounds.width / 2}px`,
          expectedY: `${bounds.top + bounds.height / 2}px`,
          dark: root.classList.contains('dark'),
          checked: button.getAttribute('aria-checked'),
          overflow: root.scrollWidth > innerWidth,
        }

        await transition!.finished

        return state
      })

      expect(result.duration).toBe(250)
      expect(result.originX).toBe(result.expectedX)
      expect(result.originY).toBe(result.expectedY)
      expect(result.dark).toBe(dark)
      expect(result.checked).toBe(String(dark))
      expect(result.overflow).toBe(false)
      await expect(page.locator('html')).not.toHaveAttribute('data-theme-transition')
      await page.screenshot({ path: `test-results/theme-${width}-${dark ? 'dark' : 'light'}.png` })
    }

    expect(errors).toEqual([])
  })
}

for (const fallback of ['reduced-motion', 'unsupported'] as const) {
  test(`el cambio por teclado es inmediato con ${fallback}`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light', reducedMotion: fallback === 'reduced-motion' ? 'reduce' : 'no-preference' })
    await page.addInitScript((reason) => {
      Object.defineProperty(document, 'startViewTransition', {
        value: reason === 'unsupported'
          ? undefined
          : () => { throw new Error('No se debe iniciar una transición con movimiento reducido') },
      })
    }, fallback)
    await page.goto('/')
    const toggle = page.getByRole('switch', { name: 'Modo oscuro' })
    await toggle.focus()
    await toggle.press('Space')
    await expect(toggle).toHaveAttribute('aria-checked', 'true')
    await expect(toggle).toBeFocused()
    await expect(page.locator('html')).toHaveClass(/dark/)
    await expect(page.locator('html')).not.toHaveAttribute('data-theme-transition')
    await toggle.press('Enter')
    await expect(toggle).toHaveAttribute('aria-checked', 'false')
    expect(await page.evaluate(() => localStorage.getItem('vue3-guia-theme'))).toBe('light')
  })
}

test('las pulsaciones rápidas no pierden cambios ni dejan la transición activa', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'no-preference' })
  await page.goto('/')
  await page.evaluate(() => {
    const toggle = document.querySelector<HTMLButtonElement>('[role="switch"]')!
    toggle.click()
    toggle.click()
    toggle.click()
  })
  await expect(page.getByRole('switch', { name: 'Modo oscuro' })).toHaveAttribute('aria-checked', 'true')
  await expect(page.locator('html')).not.toHaveAttribute('data-theme-transition')
  expect(await page.evaluate(() => localStorage.getItem('vue3-guia-theme'))).toBe('dark')
  expect(errors).toEqual([])
})
