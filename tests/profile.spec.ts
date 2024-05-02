import test, { expect } from '@playwright/test'
import {
    createByUserName,
    createDataset,
    createEvent,
    loggedInUser,
} from './setup/utils'

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
        test('Can reach someone else profile page', async ({ page }) => {
            const name = 'tester New user'
            await createByUserName(name)

            await page.goto(`/profile/${name}`)
            await expect(page.getByRole('heading', { level: 1 })).toHaveText(
                name
            )
        })
        test('Can not reach not existed profile page', async ({ page }) => {
            const name = 'tester user not existed'

            await page.goto(`/profile/${name}`)
            expect(page.getByRole('paragraph')).toHaveText('Kunde inte hitta det du letade efter')
        })

        test('Can update user name', async ({ page }) => {
            await page.goto('/profile')
            await page.fill('input[name="name"]', 'tester New')
            await page.click('button[type="submit"]')

            await expect(
                page.getByRole('link', { name: 'tester New tN' })
            ).toBeVisible()
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
        test('Get error on wrong typed password', async ({ page }) => {
            await page.goto('/profile')
            const passwordInput = page.locator('input[name="password"]')
            const confirmPasswordInput = page.locator(
                'input[name="passwordConfirm"]'
            )
            const oldPasswordInput = page.locator('input[name="oldPassword"]')

            await passwordInput.fill('New password')
            await confirmPasswordInput.fill('Not the same password')
            await oldPasswordInput.fill('123456789')

            await page.click('button[type="submit"]')

            const isInvalidConfirmPasswordInput =
                await confirmPasswordInput.getAttribute('aria-invalid')

            expect(isInvalidConfirmPasswordInput).toBe('true')
        })

        test('Can update work role', async ({ page }) => {
            await page.goto('/profile')
            await page.getByLabel('Arbetsroll').click()
            await page.getByLabel('Admin').click()
            await page.click('button[type="submit"]')

            await expect(page.getByLabel('Arbetsroll')).toHaveText('Admin')
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
            const user = await loggedInUser({ page, request, context })
            const dataset = await createDataset('test title')
            await createEvent(dataset.id, user.id)
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
    test.describe('someone else has a linked dataset', () => {
        test.beforeEach(async ({ page, request, context }) => {
            await loggedInUser({ page, request, context })
            const user = await createByUserName('tester New user')
            const dataset = await createDataset('test title')
            await createEvent(dataset.id, user.id)
        })

        test('has dataset', async ({ page, request, context }) => {
            const name = 'tester New user'
            await page.goto(`/profile/${name}`)
            await expect(page.getByRole('heading', { level: 1 })).toHaveText(
                name
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
                page.getByText(
                    'Du har inga dataset ännu, när du är dataägare dyker det upp här.'
                )
            ).toBeVisible()
        })
    })
    test.describe('someone else does not have dataset', () => {
        test.beforeEach(async ({ page, request, context }) => {
            await loggedInUser({ page, request, context })
            await createByUserName('tester New user')
        })

        test('does not have dataset', async ({ page, request, context }) => {
            const name = 'tester New user'
            await page.goto(`/profile/${name}`)
            await expect(page.getByRole('heading', { level: 1 })).toHaveText(
                name
            )
            await expect(
                page.getByText(
                    `${name} har inga dataset ännu, när ${name} är dataägare dyker det upp här.`
                )
            ).toBeVisible()
        })
    })
})
