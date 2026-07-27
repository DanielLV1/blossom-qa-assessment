import { test, expect } from '../../fixtures/testFixtures.js'
import { loginUsers } from '../../data/users.json'

test('TC-01 - Login exitoso con credenciales validas', async ({ loginPage }) => {
    await loginPage.login('standard_user')
    await expect(loginPage.page.locator('p').filter({ hasText: 'Welcome ' + loginUsers.standard_user.name })).toBeVisible()
    await expect(loginPage.page.getByRole('link', { name: 'Log Out' })).toBeVisible()
})
test('TC-11 - Login con credenciales invalidas', async ({ loginPage }) => {
    await loginPage.login('failure_user')
    await expect(loginPage.errorMessage).toBeVisible()
    await expect(loginPage.errorMessageText).toBeVisible()
})