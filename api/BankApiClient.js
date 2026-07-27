export class BankApiClient {
    constructor(request) {
        this.request = request
        this.apiBaseUrl = process.env.API_BASE_URL || 'https://parabank.parasoft.com/parabank/services/bank'
        this.headers = {
            'Accept': 'application/json'
        }
    }

    async login(username, password) {
        const response = await this.request.get(`${this.apiBaseUrl}/login/${username}/${password}`, {
            headers: this.headers
        })
        return response
    }

    async getCustomerAccounts(customerId) {
        const response = await this.request.get(`${this.apiBaseUrl}/customers/${customerId}/accounts`, {
            headers: this.headers
        })
        return response
    }

    async getAccountDetail(accountId) {
        const response = await this.request.get(`${this.apiBaseUrl}/accounts/${accountId}`, {
            headers: this.headers
        })
        return response
    }

    async getAccountTransactions(accountId) {
        const response = await this.request.get(`${this.apiBaseUrl}/accounts/${accountId}/transactions`, {
            headers: this.headers
        })
        return response
    }

    async createAccount(customerId, newAccountType, fromAccountId) {
        const response = await this.request.post(`${this.apiBaseUrl}/createAccount?customerId=${customerId}&newAccountType=${newAccountType}&fromAccountId=${fromAccountId}`, {
            headers: this.headers
        })
        return response
    }

    async transfer(fromAccountId, toAccountId, amount) {
        const response = await this.request.post(`${this.apiBaseUrl}/transfer?fromAccountId=${fromAccountId}&toAccountId=${toAccountId}&amount=${amount}`, {
            headers: this.headers
        })
        return response
    }
}
