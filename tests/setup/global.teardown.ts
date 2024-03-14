import { expect, test as setup } from '@playwright/test'

setup('setup', async ({ page }) => {
    
    await page.goto('/profile')

    await page.getByRole('button', { name: 'Ta bort konto' }).click()
    await expect(page).toHaveURL('/skapa-konto')
})
