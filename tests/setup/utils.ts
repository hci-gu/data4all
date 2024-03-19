import { APIRequestContext, BrowserContext, Page } from '@playwright/test'
import PocketBase from 'pocketbase'
import uuid from 'short-uuid'

const pb = new PocketBase('http://localhost:8090')

export const createUser = async () => {
    const email = `test.user_${uuid.generate()}@kungsbacka.se`
    const password = '123456789'
    const user = await pb.collection('users').create({
        email,
        password,
        passwordConfirm: password,
        role: 'User',
        name: 'tester',
    })
    return {
        ...user,
        email,
        password,
    }
}

function parseCookie(cookieString: string): any {
    const [nameValue, ...attributes] = cookieString.split('; ')
    const [name, value] = nameValue.split('=')
    const cookie = {
        name,
        value,
        domain: 'localhost',
        path: '/',
        expires: -1,
        httpOnly: false,
        secure: false,
        sameSite: 'Lax',
    }
    return cookie
}

export const loggedInUser = async ({
    page,
    request,
    context,
}: {
    page: Page
    request: APIRequestContext
    context: BrowserContext
}) => {
    const { email, password } = await createUser()
    const response = await request.post('/api/auth/sign-in', {
        data: { email: email, password: password },
        headers: { 'Content-Type': 'application/json' },
    })
    const headers = await response.headers()
    const setCookieHeader = headers['set-cookie']
    if (setCookieHeader) {
        await context.addCookies([parseCookie(setCookieHeader)])
    }
}
