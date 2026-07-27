import { BasePage } from './BasePage.js'
import { registerUsers } from '../data/registerData.json'

export class RegisterPage extends BasePage {
    constructor(page) {
        super(page)
        this.registerInitial = page.locator('a:has-text("Register")')
        this.firstNameInput = page.locator('input[name="customer.firstName"]')
        this.lastNameInput = page.locator('input[name="customer.lastName"]')
        this.addressInput = page.locator('input[name="customer.address.street"]')
        this.cityInput = page.locator('input[name="customer.address.city"]')
        this.stateInput = page.locator('input[name="customer.address.state"]')
        this.zipCodeInput = page.locator('input[name="customer.address.zipCode"]')
        this.phoneInput = page.locator('input[name="customer.phoneNumber"]')
        this.ssnInput = page.locator('input[name="customer.ssn"]')
        this.usernameInput = page.locator('input[name="customer.username"]')
        this.passwordInput = page.locator('input[name="customer.password"]')
        this.confirmPasswordInput = page.locator('input[name="repeatedPassword"]')
        this.registerButton = page.locator('input[value="Register"]')
    }

    async registerUnique(user = 'standard_user') {
        const rand = Math.floor(100000 + Math.random() * 900000)
        const uniqueUsername = `usr_${rand}`
        const uniqueSsn = `${Math.floor(100000000 + Math.random() * 900000000)}`
        const uniquePhone = `${Math.floor(100000000 + Math.random() * 900000000)}`
        
        await this.registerInitial.click()
        await this.firstNameInput.waitFor({ state: 'visible' })
        await this.firstNameInput.fill(registerUsers[user].firstName)
        await this.lastNameInput.fill(registerUsers[user].lastName)
        await this.addressInput.fill(registerUsers[user].address)
        await this.cityInput.fill(registerUsers[user].city)
        await this.stateInput.fill(registerUsers[user].state)
        await this.zipCodeInput.fill(registerUsers[user].zipCode)
        await this.phoneInput.fill(uniquePhone)
        await this.ssnInput.fill(uniqueSsn)
        await this.usernameInput.fill(uniqueUsername)
        await this.passwordInput.fill(registerUsers[user].password)
        await this.confirmPasswordInput.fill(registerUsers[user].password)
        await this.registerButton.click()
        return {
            username: uniqueUsername,
            firstName: registerUsers[user].firstName,
            lastName: registerUsers[user].lastName
        }
    }

    async clickRegister() {
        await this.registerLink.click()
    }

    async registerStandard(user = 'standard_user') {
        await this.registerInitial.click()
        await this.firstNameInput.waitFor({ state: 'visible' })
        await this.firstNameInput.fill(registerUsers[user].firstName)
        await this.lastNameInput.fill(registerUsers[user].lastName)
        await this.addressInput.fill(registerUsers[user].address)
        await this.cityInput.fill(registerUsers[user].city)
        await this.stateInput.fill(registerUsers[user].state)
        await this.zipCodeInput.fill(registerUsers[user].zipCode)
        await this.phoneInput.fill(registerUsers[user].phone)
        await this.ssnInput.fill(registerUsers[user].ssn)
        await this.usernameInput.fill(registerUsers[user].username)
        await this.passwordInput.fill(registerUsers[user].password)
        await this.confirmPasswordInput.fill(registerUsers[user].password)
        await this.registerButton.click()
        return {
            username: registerUsers[user].username,
            firstName: registerUsers[user].firstName,
            lastName: registerUsers[user].lastName
        }
    }
}