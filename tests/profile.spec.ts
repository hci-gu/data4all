import test, { expect } from '@playwright/test'
import { loggedInUser } from './setup/utils'

test.describe('Profile page', () => {
    test.describe('Logged in user', () => {
        test.beforeEach(async ({ page, request, context }) => {
            await loggedInUser({ page, request, context })
        })

        test('Can reach the profile page', async ({
            page,
            request,
            context,
        }) => {
            await page.goto('/profile')
            await expect(page.getByRole('heading', { level: 1 })).toHaveText(
                'Profil'
            )
        })
    })

    test.describe('Not logged in user', () => {
        test.use({ storageState: { cookies: [], origins: [] } })

        test('Can not reach the profile page', async ({ page }) => {
            await page.goto('/profile')
            await expect(page).toHaveURL('/logga-in')
        })
    })
})
