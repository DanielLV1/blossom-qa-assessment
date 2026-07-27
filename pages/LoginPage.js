import { BasePage } from './BasePage.js'
import { loginUsers } from '../data/users.json'

export class LoginPage extends BasePage {
  constructor(page) {
    super(page)
    this.usernameInput = page.locator('input[name="username"]')
    this.passwordInput = page.locator('input[name="password"]')
    this.loginButton = page.locator('input[value="Log In"]')
    this.registerLink = page.locator('a:has-text("Register")')
    this.errorMessage = page.getByRole('heading', { name: 'Error' }).filter({ hasText: 'Error!' })
    this.errorMessageText = page.locator('p').filter({ hasText: 'The username and password could not be verified.' })
  }

  async login(user = 'standard_user') {
    await this.usernameInput.fill(loginUsers[user].username)
    await this.passwordInput.fill(loginUsers[user].password)
    await this.loginButton.click()
  }

  async clickRegister() {
    await this.registerLink.click()
  }
}
