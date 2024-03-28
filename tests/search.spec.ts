import test, { expect } from '@playwright/test'
import { createDataset, loggedInUser } from './setup/utils'

const searchTerms = [
    'unique test title -1',
    'unique test title -2',
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
        await loggedInUser({ page, request, context })
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
        await expect(page.getByText(searchTerms[0])).toHaveCount(0)
        await expect(page.getByText(searchTerms[1])).toHaveCount(0)
        await expect(page.getByText(searchTerms[2])).toHaveCount(0)
    })

    test('finds multiple matches when search matches multiple', async ({
        page,
    }) => {
        await page.goto('/')

        await page.fill('input[name="searchTerm"]', 'unique test title')

        await page.click('button[type="submit"]')

        await expect(page).toHaveURL(`/sok?searchTerm=unique test title`)
        await expect(page.getByText('unique test title')).toHaveCount(2)
    })

    test('Only returns the one dataset that matches specific query', async ({
        page,
    }) => {
        await page.goto('/')

        await page.fill('input[name="searchTerm"]', searchTerms[2])

        await page.click('button[type="submit"]')

        await expect(page).toHaveURL(`/sok?searchTerm=${searchTerms[2]}`)
        await expect(page.getByText(searchTerms[2])).toHaveCount(1)
    })
})
