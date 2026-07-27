import { test, expect } from '../../fixtures/testFixtures.js'
import { transferUsers } from '../../data/transferData.json'

test('TC-04 - Transferencia de fondos entre cuentas propias', async ({ loginPage, transferPage, accountOverviewPage }) => {
    await loginPage.login('standard_user')

    await loginPage.accountOverviewLink.click()
    const cuentas = await accountOverviewPage.getAvailableAccounts()
    const cuentaOrigen = cuentas[0]
    const cuentaDestino = cuentas[1] || cuentas[0]
    const montoATransferir = parseFloat(transferUsers.standard_user.monto)

    const saldoOrigenInicial = await accountOverviewPage.getAccountBalance(cuentaOrigen)
    const saldoDestinoInicial = await accountOverviewPage.getAccountBalance(cuentaDestino)

    await transferPage.goToTransferFunds()
    await transferPage.transferFunds(cuentaOrigen, cuentaDestino, transferUsers.standard_user.monto)

    await expect(transferPage.page.locator('h1').filter({ hasText: 'Transfer Complete!' })).toBeVisible()
    await expect(transferPage.page.locator('p').filter({ hasText: '$' + transferUsers.standard_user.monto })).toBeVisible()
    await expect(transferPage.page.locator('p').filter({ hasText: 'From Account #' + cuentaOrigen })).toBeVisible()
    await expect(transferPage.page.locator('p').filter({ hasText: 'To Account #' + cuentaDestino })).toBeVisible()

    await transferPage.accountOverviewLink.click()
    const saldoOrigenFinal = await accountOverviewPage.getAccountBalance(cuentaOrigen)
    const saldoDestinoFinal = await accountOverviewPage.getAccountBalance(cuentaDestino)

    if (cuentaOrigen === cuentaDestino) {
        expect(saldoOrigenFinal).toBe(saldoOrigenInicial)
    } else {
        expect(saldoOrigenFinal).toBe(saldoOrigenInicial - montoATransferir)
        expect(saldoDestinoFinal).toBe(saldoDestinoInicial + montoATransferir)
    }
})

test('TC-14 - Transferencia con monto invalido', async ({ loginPage, transferPage, accountOverviewPage }) => {
    await loginPage.login('standard_user')
    await loginPage.accountOverviewLink.click()
    const cuentas = await accountOverviewPage.getAvailableAccounts()
    const cuentaOrigen = cuentas[0]
    const cuentaDestino = cuentas[0]

    const montosInvalidos = [transferUsers.standard_user.montoInvalid, transferUsers.standard_user.montoNegativo]

    for (const monto of montosInvalidos) {
        await transferPage.goToTransferFunds()
        await transferPage.transferFunds(cuentaOrigen, cuentaDestino, monto)
        console.log(`BUG DETECTADO: El formulario de transferencia de la UI permite ingresar montos invalidos (monto: ${monto}) y procesa la operacion mostrando "Transfer Complete!".`)
        await expect(transferPage.page.locator('h1').filter({ hasText: 'Transfer Complete!' })).not.toBeVisible()
    }
})