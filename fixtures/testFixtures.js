import { test as base } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage.js'
import { RegisterPage } from '../pages/RegisterPage.js'
import { OpenAccountPage } from '../pages/openAccountPage.js'
import { TransferPage } from '../pages/transferPage.js'
import { AccountOverviewPage } from '../pages/AccountOverviewPage.js'
import { BillPayPage } from '../pages/BillPayPage.js'

export const test = base.extend({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page)
    await loginPage.navigate('')
    await use(loginPage)
  },
  registerPage: async ({ page }, use) => {
    const registerPage = new RegisterPage(page)
    await registerPage.navigate('')
    await use(registerPage)
  },
  openAccountPage: async ({ page }, use) => {
    const openAccountPage = new OpenAccountPage(page)
    await openAccountPage.navigate('')
    await use(openAccountPage)
  },
  transferPage: async ({ page }, use) => {
    const transferPage = new TransferPage(page)
    await transferPage.navigate('')
    await use(transferPage)
  },
  accountOverviewPage: async ({ page }, use) => {
    const accountOverviewPage = new AccountOverviewPage(page)
    await use(accountOverviewPage)
  },
  billPayPage: async ({ page }, use) => {
    const billPayPage = new BillPayPage(page)
    await billPayPage.navigate('')
    await use(billPayPage)
  }
})

export { expect } from '@playwright/test'
