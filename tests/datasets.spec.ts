import test, { expect } from '@playwright/test'
import { createDataset, createEvent, loggedInUser } from './setup/utils'

test.describe('Datasets page', () => {
    test.describe('Logged in user', () => {
        test.beforeEach(async ({ page, request, context }) => {
            await loggedInUser({ page, request, context })
        })

        test('Can reach the datasets page', async ({ page }) => {
            const dataset = await createDataset()
            await page.goto(`/dataset/${dataset.title}`)
            await expect(page.getByRole('heading', { level: 1 })).toHaveText(
                dataset.title
            )
        })
        test('Navigate to not existed dataset page', async ({ page }) => {
            await page.goto(`/dataset/not-existed-dataset`)
            await expect(page.getByRole('paragraph')).toHaveText(
                'Dataset hittades inte'
            )
        })
    })

    test.describe('Not logged in user', () => {
        test('Can not reach the datasets page and navigate to sign-in page', async ({ page }) => {
            const dataset = await createDataset()
            await page.goto(`/dataset/${dataset.title}`)

            await expect(page).toHaveURL(`/logga-in`)
        })
        test('Navigate to not existed dataset page and navigate to sign-in page', async ({ page }) => {
            await page.goto(`/dataset/not-existed-dataset`)
            
            await expect(page).toHaveURL(`/logga-in`)
        })
    })
})
