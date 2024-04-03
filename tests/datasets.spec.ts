import test, { expect } from '@playwright/test'
import {
    createDataset,
    createDatasetWithRelation,
    loggedInUser,
} from './setup/utils'

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

        test('Can see two attached related datasets', async ({ page }) => {
            const dataset1 = await createDataset('test title 1')
            const dataset2 = await createDataset('test title 2')
            const dataset = await createDatasetWithRelation('test title', [
                dataset1,
                dataset2,
            ])

            await page.goto(`/dataset/${dataset.title}`)
            await page.click(`text=${dataset1.title}`)
            await expect(page.getByRole('heading', { level: 1 })).toHaveText(
                dataset1.title
            )

            await page.goBack()
            await page.click(`text=${dataset2.title}`)
            await expect(page.getByRole('heading', { level: 1 })).toHaveText(
                dataset2.title
            )
        })
        test('Can not see related datasets', async ({ page }) => {
            const dataset = await createDataset('test title')

            await page.goto(`/dataset/${dataset.title}`)
            await expect(
                page.getByText('Det finns inga relaterade dataset')
            ).toBeVisible()
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
