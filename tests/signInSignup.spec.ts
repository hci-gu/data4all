// @ts-check
import { test, expect } from '@playwright/test'

test('can navigate to signIn page', async ({ page, context }) => {
    /* Sign ut user */
    context.clearCookies()

    await page.goto('/loga-in')

    // Expects page to have a title of "Logga in".
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Logga in')
})

test('can navigate to signup page', async ({ page, context }) => {
    /* Sign ut user */
    context.clearCookies()
    
    await page.goto('/loga-in')
    page.click('a[href="/skapa-konto"]')
    await expect(page).toHaveURL('/skapa-konto')
})
