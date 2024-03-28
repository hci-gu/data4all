import test, { expect } from '@playwright/test'
import { createDataset, loggedInUser } from './setup/utils'

const searchTerms = [
    'test dataset for climate change',
    'legend mm is a test title',
    'testing to see if foxes can fly',
]

test.describe('search page', () => {
    test.beforeEach(async ({ page, request, context }) => {
        await loggedInUser({ page, request, context })
        await createDataset(searchTerms[0])
        await createDataset(searchTerms[1])
        await createDataset(searchTerms[2])
    })

    test.describe('can not find existing dataset', () => {
        test('find existing dataset', async ({ page }) => {
            await page.goto('/')

            await page.fill('input[name="searchTerm"]', 'Stock prices')

            await page.click('button[type="submit"]')

            await expect(page).toHaveURL('/sok?searchTerm=Stock prices')
            await expect(page.getByText(searchTerms[0])).toHaveCount(0)
            await expect(page.getByText(searchTerms[1])).toHaveCount(0)
            await expect(page.getByText(searchTerms[2])).toHaveCount(0)
        })
    })

    test.describe('can find existing dataset', () => {
        test.beforeEach(async ({ page, request, context }) => {})
        test('find existing dataset', async ({ page }) => {
            await page.goto('/')

            await page.fill('input[name="searchTerm"]', searchTerms[0])

            await page.click('button[type="submit"]')

            await expect(page).toHaveURL(`/sok?searchTerm=${searchTerms[0]}`)
            await expect(page.getByText(searchTerms[0])).toBeVisible()

            await expect(page.getByText(searchTerms[1])).toHaveCount(0)
            await expect(page.getByText(searchTerms[2])).toHaveCount(0)
        })
    })
})
