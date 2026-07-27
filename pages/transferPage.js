import { BasePage } from "./BasePage.js"
import { transferUsers } from '../data/transferData.json'

export class TransferPage extends BasePage {
    constructor(page) {
        super(page)
        this.transferFundLink = page.locator('a:has-text("Transfer Funds")')
        this.cuentaOrigen = page.locator('select[id="fromAccountId"]')
        this.cuentaDestino = page.locator('select[id="toAccountId"]')
        this.monto = page.locator('input[id="amount"]')
        this.buttonTransfer = page.locator('input[value="Transfer"]')
    }

    async goToTransferFunds() {
        await this.transferFundLink.click()
    }

    async transferFunds(cuentaOrigen, cuentaDestino, monto) {
        await this.cuentaOrigen.selectOption(cuentaOrigen)
        await this.cuentaDestino.selectOption(cuentaDestino)
        await this.monto.fill(monto)
        await this.buttonTransfer.click()
    }
}