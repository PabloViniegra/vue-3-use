import { expect, test, type Page } from '@playwright/test'
import { challenges } from '../src/features/guide/content/challenges.ts'

const all = Object.values(challenges)

async function open(page: Page, id: string) {
  const section = page.locator(`#${id}`)

  await section.getByRole('button', { name: 'Abrir el playground' }).click()
  await expect(section.getByRole('group', { name: /^Playground/ })).toBeFocused()

  return {
    section,
    editor: section.getByRole('textbox', { name: /^Código de/ }),
    mine: section.frameLocator('iframe[title="Tu resultado"]').locator('body'),
    expected: section.frameLocator('iframe[title="Resultado esperado"]').locator('body'),
  }
}

for (const challenge of all) {
  test(`${challenge.id}: la solución escrita en el editor iguala al resultado esperado`, async ({ page }) => {
    const errors: string[] = []
    const external: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text())
    })
    page.on('request', (request) => {
      if (/^https?:/.test(request.url()) && !request.url().startsWith('http://localhost')) external.push(request.url())
    })

    await page.goto('/')
    const { section, editor, mine, expected } = await open(page, challenge.id)

    await expect(expected).not.toBeEmpty()
    const reference = await expected.innerText()

    // El archivo de entrada va el último: así ningún estado intermedio importa algo que aún no existe
    const [entry, ...rest] = Object.entries(challenge.solution)

    for (const [name, code] of [...rest, ...(entry ? [entry] : [])]) {
      await section.getByRole('button', { name, exact: true }).click()
      await editor.fill(code)
    }

    await expect(mine).toHaveText(reference, { useInnerText: true })
    await expect(section.getByRole('status').filter({ hasText: /\S/ })).toHaveCount(0)
    expect(errors).toEqual([])
    expect(external).toEqual([])
  })
}

test('el código del reto se guarda, sobrevive a una recarga y se puede reiniciar', async ({ page }) => {
  const { id, starter } = challenges.basico
  const original = Object.values(starter)[0] ?? ''

  await page.goto('/')
  let playground = await open(page, id)

  await expect(playground.editor).toHaveValue(original)
  await playground.editor.fill('<template><p>Hola desde el reto</p></template>')
  await expect(playground.mine).toHaveText('Hola desde el reto')

  await page.reload()
  playground = await open(page, id)
  await expect(playground.mine).toHaveText('Hola desde el reto')

  page.once('dialog', (dialog) => dialog.accept())
  const reset = playground.section.getByRole('button', { name: 'Reiniciar' })
  await reset.click()
  await expect(playground.editor).toHaveValue(original)
  await expect(reset).toBeDisabled()
  await expect(playground.editor).toBeFocused()
})

test('un error de compilación se avisa sin romper la página y la solución solo sale al pedirla', async ({ page }) => {
  await page.goto('/')
  const { section, editor } = await open(page, challenges.basico.id)

  await editor.fill('<template><div></template>')
  await expect(section.getByText(/^App\.vue: \(1:\d+\)/)).toBeVisible()
  await expect(section.getByRole('status').filter({ hasText: /\S/ })).toHaveText('«Tu resultado» no compila. El error está debajo de la vista.')

  await editor.fill('')
  await expect(section.getByText('App.vue: el archivo está vacío.')).toBeVisible()

  await editor.fill(challenges.basico.starter['App.vue'] ?? '')
  await expect(section.getByText(/^App\.vue: /)).toHaveCount(0)

  const toggle = section.getByRole('button', { name: 'Ver la solución' })
  await expect(toggle).toHaveAttribute('aria-expanded', 'false')
  // Cada archivo de la solución es un CodeBlock con su botón Copiar, se haya resaltado o no
  const solution = section.getByRole('button', { name: 'Copiar' })
  await expect(solution).toHaveCount(0)
  await toggle.click()
  await expect(solution).toHaveCount(Object.keys(challenges.basico.solution).length)
})

test('el editor sangra con Tab y se abandona con Esc y Tab', async ({ page }) => {
  await page.goto('/')
  const { editor } = await open(page, challenges.basico.id)

  await editor.focus()
  await page.keyboard.press('Control+Home')
  await page.keyboard.press('Tab')
  await expect(editor).toHaveValue(/^ {2}\S/)
  await expect(editor).toBeFocused()

  await page.keyboard.press('Escape')
  await page.keyboard.press('Tab')
  await expect(editor).not.toBeFocused()
})
