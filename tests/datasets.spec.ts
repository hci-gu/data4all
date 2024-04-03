import test, { expect } from '@playwright/test'
import { createDataset, loggedInUser } from './setup/utils'

test.describe('Datasets page', () => {
    test.describe('Logged in user', () => {
        test.beforeEach(async ({ page, request, context }) => {
            await loggedInUser({ page, request, context })
        })

        test('Can reach the datasets page', async ({ page }) => {
            const dataset = await createDataset('test title')
            await page.goto(`/dataset/${dataset.title}`)
            await expect(page.getByRole('heading', { level: 1 })).toHaveText(
                dataset.title
            )
        })
        test('Gets a 404 page when going to a non existent dataset', async ({
            page,
        }) => {
            await page.goto(`/dataset/not-existed-dataset`)
            await expect(page.getByRole('paragraph')).toHaveText(
                'Misslyckades att hämta dataset'
            )
        })
    })

    test.describe('Not logged in user', () => {
        test('Can not reach the datasets page and gets redirected to the login page', async ({
            page,
        }) => {
            const dataset = await createDataset('test title')
            await page.goto(`/dataset/${dataset.title}`)

            await expect(page).toHaveURL(`/logga-in`)
        })
        test('Can not react a non existent dataset page and gets redirected to the login page', async ({
            page,
        }) => {
            await page.goto(`/dataset/not-existed-dataset`)

            await expect(page).toHaveURL(`/logga-in`)
        })
    })
})
