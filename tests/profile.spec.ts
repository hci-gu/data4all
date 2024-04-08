import test, { expect } from '@playwright/test'
import { createDataset, createEvent, loggedInUser } from './setup/utils'
import uuid from 'short-uuid'

test.describe('Profile page', () => {
    test.describe('Logged in user', () => {
        test.beforeEach(async ({ page, request, context }) => {
            await loggedInUser({ page, request, context })
        })

        test('Can reach the profile page', async ({ page }) => {
            await page.goto('/profile')
            await expect(page.getByRole('heading', { level: 1 })).toHaveText(
                'Profil'
            )
        })

        test('Can update user name', async ({ page }) => {
            await page.goto('/profile')
            await page.fill('input[name="name"]', 'tester New')
            await page.click('button[type="submit"]')

            await expect(
                page.getByRole('link', { name: 'tester New' })
            ).toBeVisible()
        })
        test('Can update work role', async ({ page }) => {
            await page.goto('/profile')
            await page.getByLabel('Arbetsroll').click()
            await page.getByLabel('Admin').click()
            await page.click('button[type="submit"]')

            await expect(page.getByLabel('Arbetsroll')).toHaveText('Admin')
        })

        test('Can update password', async ({ page }) => {
            await page.goto('/profile')
            const passwordInput = page.locator('input[name="password"]')
            const confirmPasswordInput = page.locator(
                'input[name="passwordConfirm"]'
            )
            const oldPasswordInput = page.locator('input[name="oldPassword"]')

            await passwordInput.fill('New password')
            await confirmPasswordInput.fill('New password')
            await oldPasswordInput.fill('123456789')

            await page.click('button[type="submit"]')

            const isInvalidPasswordInput =
                await passwordInput.getAttribute('aria-invalid')
            const isInvalidConfirmPasswordInput =
                await confirmPasswordInput.getAttribute('aria-invalid')
            const isInvalidOldPasswordInput =
                await oldPasswordInput.getAttribute('aria-invalid')

            expect(isInvalidPasswordInput).toBe('false')
            expect(isInvalidConfirmPasswordInput).toBe('false')
            expect(isInvalidOldPasswordInput).toBe('false')
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
