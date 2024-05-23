import test, { expect } from '@playwright/test'
import { createDataset, createRole, loggedInUser } from './setup/utils'

const searchTerms = [
    'search test title -1',
    'search test title -2',
    'testing to see if foxes can fly',
]

test.describe.configure({ mode: 'serial' })

test.beforeAll(async () => {
    await createDataset(searchTerms[0])
    await createDataset(searchTerms[1])
    await createDataset(searchTerms[2])
})

test.describe('Search page', () => {
    test.beforeEach(async ({ page, request, context }) => {
        const role = await createRole()
        await loggedInUser({ request, context, role })
    })

    test('Will get empty state when search has no matches', async ({
        page,
    }) => {
        await page.goto('/')

        await page.fill(
            'input[name="searchTerm"]',
            'Some search query that has no matches'
        )

        await page.click('button[type="submit"]')

        await expect(page).toHaveURL(
            '/sok?searchTerm=Some search query that has no matches'
        )
        await expect(
            page.getByText('Hittade inga resultat').first()
        ).toHaveCount(1)
    })

    test('finds multiple matches when search matches multiple', async ({
        page,
    }) => {
        await page.goto('/')

        await page.fill('input[name="searchTerm"]', 'search test title')

        await page.click('button[type="submit"]')

        await expect(page).toHaveURL(`/sok?searchTerm=search test title`)
        await expect(
            page
                .getByRole('heading', { level: 3 })
                .getByText('search test title')
        ).toHaveCount(2)
    })

    test('Only returns the one dataset that matches specific query', async ({
        page,
    }) => {
        await page.goto('/')

        await page.fill('input[name="searchTerm"]', searchTerms[2])

        await page.click('button[type="submit"]')

        await expect(page).toHaveURL(`/sok?searchTerm=${searchTerms[2]}`)
        await expect(
            page.getByRole('heading', { level: 3 }).getByText(searchTerms[2])
        ).toHaveCount(1)
    })
})
