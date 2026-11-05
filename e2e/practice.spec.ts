import { expect, test } from '@playwright/test'

test('el formulario enseña los errores al enviar y enfoca el primero', async ({ page }) => {
  await page.goto('/#validacion')
  const topic = page.locator('#validacion')
  const nombre = topic.getByLabel('Nombre')

  await expect(nombre).not.toHaveAttribute('aria-invalid')
  await topic.getByRole('button', { name: 'Crear cuenta' }).click()

  await expect(nombre).toBeFocused()
  await expect(nombre).toHaveAttribute('aria-invalid', 'true')
  await expect(nombre).toHaveAccessibleDescription('Dinos cómo te llamas.')

  await nombre.fill('Lucía')
  await topic.getByRole('textbox', { name: 'Correo' }).fill('lucia@ejemplo.com')
  await topic.getByLabel('Contraseña').fill('corta')
  await expect(topic.getByLabel('Contraseña')).toHaveAccessibleDescription('Te faltan 3 caracteres.')

  await topic.getByLabel('Contraseña').fill('suficiente')
  await topic.getByLabel('Simular que el servidor rechaza el correo').check()
  await topic.getByRole('button', { name: 'Crear cuenta' }).click()
  await expect(topic.getByRole('textbox', { name: 'Correo' })).toBeFocused()
  await expect(topic.getByRole('textbox', { name: 'Correo' })).toHaveAccessibleDescription(/Ya hay una cuenta/)

  await topic.getByLabel('Simular que el servidor rechaza el correo').uncheck()
  await topic.getByRole('textbox', { name: 'Correo' }).fill('lucia2@ejemplo.com')
  await topic.getByRole('button', { name: 'Crear cuenta' }).click()
  await expect(topic.getByText('Cuenta creada para Lucía')).toBeVisible()

  await topic.getByRole('button', { name: 'Empezar otra vez' }).click()
  await expect(topic.getByLabel('Nombre')).toBeFocused()
  await expect(topic.getByLabel('Nombre')).toHaveValue('')
})

test('la búsqueda cubre los estados inicial, vacío, error y con datos', async ({ page }) => {
  await page.goto('/#pedir-datos')
  const topic = page.locator('#pedir-datos')
  const status = topic.getByRole('status').filter({ hasText: /\S/ })
  const campo = topic.getByLabel('Busca una capital de provincia')

  await expect(status).toHaveText(/Todavía no se ha pedido nada/)

  await campo.pressSequentially('avil')
  await expect(status).toHaveText('1 capital encontrada.')
  await expect(topic.getByRole('list', { name: 'Capitales encontradas' }).getByRole('listitem')).toHaveText(['Ávila'])
  await expect(topic.getByText(/canceladas antes de responder: [1-9]/)).toBeVisible()

  await campo.fill('xyz')
  await expect(status).toHaveText('Ninguna capital de provincia contiene «xyz».')

  await topic.getByLabel('Simular que falla la red').check()
  await campo.fill('sev')
  await expect(status).toHaveText(/No se ha podido buscar/)

  await topic.getByLabel('Simular que falla la red').uncheck()
  await topic.getByRole('button', { name: 'Reintentar' }).click()
  await expect(campo).toBeFocused()
  await expect(status).toHaveText('1 capital encontrada.')
})

test('el div no responde al teclado y el button sí', async ({ page }) => {
  await page.goto('/#accesibilidad')
  const topic = page.locator('#accesibilidad')

  // Pinchar en el texto fija desde dónde sigue Tab: el siguiente foco debe saltarse el div
  await topic.getByText('Prueba los dos sin ratón').click()
  await page.keyboard.press('Tab')
  await expect(topic.getByRole('button', { name: 'Guardar (button)' })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(topic.getByText(/se ha pulsado 0 veces; el\s+button, 1 vez/)).toBeVisible()
})

test('con key por índice la nota se queda en la fila equivocada', async ({ page }) => {
  await page.goto('/#errores-comunes')
  const topic = page.locator('#errores-comunes')

  await topic.getByLabel('Lucía').fill('Trae el pan')
  await topic.getByRole('button', { name: 'Borrar a Lucía' }).click()
  await expect(topic.getByLabel('Jorge')).toHaveValue('Trae el pan')
  await expect(topic.getByRole('button', { name: 'Borrar a Jorge' })).toBeFocused()

  await topic.getByLabel('El id').check()
  await topic.getByLabel('Lucía').fill('Trae el pan')
  await topic.getByRole('button', { name: 'Borrar a Lucía' }).click()
  await expect(topic.getByLabel('Jorge')).toHaveValue('')
  await expect(topic.getByRole('button', { name: 'Borrar a Jorge' })).toBeFocused()
})
