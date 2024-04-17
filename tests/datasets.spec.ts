import test, { expect } from '@playwright/test'
import {
    createByUserName,
    createDataset,
    createDatasetWithRelation,
    loggedInUser,
} from './setup/utils'

const searchTerms = [
    'dataset test title 1',
    'dataset test title 2',
    'dataset test title related 3',
]

const userNames = ['tester user 1', 'tester user 2', 'tester user 3']

test.describe.configure({ mode: 'serial' })

test.beforeAll(async () => {
    const dataset1 = await createDataset(searchTerms[0])
    const dataset2 = await createDataset(searchTerms[1])
    await createDatasetWithRelation(searchTerms[2], [dataset1, dataset2])

    await createByUserName(userNames[0])
    await createByUserName(userNames[1])
    await createByUserName(userNames[2])
})

test.describe('Datasets page', () => {
    test.describe('Logged in user', () => {
        test.beforeEach(async ({ page, request, context }) => {
            await loggedInUser({ page, request, context })
        })

        test('Can reach the datasets page', async ({ page }) => {
            await page.goto(`/dataset/${searchTerms[0]}`)
            await expect(page.getByRole('heading', { level: 1 })).toHaveText(
                searchTerms[0]
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
            await page.goto(`/dataset/${searchTerms[2]}`)
            await page.click(`text=${searchTerms[0]}`)
            await expect(page.getByRole('heading', { level: 1 })).toHaveText(
                searchTerms[0]
            )

            await page.goBack()
            await page.click(`text=${searchTerms[1]}`)
            await expect(page.getByRole('heading', { level: 1 })).toHaveText(
                searchTerms[1]
            )
        })
        test('Can not see related datasets', async ({ page }) => {
            await page.goto(`/dataset/${searchTerms[0]}`)
            await expect(
                page.getByText('Det finns inga relaterade dataset')
            ).toBeVisible()
        })
        test('can suggested another user', async ({ page }) => {
            await page.goto(`/dataset/${searchTerms[0]}`)
            await page.click('text= Föreslå dataägare')
            await page.fill('input[name="dataset"]', userNames[0])

            await page.getByRole('button', { name: userNames[0] }).click()
            await page.getByRole('button', { name: 'Godkänn' }).click()
            await expect(
                page.getByText('ttester föreslog tester user')
            ).toBeVisible()
        })
        test('can suggested themselves', async ({ page }) => {
            await page.goto(`/dataset/${searchTerms[0]}`)
            await page.click('text= Föreslå dataägare')
            await page.fill('input[name="dataset"]', 'tester')

            await page.getByRole('button', { name: 't tester User' }).first().click()
            await page.getByRole('button', { name: 'Godkänn' }).click()
            await expect(
                page.getByText('tester föreslog sig själv som')
            ).toBeVisible()
        })
        test('can suggested non-existent user', async ({ page }) => {
            await page.goto(`/dataset/${searchTerms[0]}`)
            await page.click('text= Föreslå dataägare')
            await page.fill('input[name="dataset"]', 'non-existent user')

            await expect(
                page.getByText('Inga användare hittades')
            ).toBeVisible()
        })
    })

    test.describe('Not logged in user', () => {
        test('Can not reach the datasets page and gets redirected to the login page', async ({
            page,
        }) => {
            // const dataset = await createDataset('test title')
            await page.goto(`/dataset/${searchTerms[0]}`)

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
