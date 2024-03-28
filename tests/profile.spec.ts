import test, { expect } from '@playwright/test'
import { createDataset, createEvent, loggedInUser } from './setup/utils'

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
            // await loggedInUser({ page, request, context })
            await page.goto('/profile')
            await expect(page.getByRole('heading', { level: 1 })).toHaveText(
                'Profil'
            )
        })
    })

    test.describe('Not logged in user', () => {
        test('Can not reach the profile page', async ({ page }) => {
            await page.goto('/profile')
            await expect(page).toHaveURL('/logga-in')
        })
    })

    test.describe('user has a linked dataset', () => {
        test.beforeEach(async ({ page, request, context }) => {
            const userId = await loggedInUser({ page, request, context })
            const dataset = await createDataset('test title')
            const event = await createEvent(dataset.id, userId)
        })

        test('has dataset', async ({ page, request, context }) => {
            // await loggedInUser({ page, request, context })
            await page.goto('/profile')
            await expect(page.getByRole('heading', { level: 1 })).toHaveText(
                'Profil'
            )
            await expect(page.getByRole('heading', { level: 3 })).toHaveText(
                'test title'
            )
        })
    })
    test.describe('user does not have dataset', () => {
        test.beforeEach(async ({ page, request, context }) => {
            await loggedInUser({ page, request, context })
        })

        test('does not have dataset', async ({ page, request, context }) => {
            // await loggedInUser({ page, request, context })
            await page.goto('/profile')
            await expect(page.getByRole('heading', { level: 1 })).toHaveText(
                'Profil'
            )
            await expect(
                page.getByText('Du har inga relaterade dataset')
            ).toBeVisible()
        })
    })
})
