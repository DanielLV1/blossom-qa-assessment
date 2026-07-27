import { BasePage } from "./BasePage.js"

export class AccountOverviewPage extends BasePage {
    constructor(page) {
        super(page)
    }

    getAccountRow(accountId) {
        return this.page.locator(`tr:has-text("${accountId}")`)
    }

    async getAccountBalance(accountId) {
        const balanceText = await this.page.locator(`tr:has-text("${accountId}") td`).nth(1).textContent()
        return parseFloat(balanceText.replace(/[$,]/g, '').trim())
    }

    async getAvailableAccounts() {
        const firstAccountLink = this.page.locator('a[href*="activity.htm"]').first()
        await firstAccountLink.waitFor({ state: 'visible' })
        const accountLinks = this.page.locator('a[href*="activity.htm"]')
        const count = await accountLinks.count()
        const accounts = []
        for (let i = 0; i < count; i++) {
            const text = await accountLinks.nth(i).textContent()
            if (text) accounts.push(text.trim())
        }
        return accounts
    }
}
