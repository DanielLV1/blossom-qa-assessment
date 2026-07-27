import { BasePage } from "./BasePage.js";
import { expect } from "@playwright/test";
export class OpenAccountPage extends BasePage {
    constructor(page) {
        super(page)
        this.openAccountLink = page.locator('a:has-text("Open New Account")')
        this.tipoCuenta = page.locator('select[id="type"]')
        this.cuentaRestante = page.locator('select[id="fromAccountId"]')
        this.buttonAbrirCuenta = page.locator('input[value="Open New Account"]')

    }

    async openAccount() {
        await this.openAccountLink.click()
        await this.tipoCuenta.selectOption({ index: 0 })
        await this.cuentaRestante.selectOption({ index: 0 })
        await expect(this.buttonAbrirCuenta).toBeEnabled()
        await this.buttonAbrirCuenta.click()

    }
}