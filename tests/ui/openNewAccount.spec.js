import { test, expect } from "../../fixtures/testFixtures.js";

test('TC-03 - Apertura de nueva cuenta', async ({ loginPage, openAccountPage, accountOverviewPage }) => {
    await loginPage.login('standard_user')
    await openAccountPage.openAccount()
    //Validacion titulo inicial
    const cuentaCreada = openAccountPage.page.getByRole('heading', { name: 'Account Opened!' })
    await expect(cuentaCreada).toBeVisible()
    //Validar mensaje de exito
    const mensajeExito = openAccountPage.page.locator('p:has-text("Congratulations, your account is now open.")')
    await expect(mensajeExito).toBeVisible()
    //Validar numero de cuenta
    const nroCuenta = openAccountPage.page.locator('#newAccountId')
    await expect(nroCuenta).toBeVisible()
    await expect(nroCuenta).not.toBeEmpty()
    const nroCuentaVal = await nroCuenta.textContent()
    //Validar en AccountOverview
    await openAccountPage.accountOverviewLink.click()
    await expect(accountOverviewPage.getAccountRow(nroCuentaVal)).toBeVisible()
})