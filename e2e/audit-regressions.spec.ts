/// <reference lib="dom" />
import { expect, test } from '@playwright/test'

for (const width of [390, 1440]) {
  for (const colorScheme of ['light', 'dark'] as const) {
    test(`el hero y el foco se mantienen a ${width}px en ${colorScheme}`, async ({ page }) => {
      const errors: string[] = []

      page.on('pageerror', (error) => errors.push(error.message))
      await page.setViewportSize({ width, height: 900 })
      await page.emulateMedia({ colorScheme, reducedMotion: 'reduce' })
      await page.goto('/')
      await page.evaluate(() => document.fonts.ready)

      const hero = page.locator('#top')

      const geometry = await hero.evaluate((element) => {
        const children = [...element.children].filter((child) => getComputedStyle(child).position !== 'absolute')
        const bounds = element.getBoundingClientRect()
        const content = children[0]!.getBoundingClientRect()

        return { count: children.length, offset: Math.abs(content.y + content.height / 2 - bounds.y - bounds.height / 2) }
      })

      expect(geometry.count).toBe(1)
      expect(geometry.offset).toBeLessThan(2)
      expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false)

      if (width === 390) {
        await page.keyboard.press('/')
        const filter = page.getByRole('searchbox', { name: 'Filtrar temas' })

        await expect(filter).toBeFocused()
        await expect(page.getByText('Saltar al contenido', { exact: true })).toHaveAttribute('inert', '')

        for (let step = 0; step < 4; step++) {
          await page.keyboard.press('Shift+Tab')
          expect(await page.evaluate(() => {
            const active = document.activeElement

            return active === document.body || Boolean(active?.closest('#sidebar'))
          })).toBe(true)
        }

        await filter.focus()
        await page.keyboard.press('Escape')
        await expect(page.getByRole('button', { name: /Índice/ })).toBeFocused()
        await expect(page.getByText('Saltar al contenido', { exact: true })).not.toHaveAttribute('inert')
      }

      await page.goto('/#formularios')
      const field = page.getByRole('textbox', { name: 'Producto', exact: true })

      for (const product of ['Pan', 'Arroz']) {
        await field.fill(product)
        await field.press('Enter')
      }

      const remove = (product: string) => page.getByRole('button', { name: `Quitar ${product}`, exact: true })

      await remove('Pan').focus()
      await page.keyboard.press('Enter')
      await expect(remove('Arroz')).toBeFocused()
      await expect(page.locator('#formularios p[role="status"]')).toHaveText('Se ha quitado Pan. Productos restantes: 2.')
      await page.keyboard.press('Enter')
      await expect(remove('Leche de avena')).toBeFocused()
      await page.keyboard.press('Enter')
      await expect(field).toBeFocused()
      await expect(page.locator('#formularios p[role="status"]')).toHaveText('Se ha quitado Leche de avena. Lista vacía.')
      await field.fill('Leche de avena')
      await field.press('Enter')
      await remove('Leche de avena').focus()
      await page.keyboard.press('Enter')
      await expect(field).toBeFocused()
      await expect(page.locator('#formularios p[role="status"]')).toHaveText('Se ha quitado Leche de avena. Lista vacía.')
      expect(errors).toEqual([])
    })

    test(`los productos largos no ocultan acciones a ${width}px en ${colorScheme}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 })
      await page.emulateMedia({ colorScheme, reducedMotion: 'reduce' })
      await page.goto('/#formularios')
      const product = 'X'.repeat(40)
      const field = page.getByRole('textbox', { name: 'Producto', exact: true })

      await field.fill(product)
      await field.press('Enter')
      const remove = page.getByRole('button', { name: `Quitar ${product}`, exact: true })

      await remove.scrollIntoViewIfNeeded()
      await expect(remove).toBeInViewport()
      const bounds = await remove.boundingBox()

      expect(bounds!.x).toBeGreaterThanOrEqual(0)
      expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width)
      expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false)
      await remove.click()
      await expect(remove).toHaveCount(0)
    })
  }
}

test('la demo de clic fuera mantiene el foco al abrir y cerrar con teclado', async ({ page }) => {
  await page.goto('/#directivas')
  const open = page.getByRole('button', { name: 'Abrir el menú' })
  const close = page.getByRole('button', { name: 'Cerrar desde dentro' })

  await open.focus()
  await open.press('Enter')
  await expect(close).toBeFocused()
  await close.press('Enter')
  await expect(open).toBeFocused()
})

test('el filtro sobrevive a recargar y respeta los otros parámetros y el fragmento', async ({ page }) => {
  await page.goto('/?origen=prueba#reactividad')
  const filter = page.getByRole('searchbox', { name: 'Filtrar temas' })

  await filter.fill('Pinia')
  await expect(page).toHaveURL(/origen=prueba&tema=Pinia#reactividad$/)
  await page.reload()
  await expect(filter).toHaveValue('Pinia')
  await expect(page.locator('#sidebar li a')).toHaveText(['Pinia'])
  await page.evaluate(() => history.pushState(null, '', '?origen=prueba&tema=watch#reactividad'))
  await filter.fill('watch')
  await page.goBack()
  await expect(filter).toHaveValue('Pinia')
  await page.getByRole('button', { name: 'Vaciar filtro', exact: true }).click()
  await expect(page).toHaveURL(/\?origen=prueba#reactividad$/)
  await expect(filter).toBeFocused()
})

test('recargar antes del debounce conserva el borrador', async ({ page }) => {
  await page.goto('/#watchers')
  const draft = page.getByRole('textbox', { name: 'Escribe un borrador y para un momento' })

  // Cambiar y recargar en la misma tarea garantiza que no vence el debounce de 800 ms.
  await draft.evaluate((element) => {
    if (!(element instanceof HTMLTextAreaElement)) throw new Error('Se esperaba el textarea del borrador')

    element.value = 'Este texto no debe perderse'
    element.dispatchEvent(new Event('input', { bubbles: true }))
    location.reload()
  })
  await expect(draft).toHaveValue('Este texto no debe perderse')
})

test('si guardar falla, salir advierte de los cambios pendientes', async ({ page }) => {
  await page.addInitScript(() => {
    Storage.prototype.setItem = () => { throw new Error('Almacenamiento bloqueado') }
  })
  await page.goto('/#watchers')
  const draft = page.getByRole('textbox', { name: 'Escribe un borrador y para un momento' })

  await draft.fill('Borrador sin guardar')
  await expect(page.locator('#watchers p[role="status"]')).toContainText('copia el texto antes de salir')
  const dialog = page.waitForEvent('dialog')

  await page.close({ runBeforeUnload: true })
  const warning = await dialog

  expect(warning.type()).toBe('beforeunload')
  await warning.dismiss()
  await expect(draft).toHaveValue('Borrador sin guardar')
})

test('el aviso tiene una región viva persistente y el código no se traduce', async ({ page }) => {
  await page.goto('/#built-ins')
  const live = page.locator('#built-ins [aria-live="polite"]')

  await expect(live).toBeEmpty()
  await page.getByRole('button', { name: 'Mostrar aviso' }).click()
  await expect(live).toContainText('Pedido confirmado')
  await expect(page.locator('#built-ins [translate="no"]').first()).toBeVisible()
})

test('el error de copia mantiene instrucciones para recuperarse', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: () => Promise.reject(new Error('Sin permiso')) },
    })
  })
  await page.goto('/#reactividad')
  const copy = page.locator('#reactividad').getByRole('button', { name: /código Vue$/ }).first()

  await copy.click()
  await expect(page.getByText('Selecciona el código y cópialo manualmente.', { exact: true })).toBeVisible()
  await expect(page.locator('#reactividad [role="status"]').first()).toContainText('cópialo manualmente')
})

test('theme-color sigue el tema inicial, el cambio y la recarga', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' })
  await page.goto('/')
  const meta = page.locator('meta[name="theme-color"]')

  await expect(meta).toHaveAttribute('content', '#1a1a1a')
  await page.getByRole('switch', { name: 'Modo oscuro' }).click()
  await expect(meta).toHaveAttribute('content', /^#(?:fff|ffffff)$/)
  await page.reload()
  await expect(meta).toHaveAttribute('content', '#ffffff')
})
