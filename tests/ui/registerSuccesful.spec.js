import { test, expect } from '../../fixtures/testFixtures.js'

test('TC-02 - Registro de nuevo usuario (unico)', async ({ registerPage }) => {
    const userData = await registerPage.registerUnique('standard_user')
    const usuarioRegistrado = registerPage.page.getByRole('heading', { name: 'Welcome ' + userData.username })
    await expect(usuarioRegistrado).toBeVisible()
    await expect(registerPage.page.locator('p').filter({ hasText: 'Your account was created successfully' })).toBeVisible()
})
/*
test('TC-02 - Registro de nuevo usuario (estandar)', async ({ registerPage }) => {
    const userData = await registerPage.registerStandard('standard_user')
    const usuarioRegistrado = registerPage.page.getByRole('heading', { name: 'Welcome ' + userData.username })
    await expect(usuarioRegistrado).toBeVisible()
    await expect(registerPage.page.locator('p').filter({ hasText: 'Your account was created successfully' })).toBeVisible()
})
/**/