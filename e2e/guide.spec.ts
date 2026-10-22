import { expect, test } from '@playwright/test'
import { levels } from '../src/features/guide/content/toc.ts'

const topicIds = levels.flatMap((level) => level.topics.map((topic) => topic.id))

test('carga sin errores en consola ni excepciones', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text())
  })

  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  // Recorre la página para que se monten demos y bloques de código diferidos
  await page.keyboard.press('End')
  await page.waitForLoadState('networkidle')

  expect(errors).toEqual([])
})

test('cada entrada del índice apunta a una sección que existe', async ({ page }) => {
  await page.goto('/')
  const sidebar = page.getByRole('navigation', { name: 'Índice' })

  for (const id of [...levels.map((level) => level.id), ...topicIds, 'y-ahora-que']) {
    await expect(page.locator(`[id="${id}"]`), `falta la sección #${id}`).toHaveCount(1)
    await expect(sidebar.locator(`a[href="#${id}"]`), `falta el enlace a #${id}`).toHaveCount(1)
  }
})

test('al pulsar un tema del índice se navega a él y queda marcado como activo', async ({ page }) => {
  await page.goto('/')
  const sidebar = page.getByRole('navigation', { name: 'Índice' })

  await sidebar.getByRole('link', { name: 'Pinia' }).click()

  await expect(page).toHaveURL(/#pinia$/)
  await expect(page.getByRole('heading', { level: 3, name: /Pinia/ })).toBeInViewport()
  await expect(sidebar.getByRole('link', { name: 'Pinia' })).toHaveAttribute('aria-current', 'location')
})

test('el filtro ignora tildes, busca por keywords y Esc lo vacía', async ({ page }) => {
  await page.goto('/')
  const sidebar = page.getByRole('navigation', { name: 'Índice' })
  const filter = sidebar.getByRole('searchbox', { name: 'Filtrar temas' })
  const topicLinks = sidebar.locator('li a')

  await filter.fill('ASINCRONOS')
  await expect(topicLinks).toHaveText(['Componentes asíncronos'])

  await filter.fill('defineStore')
  await expect(topicLinks).toHaveText(['Pinia'])

  await filter.fill('pasar datos al hijo')
  await expect(topicLinks).toHaveText(['Props y eventos'])

  await filter.fill('pedir datos a una API')
  await expect(topicLinks).toHaveText(['TanStack Query'])

  await filter.fill('zzz')
  await expect(sidebar.getByText('Ningún tema habla de «zzz».')).toBeVisible()

  await filter.press('Escape')
  await expect(filter).toHaveValue('')
  await expect(topicLinks).toHaveCount(topicIds.length)
})

test('los bloques de código se resaltan con Shiki', async ({ page }) => {
  await page.goto('/#reactividad')

  await expect(page.locator('#reactividad pre.shiki').first()).toBeVisible()
})

test('el código se copia con teclado sin incluir los números de línea', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  await page.goto('/#reactividad')
  const topic = page.locator('#reactividad')
  const source = topic.locator('pre.shiki').first()
  await expect(source).toBeVisible()
  const copy = topic.getByRole('button', { name: /código vue$/ }).first()

  await expect(copy).toBeVisible()
  await copy.focus()
  await page.keyboard.press('Enter')

  await expect(copy).toHaveText('Copiado código vue')
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(await source.textContent())
  await expect(topic.getByRole('status').first()).toHaveText('Copiado')
})

test('si el portapapeles falla se informa del error', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: () => Promise.reject(new Error('Sin permiso')) },
    })
  })
  await page.goto('/#reactividad')
  const copy = page.locator('#reactividad').getByRole('button', { name: /código vue$/ }).first()
  await copy.click()
  await expect(copy).toHaveText('No se pudo copiar código vue')
})

test('el modo oscuro se mantiene al recargar', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' })
  await page.goto('/')
  const html = page.locator('html')
  const toggle = page.getByRole('switch', { name: 'Modo oscuro' })

  await expect(html).not.toHaveClass(/dark/)
  await toggle.click()
  await expect(html).toHaveClass(/dark/)

  await page.reload()
  await expect(html).toHaveClass(/dark/)
  await expect(toggle).toHaveAttribute('aria-checked', 'true')
})

test.describe('en móvil', () => {
  test.use({ viewport: { width: 390, height: 844 } })

  test('la tecla / abre el índice con el foco en el filtro', async ({ page }) => {
    await page.goto('/')
    const menuButton = page.getByRole('button', { name: 'Índice', exact: true })

    await expect(menuButton).toHaveAttribute('aria-expanded', 'false')
    await page.keyboard.press('/')

    await expect(menuButton).toHaveAttribute('aria-expanded', 'true')
    await expect(page.getByRole('searchbox', { name: 'Filtrar temas' })).toBeFocused()
  })

  test('el índice se cierra con un botón visible y devuelve el foco', async ({ page }) => {
    await page.goto('/')
    const menuButton = page.getByRole('button', { name: 'Índice', exact: true })

    await menuButton.click()
    await page.getByRole('button', { name: 'Cerrar índice' }).click()

    await expect(menuButton).toHaveAttribute('aria-expanded', 'false')
    await expect(menuButton).toBeFocused()
  })

  test('el hero ocupa todo el viewport', async ({ page }) => {
    await page.goto('/')

    const hero = await page.locator('#top').boundingBox()
    const viewport = page.viewportSize()!

    expect(Math.round(hero!.y + hero!.height)).toBeGreaterThanOrEqual(viewport.height)
    await expect(page.getByRole('heading', { level: 2, name: 'Básico' })).not.toBeInViewport()
  })
})
