import { signIn } from '@/app/actions/auth'
import { getSlug } from '@/lib/utils'
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

export const createUser = async (role: string, is_admin: boolean) => {
    const email = `test.user_${uuid.generate()}@kungsbacka.se`
    const password = '123456789'
    const name = `tester user ${uuid.generate()}`
    const userData = {
        email,
        emailVisibility: true,
        password,
        passwordConfirm: password,
        role,
        name,
        slug: getSlug(name),
        is_admin,
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

export const createByUserName = async (name: string, role: roleSchema) => {
    const email = `test.user_${uuid.generate()}@kungsbacka.se`
    const password = '123456789'
    const user = await pb.collection<AuthorizedUserSchema>('users').create({
        email,
        emailVisibility: true,
        password,
        passwordConfirm: password,
        role: role.id,
        name,
        slug: getSlug(name),
    })
    return user
}

export const createDataset = async (
    titleValue: string,
    dataOwnerId?: string
) => {
    await pb.admins.authWithPassword('admin@email.com', 'password123')
    const title = titleValue
    const description = 'test description'
    const slug = getSlug(title)
    const dataset = await pb.collection<datasetSchema>('dataset').create({
        title,
        description,
        slug,
        dataowner: dataOwnerId,
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
    const slug = getSlug(title)
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
            content: [
                {
                    children: [
                        {
                            text: 'test',
                        },
                    ],
                    type: 'paragraph',
                },
            ],
            subject,
        },
        { expand: 'user,subject' }
    )

    return EventSchema.parse(responseEventCleanup(event))
}

export const createRole = async (roleName?: string) => {
    if (!roleName) {
        roleName = `tester role ${uuid.generate()}`
    }
    await pb.admins.authWithPassword('admin@email.com', 'password123')
    return await pb.collection<roleSchema>('roles').create({
        name: roleName,
    })
}

function parseCookie(cookieString: string): any {
    const [nameValue, ...attributes] = cookieString.split('; ')
    const [name, value] = nameValue.split('=')
    const cookie = {
        name,
        value: nameValue,
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
    role,
    is_admin = false,
}: {
    request: APIRequestContext
    context: BrowserContext
    role: roleSchema
    is_admin?: boolean
}) => {
    const user = await createUser(role.id, is_admin)
    await pb.collection('users').authWithPassword(user.email, user.password)
    await context.addCookies([parseCookie(pb.authStore.exportToCookie())])
    return user
}

function responseEventCleanup(res: any) {
    return {
        ...res,
        user: res?.expand?.user,
        subject: res?.expand?.subject,
    }
}
