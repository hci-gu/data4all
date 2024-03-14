import test, { expect } from '@playwright/test'

test('can be on profile page', async ({ page }) => {
    // profile page
    await page.goto('/profile')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Profil')
})
