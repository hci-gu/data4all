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

export const createDataset = async () => {
    const title = 'test title'
    const description = 'test description'
    const dataset = await pb.collection('mocDataset').create({
        title,
        description,
    })
    return { ...dataset, title, description }
}

export const createEvent = async (datasetId: string, userId: string) => {
    const type = 'comment'
    const event = await pb.collection('events').create({
        dataset: datasetId,
        types: 'comment',
        user: userId,
        content: 'test',
        subject: 'test',
    })
    return {
        ...event,
        datasetId,
        type,
        userId,
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
    const { email, password, id } = await createUser()
    const response = await request.post('/api/auth/sign-in', {
        data: { email: email, password: password },
        headers: { 'Content-Type': 'application/json' },
    })
    const headers = await response.headers()
    const setCookieHeader = headers['set-cookie']
    if (setCookieHeader) {
        await context.addCookies([parseCookie(setCookieHeader)])
    }
    return id
}
