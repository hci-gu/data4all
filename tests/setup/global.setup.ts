import { test as setup } from '@playwright/test'
import { user } from './user'

setup('signUp', async ({ page, request }) => {
    /* SignUp page */
    await request.post('/api/auth/sign-up', {
        data: { ...user },
        headers: { 'Content-Type': 'application/json' },
    })

    /* SignIn page */
    await request.post('/api/auth/sign-in', {
        data: { email: user.email, password: user.password },
        headers: { 'Content-Type': 'application/json' },
    })

    request.storageState({ path: 'tests/setup/storage.json' })
})
