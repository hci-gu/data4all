import { stringWithHyphen } from '@/lib/utils'
import {
    AuthorizedUserSchema,
    EventCreateSchema,
    EventSchema,
    datasetSchema,
    datasetWithRelationsSchema,
    roleSchema,
    tagSchema,
} from '@/types/zod'
import { APIRequestContext, BrowserContext, Page } from '@playwright/test'
import PocketBase from 'pocketbase'
import uuid from 'short-uuid'

const pb = new PocketBase('http://localhost:8090')

export const createUser = async (userRole?: roleSchema) => {
    const email = `test.user_${uuid.generate()}@kungsbacka.se`
    const password = '123456789'
    const name = `tester user ${uuid.generate()}`
    const userData = {
        email,
        emailVisibility: true,
        password,
        passwordConfirm: password,
        role: userRole ?? 'Jurist',
        name,
        slug: stringWithHyphen(name),
    }
    const user = await pb
        .collection<AuthorizedUserSchema>('users')
        .create(userData)
    return {
        ...user,
        email,
        password,
    }
}

export const createByUserName = async (name: string) => {
    const email = `test.user_${uuid.generate()}@kungsbacka.se`
    const password = '123456789'
    const user = await pb.collection<AuthorizedUserSchema>('users').create({
        email,
        emailVisibility: true,
        password,
        passwordConfirm: password,
        role: 'Jurist',
        name,
        slug: stringWithHyphen(name),
    })
    return user
}

export const createDataset = async (titleValue: string) => {
    await pb.admins.authWithPassword('admin@email.com', 'password123')
    const title = titleValue
    const description = 'test description'
    const slug = stringWithHyphen(title)
    const dataset = await pb.collection<datasetSchema>('dataset').create({
        title,
        description,
        slug,
    })
    return { ...dataset, title, description }
}
export const createDatasetWithRelation = async (
    titleValue: string,
    releatedDataset: datasetSchema[] = [],
    releatedTag: tagSchema[] = []
) => {
    await pb.admins.authWithPassword('admin@email.com', 'password123')
    const title = titleValue
    const description = 'test description'
    const slug = stringWithHyphen(title)
    const related_datasets = releatedDataset?.map((dataset) => dataset.id) ?? []
    const tag = releatedTag?.map((tag) => tag.id) ?? []

    const dataset = await pb
        .collection<datasetWithRelationsSchema>('dataset')
        .create({
            title,
            description,
            slug,
            related_datasets,
            tag,
        })
    return { ...dataset, title, description }
}
export const createEvent = async (
    datasetId: string,
    userId: string,
    subject?: string
) => {
    const event = await pb.collection<EventCreateSchema>('events').create(
        {
            dataset: datasetId,
            types: 'comment',
            user: userId,
            content: 'test',
            subject,
        },
        { expand: 'user,subject' }
    )

    return EventSchema.parse(responseEventCleanup(event))
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
    request,
    context,
    userRole = 'Jurist',
}: {
    request: APIRequestContext
    context: BrowserContext
    userRole?: roleSchema
}) => {
    const user = await createUser(userRole)
    const response = await request.post('/api/auth/sign-in', {
        data: { email: user.email, password: user.password },
        headers: { 'Content-Type': 'application/json' },
    })
    const headers = await response.headers()
    const setCookieHeader = headers['set-cookie']
    if (setCookieHeader) {
        await context.addCookies([parseCookie(setCookieHeader)])
    }
    return user
}

function responseEventCleanup(res: any) {
    return {
        ...res,
        user: res?.expand?.user,
        subject: res?.expand?.subject,
    }
}
