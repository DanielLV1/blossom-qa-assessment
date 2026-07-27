import { BasePage } from "./BasePage.js"
import { billPayData } from "../data/billPayData.json"

export class BillPayPage extends BasePage {
    constructor(page) {
        super(page)
        this.payeeNameInput = page.locator('input[name="payee.name"]')
        this.addressInput = page.locator('input[name="payee.address.street"]')
        this.cityInput = page.locator('input[name="payee.address.city"]')
        this.stateInput = page.locator('input[name="payee.address.state"]')
        this.zipCodeInput = page.locator('input[name="payee.address.zipCode"]')
        this.phoneInput = page.locator('input[name="payee.phoneNumber"]')
        this.accountNumberInput = page.locator('input[name="payee.accountNumber"]')
        this.verifyAccountInput = page.locator('input[name="verifyAccount"]')
        this.amountInput = page.locator('input[name="amount"]')
        this.fromAccountIdSelect = page.locator('select[name="fromAccountId"]')
        this.sendPaymentButton = page.locator('input[value="Send Payment"]')
    }



    async payBill(payeeKey, fromAccountId, amountVal = null) {
        const data = billPayData[payeeKey]
        const paymentAmount = amountVal || data.amount

        await this.payeeNameInput.fill(data.name)
        await this.addressInput.fill(data.address)
        await this.cityInput.fill(data.city)
        await this.stateInput.fill(data.state)
        await this.zipCodeInput.fill(data.zipCode)
        await this.phoneInput.fill(data.phone)
        await this.accountNumberInput.fill(data.accountNumber)
        await this.verifyAccountInput.fill(data.accountNumber)
        await this.amountInput.fill(paymentAmount)
        await this.fromAccountIdSelect.selectOption(fromAccountId)
        await this.sendPaymentButton.click()
    }
}