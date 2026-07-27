import { test, expect } from '@playwright/test'
import { BankApiClient } from '../../api/BankApiClient.js'
import { loginUsers } from '../../data/users.json'

test.describe('API Tests', () => {
    let apiClient
    let customerId
    let firstAccountId

    test.beforeEach(async ({ request }) => {
        apiClient = new BankApiClient(request)
    })

    test('TC-06 - Login via API', async () => {
        const username = loginUsers.standard_user.username
        const password = loginUsers.standard_user.password

        const response = await apiClient.login(username, password)
        expect(response.status()).toBe(200)

        const body = await response.json()
        expect(body).toHaveProperty('id')
        expect(body.firstName).toBe('prueba')
        expect(body.lastName).toBe('salida')

        customerId = body.id
    })

    test('TC-07 - Obtener cuentas de un customer', async () => {
        const username = loginUsers.standard_user.username
        const password = loginUsers.standard_user.password
        const loginRes = await apiClient.login(username, password)
        const customer = await loginRes.json()

        const response = await apiClient.getCustomerAccounts(customer.id)
        expect(response.status()).toBe(200)

        const accounts = await response.json()
        expect(Array.isArray(accounts)).toBe(true)
        expect(accounts.length).toBeGreaterThan(0)
        expect(accounts[0]).toHaveProperty('id')

        firstAccountId = accounts[0].id
    })

    test('TC-08 - Obtener detalle de una cuenta', async () => {
        const username = loginUsers.standard_user.username
        const password = loginUsers.standard_user.password
        const loginRes = await apiClient.login(username, password)
        const customer = await loginRes.json()
        const accountsRes = await apiClient.getCustomerAccounts(customer.id)
        const accounts = await accountsRes.json()
        const targetAccountId = accounts[0].id

        const response = await apiClient.getAccountDetail(targetAccountId)
        expect(response.status()).toBe(200)

        const accountDetail = await response.json()
        expect(accountDetail.id).toBe(targetAccountId)
        expect(accountDetail).toHaveProperty('balance')
        expect(accountDetail).toHaveProperty('type')
    })

    test('TC-09 - Historial de transacciones de una cuenta', async () => {
        const username = loginUsers.standard_user.username
        const password = loginUsers.standard_user.password
        const loginRes = await apiClient.login(username, password)
        const customer = await loginRes.json()
        const accountsRes = await apiClient.getCustomerAccounts(customer.id)
        const accounts = await accountsRes.json()
        const targetAccountId = accounts[0].id

        const response = await apiClient.getAccountTransactions(targetAccountId)
        expect(response.status()).toBe(200)

        const transactions = await response.json()
        expect(Array.isArray(transactions)).toBe(true)
    })

    test('TC-10 - Escenario encadenado: crear-verificar-actualizar-verificar cuenta', async () => {
        const username = loginUsers.standard_user.username
        const password = loginUsers.standard_user.password
        const loginRes = await apiClient.login(username, password)
        const customer = await loginRes.json()
        const accountsRes = await apiClient.getCustomerAccounts(customer.id)
        const accounts = await accountsRes.json()
        const fromAccountId = accounts[0].id

        const createRes = await apiClient.createAccount(customer.id, '1', fromAccountId)
        expect(createRes.status()).toBe(200)
        const newAccount = await createRes.json()
        expect(newAccount).toHaveProperty('id')
        const newAccountId = newAccount.id

        const accountsVerificationRes = await apiClient.getCustomerAccounts(customer.id)
        const verifiedAccounts = await accountsVerificationRes.json()
        const isAccountCreated = verifiedAccounts.some(acc => acc.id === newAccountId)
        expect(isAccountCreated).toBe(true)

        const transferRes = await apiClient.transfer(fromAccountId, newAccountId, '50.00')
        expect(transferRes.status()).toBe(200)

        const transactionsRes = await apiClient.getAccountTransactions(newAccountId)
        expect(transactionsRes.status()).toBe(200)
        const transactions = await transactionsRes.json()
        expect(transactions.length).toBeGreaterThan(0)
    })

    test('TC-12 - Transferencia con fondos insuficientes', async () => {
        const username = loginUsers.standard_user.username
        const password = loginUsers.standard_user.password
        const loginRes = await apiClient.login(username, password)
        const customer = await loginRes.json()

        const accountsRes = await apiClient.getCustomerAccounts(customer.id)
        const accounts = await accountsRes.json()
        const fromAccountId = accounts[0].id
        const toAccountId = accounts[1] ? accounts[1].id : fromAccountId

        const detailRes = await apiClient.getAccountDetail(fromAccountId)
        const initialDetail = await detailRes.json()
        const initialBalance = initialDetail.balance

        const excessAmount = (initialBalance + 10000.00).toFixed(2)

        const transferRes = await apiClient.transfer(fromAccountId, toAccountId, excessAmount)
        expect(transferRes.status()).not.toBe(500)

        const finalDetailRes = await apiClient.getAccountDetail(fromAccountId)
        const finalDetail = await finalDetailRes.json()
        console.log(`BUG DETECTADO: La API de Parabank permite transferir dinero superando el saldo disponible (genera saldo negativo) y no valida fondos suficientes.`)
        expect(finalDetail.balance).toBe(initialBalance + 9999.00)
    })

    test('TC-13 - Consulta de cuenta inexistente', async () => {
        const response = await apiClient.getAccountDetail('999999')
        expect(response.status()).toBe(400)
    })

    const transferDatasets = [
        { amount: '10.00', description: 'monto valido', shouldFail: false },
        { amount: '0.00', description: 'monto 0', shouldFail: true },
        { amount: '-10.00', description: 'monto negativo', shouldFail: true },
        { amount: '999999.00', description: 'monto mayor al balance', shouldFail: true },
        { amount: '9999999999.00', description: 'monto excesivo', shouldFail: true }
    ]

    for (const data of transferDatasets) {
        test(`TC-15 - Transferencias parametrizadas (data-driven) - ${data.description}`, async () => {
            const username = loginUsers.standard_user.username
            const password = loginUsers.standard_user.password
            const loginRes = await apiClient.login(username, password)
            const customer = await loginRes.json()

            const accountsRes = await apiClient.getCustomerAccounts(customer.id)
            const accounts = await accountsRes.json()
            const fromAccountId = accounts[0].id
            const toAccountId = accounts[1] ? accounts[1].id : fromAccountId

            const response = await apiClient.transfer(fromAccountId, toAccountId, data.amount)
            
            if (data.shouldFail) {
                console.log(`BUG DETECTADO: La API de Parabank permite transferencias con montos invalidos (tipo: ${data.description}, monto: ${data.amount}) y responde con 200 OK en lugar de 400.`)
                expect(response.status()).toBe(400)
            } else {
                expect(response.status()).toBe(200)
                const bodyText = await response.text()
                expect(bodyText).toContain('Successfully transferred')
            }
        })
    }
})
