import { test, expect } from '@playwright/test'
import { createRole, createUser } from './setup/utils'

test.describe('Signin page', () => {
    test.describe('Navigating', () => {
        test('can navigate to signIn page', async ({ page, context }) => {
            await page.goto('/logga-in')

            // Expects page to have a title of "Logga in".
            await expect(page.getByRole('heading', { level: 1 })).toHaveText(
                'Logga in'
            )
        })
    })

    test.describe('Logging in', () => {
        let email = '',
            password = ''

        test.beforeEach(async ({}) => {
            const role = await createRole()
            const user = await createUser(role.id, false)
            email = user.email
            password = user.password
        })

        test('Can log in', async ({ page, request, context }) => {
            await page.goto('/logga-in')

            // Enters email and password.
            await page.fill('input[name="email"]', email)
            await page.fill('input[name="password"]', password)

            // Clicks the submit button.
            await page.click('button[type="submit"]')

            // Expects to be redirected to /
            await expect(page).toHaveURL('/')
        })
    })
})
