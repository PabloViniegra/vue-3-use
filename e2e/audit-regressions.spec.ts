/// <reference lib="dom" />
import { expect, test } from '@playwright/test'

for (const width of [320, 390, 769, 850, 960, 961, 1024, 1440]) {
  test(`la cabecera conserva el acceso y cabe en ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    await page.evaluate(() => document.fonts.ready)

    const search = page.getByRole('button', { name: /Buscar tema/ })
    const levelLinks = page.getByRole('navigation', { name: 'Niveles' })
    const indexButton = page.getByRole('button', { name: 'Índice', exact: true })
    const themeSwitch = page.getByRole('switch', { name: 'Modo oscuro' })

    if (width <= 768) await expect(search).toBeHidden()
    else await expect(search).toBeVisible()

    if (width <= 960) {
      await expect(levelLinks).toBeHidden()
      await expect(indexButton).toBeVisible()
    } else {
      await expect(levelLinks).toBeVisible()
      await expect(indexButton).toBeHidden()
    }

    const bounds = await themeSwitch.boundingBox()

    expect(bounds).not.toBeNull()
    expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width)
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width)
  })
}

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

test.describe('búsqueda con puntero táctil a 850px', () => {
  test.use({ viewport: { width: 850, height: 900 }, isMobile: true, hasTouch: true })

  test('Buscar tema y el atajo / dejan el foco en el filtro', async ({ page }) => {
    await page.goto('/')
    const search = page.getByRole('button', { name: /Buscar tema/ })
    const searchBounds = await search.boundingBox()

    expect(searchBounds).not.toBeNull()
    await page.touchscreen.tap(
      searchBounds!.x + searchBounds!.width / 2,
      searchBounds!.y + searchBounds!.height / 2,
    )

    const filter = page.getByRole('searchbox', { name: 'Filtrar temas' })

    await expect(filter).toBeFocused()
    await page.getByRole('button', { name: 'Cerrar índice' }).click()
    await expect(page.getByRole('button', { name: 'Índice', exact: true })).toBeFocused()
    await page.keyboard.press('/')
    await expect(filter).toBeFocused()
  })
})

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

test('el tema sigue al sistema hasta que se guarda una elección manual', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' })
  await page.goto('/')
  const html = page.locator('html')
  const toggle = page.getByRole('switch', { name: 'Modo oscuro' })
  const meta = page.locator('meta[name="theme-color"]')

  expect(await page.evaluate(() => localStorage.getItem('vue3-guia-theme'))).toBeNull()
  await expect(meta).toHaveAttribute('content', '#ffffff')
  await page.emulateMedia({ colorScheme: 'dark' })
  await expect(toggle).toHaveAttribute('aria-checked', 'true')
  await expect(html).toHaveClass(/dark/)
  await expect(meta).toHaveAttribute('content', '#1a1a1a')
  expect(await page.evaluate(() => localStorage.getItem('vue3-guia-theme'))).toBeNull()

  await toggle.click()
  await expect(toggle).toHaveAttribute('aria-checked', 'false')
  await expect(meta).toHaveAttribute('content', /^#(?:fff|ffffff)$/)
  expect(await page.evaluate(() => localStorage.getItem('vue3-guia-theme'))).toBe('light')

  await page.emulateMedia({ colorScheme: 'dark' })
  await expect(toggle).toHaveAttribute('aria-checked', 'false')
  await expect(html).not.toHaveClass(/dark/)
  await expect(meta).toHaveAttribute('content', /^#(?:fff|ffffff)$/)
})

test('Query conserva el último dato bueno y permite reintentar errores', async ({ page }) => {
  await page.goto('/#tanstack-query')
  const topic = page.locator('#tanstack-query')
  const fail = topic.getByRole('checkbox', { name: 'Simular que falla la red' })

  await fail.check()
  await topic.getByRole('button', { name: 'Usuario 1' }).click()
  await expect(topic.getByRole('alert')).toContainText('Sin conexión')

  await fail.uncheck()
  await topic.getByRole('button', { name: 'Reintentar' }).click()
  await expect(topic.getByText('Lucía Martín', { exact: true })).toBeVisible()

  await fail.check()
  await topic.getByRole('button', { name: 'Invalidar caché' }).click()
  await expect(topic.getByRole('alert')).toContainText('último dato bueno')
  await expect(topic.getByText('Lucía Martín', { exact: true })).toBeVisible()

  await fail.uncheck()
  await topic.getByRole('button', { name: 'Reintentar' }).click()
  await expect(topic.getByRole('alert')).toHaveCount(0)
  await expect(topic.getByText('Lucía Martín', { exact: true })).toBeVisible()
})

test('la demo asíncrona anuncia el fallo y puede reintentarse', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('/#async')
  const topic = page.locator('#async')
  const fail = topic.getByRole('checkbox', { name: 'Simular que falla la red' })

  await fail.check()
  await topic.getByRole('button', { name: 'Cargar el gráfico' }).click()
  await expect(topic.getByText('Descargando el componente…')).toBeVisible()
  await expect(topic.getByRole('alert')).toContainText('No se pudo descargar')

  await fail.uncheck()
  await topic.getByRole('button', { name: 'Reintentar carga' }).click()
  await expect(topic.getByText(/GraficoVentas ya está aquí/)).toBeVisible()
  expect(errors).toEqual([])
})

test('la demo de errores recupera el foco y permite volver a intentarlo', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('/#plugins-errores')
  const topic = page.locator('#plugins-errores')
  const broken = topic.getByRole('button', { name: 'Pulsar el botón roto' })

  await broken.click()
  await expect(topic.getByRole('alert')).toContainText('error lanzado en el manejador de clic')
  const retry = topic.getByRole('button', { name: 'Reintentar' })
  await expect(retry).toBeFocused()
  await retry.click()
  await expect(broken).toBeVisible()
  await broken.click()
  await expect(topic.getByRole('alert')).toBeVisible()
  expect(errors).toEqual([])
})
