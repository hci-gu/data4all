import { expect, test as setup } from '@playwright/test'
import user from './user'

setup('signUp', async ({ page }) => {
    /* SignUp page */
    await page.goto('/skapa-konto')
    await page.fill('input[name="email"]', user.email)
    await page.fill('input[name="password"]', user.password)
    await page.fill('input[name="passwordConfirmation"]', user.password)
    await page.locator('select').selectOption({ label: user.role })
    await page.getByRole('button', { name: 'Skapa konto' }).click()

    await page.waitForURL('/loga-in')

    /* SignIn page */
    await page.goto('/loga-in')
    await page.fill('input[name="email"]', user.email)
    await page.fill('input[name="password"]', user.password)
    await page.click('button[type="submit"]')

    await expect(page.getByRole('button')).toContainText('Loga ut')
    await page.context().storageState({ path: 'tests/setup/storage.json' })
})
