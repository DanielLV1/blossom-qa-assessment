export class BasePage {
  constructor(page) {
    this.page = page
    this.accountOverviewLink = page.locator('a:has-text("Accounts Overview")')
    this.billPayLink = page.locator('a:has-text("Bill Pay")')
  }

  async navigate(path) {
    await this.page.goto(path)
  }

}
