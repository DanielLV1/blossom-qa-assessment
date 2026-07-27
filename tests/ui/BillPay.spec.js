import { test, expect } from '../../fixtures/testFixtures.js'
import { billPayData } from '../../data/billPayData.json'

test('TC-05 - Pago de factura (Bill Pay)', async ({ loginPage, billPayPage, accountOverviewPage }) => {
    await loginPage.login('standard_user')

    // 1. Obtener cuenta y saldo inicial dinámicamente
    await loginPage.accountOverviewLink.click()
    const cuentas = await accountOverviewPage.getAvailableAccounts()
    const cuentaOrigen = cuentas[1]
    const saldoInicial = await accountOverviewPage.getAccountBalance(cuentaOrigen)
    const montoAPagar = billPayData.electric_bill.amount

    // 2. Realizar el pago de servicios
    await billPayPage.billPayLink.click()
    await billPayPage.payBill('electric_bill', cuentaOrigen, montoAPagar.toString())

    // 3. Validar mensajes de éxito
    await expect(billPayPage.page.locator('h1').filter({ hasText: 'Bill Payment Complete' })).toBeVisible()

    const successMsg = billPayPage.page.locator('#billpayResult p').first()
    await expect(successMsg).toContainText(billPayData.electric_bill.name)
    await expect(successMsg).toContainText(`$${montoAPagar}`)
    await expect(successMsg).toContainText(cuentaOrigen)

    // 4. Validar descuento de saldo en Account Overview
    await billPayPage.accountOverviewLink.click()
    const saldoFinal = await accountOverviewPage.getAccountBalance(cuentaOrigen)
    expect(saldoFinal).toBe(saldoInicial - montoAPagar)
    console.log("saldo final: ", saldoFinal)
    console.log("saldo inicial: ", saldoInicial)
    console.log("monto a pagar: ", montoAPagar)
})