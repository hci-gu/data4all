import test, { expect } from '@playwright/test'
import { createDataset, loggedInUser } from './setup/utils'

test.describe('search page', () => {
    test.beforeEach(async ({ page, request, context }) => {
        await loggedInUser({ page, request, context })
    })

    test.describe('can not find existing dataset', () => {
        test('find existing dataset', async ({ page }) => {
            await page.goto('/')

            await page.fill('input[name="searchTerm"]', 'tests titles')

            await page.click('button[type="submit"]')

            await expect(page).toHaveURL('/sok?searchTerm=tests%20titles')
            await expect(page.getByText('test title')).toHaveCount(0)
        })
    })

    test.describe('can find existing dataset', () => {
        test.beforeEach(async ({ page, request, context }) => {
            await createDataset()
        })
        test('find existing dataset', async ({ page }) => {
            await page.goto('/')

            await page.fill('input[name="searchTerm"]', 'test')

            await page.click('button[type="submit"]')

            await expect(page).toHaveURL('/sok?searchTerm=test')
            await expect(page.getByText('test title')).toBeVisible()
        })
    })
})
