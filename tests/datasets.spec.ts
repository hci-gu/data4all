import test, { expect } from '@playwright/test'
import {
    createByUserName,
    createDataset,
    createDatasetWithRelation,
    createRole,
    loggedInUser,
} from './setup/utils'
import uuid from 'short-uuid'

const searchTerms = [
    'dataset test title 1',
    'dataset test title 2',
    'dataset test title related 3',
]

const usernames = [
    `tester user ${uuid.generate()}`,
    `tester user ${uuid.generate()}`,
    `tester user ${uuid.generate()}`,
]

let signedInUser: string

test.describe.configure({ mode: 'serial' })

test.beforeAll(async () => {
    const dataset1 = await createDataset(searchTerms[0])
    const dataset2 = await createDataset(searchTerms[1])
    await createDatasetWithRelation(searchTerms[2], [dataset1, dataset2])

    const role = await createRole()

    await createByUserName(usernames[0], role)
    await createByUserName(usernames[1], role)
    await createByUserName(usernames[2], role)
})

test.describe('Datasets page', () => {
    test.describe('Logged in user', () => {
        test.beforeEach(async ({ request, context }) => {
            const role = await createRole()
            signedInUser = (await loggedInUser({ request, context, role })).name
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
                'Det blev något fel på vår sida. Försök igen senare eller prova ladda om sidan.'
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

        test.describe('Suggest data owner', () => {
            test('Can suggest another user', async ({ page }) => {
                await page.goto(`/dataset/${searchTerms[0]}`)
                await page.click('text= Föreslå dataägare')
                await page.fill('input[name="dataset"]', usernames[0])
                await page.getByRole('button', { name: usernames[0] }).click()
                await page.getByRole('button', { name: 'Godkänn' }).click()
                await page.reload()
                await expect(page.getByText('som dataägare')).toBeVisible()
            })
            test('Can suggest themselves', async ({ page }) => {
                await page.goto(`/dataset/${searchTerms[0]}`)
                await page.click('text= Föreslå dataägare')
                await page.fill('input[name="dataset"]', signedInUser)

                await page
                    .getByRole('button', { name: signedInUser })
                    .first()
                    .click()
                await page.getByRole('button', { name: 'Godkänn' }).click()
                await expect(
                    page.getByText(`${signedInUser} föreslog sig själv som`)
                ).toBeVisible()
            })
            test('Get empty state if there is no matching user', async ({
                page,
            }) => {
                await page.goto(`/dataset/${searchTerms[0]}`)
                await page.click('text= Föreslå dataägare')
                await page.fill('input[name="dataset"]', 'non-existent user')

                await expect(
                    page.getByText('Inga användare hittades')
                ).toBeVisible()
            })
            test('Can reject a suggestion', async ({ page }) => {
                await page.goto(`/dataset/${searchTerms[0]}`)
                await page.click('text= Föreslå dataägare')
                await page.fill('input[name="dataset"]', signedInUser)

                await page
                    .getByRole('button', { name: signedInUser })
                    .first()
                    .click()
                await page.getByRole('button', { name: 'Godkänn' }).click()

                await expect(
                    page
                        .getByText(
                            `${signedInUser} föreslog sig själv som dataägare`
                        )
                        .getByRole('button', { name: 'Avböj' })
                ).toBeHidden()
            })
            test('Can accept a suggestion', async ({ page }) => {
                await page.goto(`/dataset/${searchTerms[0]}`)
                await page.click('text= Föreslå dataägare')
                await page.fill('input[name="dataset"]', signedInUser)

                await page
                    .getByRole('button', { name: signedInUser })
                    .first()
                    .click()
                await page.getByRole('button', { name: 'Godkänn' }).click()

                await expect(
                    page
                        .getByText(
                            `${signedInUser} föreslog sig själv som dataägareGodkä`
                        )
                        .getByRole('button', { name: 'Godkänn' })
                ).toBeHidden()
            })
        })
    })

    test.describe('Logged in user with admin role', () => {
        test.beforeEach(async ({ request, context }) => {
            const role = await createRole()
            signedInUser = (
                await loggedInUser({ request, context, role, is_admin: true })
            ).name
        })

        test.describe('Suggest data owner', () => {
            test('Can reject a suggestion', async ({ page }) => {
                await page.goto(`/dataset/${searchTerms[0]}`)
                await page.click('text= Föreslå dataägare')
                await page.fill('input[name="dataset"]', signedInUser)

                await page
                    .getByRole('button', { name: signedInUser })
                    .first()
                    .click()
                await page.getByRole('button', { name: 'Godkänn' }).click()

                await page
                    .getByText(
                        `${signedInUser} föreslog sig själv som dataägareGodkä`
                    )
                    .getByRole('button', { name: 'Avböj' })
                    .click()

                await expect(page.getByText(`godkände inte`)).toBeVisible()
            })
            test('Can accept a suggestion', async ({ page }) => {
                await page.goto(`/dataset/${searchTerms[0]}`)
                await page.click('text= Föreslå dataägare')
                await page.fill('input[name="dataset"]', signedInUser)

                await page
                    .getByRole('button', { name: signedInUser })
                    .first()
                    .click()
                await page.getByRole('button', { name: 'Godkänn' }).click()

                await page
                    .getByText(
                        `${signedInUser} föreslog sig själv som dataägareGodkä`
                    )
                    .getByRole('button', { name: 'Godkänn' })
                    .click()

                await expect(page.getByText('godkände')).toBeVisible()
            })
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
