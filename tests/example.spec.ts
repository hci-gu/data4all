// @ts-check
import { test, expect } from '@playwright/test'

const baseUrl = 'http://localhost:3000'

test('has title', async ({ page }) => {
    await page.goto(`${baseUrl}/loga-in`)

    // Expects page to have a title of "Logga in".
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Logga in')
})

test('can navigate to login', async ({ page }) => {
    await page.goto(`${baseUrl}`)
    await page.getByRole('link', { name: /Logga in istället/i }).click()
    await expect(page).toHaveURL(`${baseUrl}/loga-in`)
})
test('can login', async ({ page }) => {
    const user = {
        email: 'exampel@kungsbacka.se',
        password: '123456789',
        role: 'User',
    }

    /* Signup page */
    await page.goto(`${baseUrl}/skapa-konto`)
    await page.fill('input[name="email"]', user.email)
    await page.fill('input[name="password"]', user.password)
    await page.fill('input[name="passwordConfirmation"]', user.password)
    await page.locator('select').selectOption({ label: user.role })
    await page.getByRole('button', { name: 'Skapa konto' }).click()

    /* Login page */
    await expect(page).toHaveURL(`${baseUrl}/loga-in`)
    await page.fill('input[name="email"]', user.email)
    await page.fill('input[name="password"]', user.password)
    await page.click('button[type="submit"]')

    // index page
    await expect(page).toHaveURL(`${baseUrl}/`)
    await page.getByRole('button').click()

    // profile page
    await expect(page).toHaveURL(`${baseUrl}/profile`)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Profil')
})
