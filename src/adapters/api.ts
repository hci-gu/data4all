import { env } from '@/lib/env'
import { FeedFilter } from '@/types/constants'
import {
    signUpSchema,
    signInSchema,
    updateUserSchema,
    EventSchema,
    datasetSchema,
    datasetWithRelationsSchema,
    AuthorizedUserSchema,
    EventCreateSchema,
    EventFeedResponse,
} from '@/types/zod'
import PocketBase from 'pocketbase'
export const pb = new PocketBase(env.NEXT_PUBLIC_POCKETBASE)
pb.autoCancellation(false)

const baseURL = env.NEXT_PUBLIC_API

const apiUrl = (endpoint: string) => `${baseURL}/api/${endpoint}`
const handleResponse = async (Response: Response) => {
    const json = await Response.json()

    if (!Response.ok) {
        throw new Error(json.message)
    }

    return json.body
}
const apiRequest = async (
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    authCookie?: string,
    body?: any
) => {
    try {
        const options: RequestInit = {
            method,
            headers: {
                'Content-Type': 'application/json',
                auth: `${authCookie}`,
            },
            cache: 'no-store',
            body: body ? JSON.stringify(body) : undefined,
        }

        const response = await fetch(url, options)
        return handleResponse(response)
    } catch (error) {
        throw new Error('Something went wrong')
    }
}

export const signUp = async (user: signUpSchema): Promise<void> =>
    apiRequest(apiUrl('auth/sign-up'), 'POST', undefined, user)

export const signIn = async (user: signInSchema) =>
    AuthorizedUserSchema.parse(
        await apiRequest(apiUrl('auth/sign-in'), 'POST', undefined, user)
    )

export const signOut = async (): Promise<void> =>
    apiRequest(apiUrl('auth/sign-out'), 'DELETE')

export const updateUser = async (
    formData: updateUserSchema,
    userId: string,
    authCookie: string
) =>
    AuthorizedUserSchema.parse(
        await apiRequest(apiUrl('auth/updateAccount'), 'PUT', authCookie, {
            id: userId,
            formData,
        })
    )

export const removeUser = async (
    userId: string,
    authCookie: string
): Promise<void> => {
    apiRequest(apiUrl('auth/removeAccount'), 'DELETE', authCookie, {
        id: userId,
    })
}

export const getUsers = async (
    userName: string,
    authCookie: string
): Promise<AuthorizedUserSchema[]> => {
    return await apiRequest(apiUrl(`auth?name=${userName}`), 'GET', authCookie)
}
export const getUser = async (
    userName: string,
    authCookie: string
): Promise<AuthorizedUserSchema> => {
    return await apiRequest(apiUrl(`auth/${userName}`), 'GET', authCookie)
}

// this function is only for testing against the moc data in pocketbase and should not be used in prod
export const getAllDatasets = async () => {
    return datasetSchema
        .array()
        .parse(await apiRequest(apiUrl('datasets'), 'GET'))
}
export const getDatasets = async (datasetTitle: string, authCookie: string) => {
    const datasets = await apiRequest(
        apiUrl(`datasets?title=${datasetTitle}`),
        'GET',
        authCookie
    )

    let cleanDatasets = []
    for (let i = 0; datasets.length > i; i++) {
        const cleanDataset = responseDatasetCleanup(datasets[i])
        cleanDatasets.push(cleanDataset)
    }

    return datasetWithRelationsSchema.array().parse(cleanDatasets)
}
export const getDataset = async (datasetTitle: string, authCookie: string) => {
    const dataset = await apiRequest(
        apiUrl(`datasets/${encodeURI(datasetTitle)}`),
        'GET',
        authCookie
    )

    const cleanDataset = responseDatasetCleanup(dataset)

    return datasetWithRelationsSchema.parse(cleanDataset)
}
export const getEvents = async (datasetId: string, authCookie: string) => {
    const events = (await apiRequest(
        apiUrl(`events/${datasetId}`),
        'GET',
        authCookie
    )) as []
    const cleanEvent = events.map(responseEventCleanup)

    return EventSchema.array().parse(cleanEvent)
}
export const createEvent = async (
    event: EventCreateSchema,
    authCookie: string
) => {
    const cleanEvent = responseEventCleanup(
        await apiRequest(apiUrl(`events`), 'POST', authCookie, event)
    )
    return EventSchema.parse(cleanEvent)
}
export const getDatasetFromUser = async (
    userId: string,
    authCookie: string
) => {
    const datasets = await apiRequest(
        apiUrl(`datasets/user/${userId}`),
        'GET',
        authCookie
    )

    const cleanDatasets = datasets.map(responseDatasetCleanup)

    return datasetWithRelationsSchema.array().parse(cleanDatasets)
}

export const getFeed = async (
    authCookie: string,
    filter: FeedFilter,
    pageNumber: number
) => {
    const events = (await apiRequest(
        apiUrl(`events/feed?filter=${filter}&pageNumber=${pageNumber}`),
        'GET',
        authCookie
    )) as []

    const clean = responseFeedCleanup(events)
    console.log(clean)

    return EventFeedResponse.parse(clean)
}

function responseDatasetCleanup(res: any) {
    const cleanDataset = {
        ...res,
        relatedDatasets: res?.expand?.related_datasets ?? [],
        tags: res?.expand?.tag ?? [],
    }
    return cleanDataset
}
function responseEventCleanup(res: any): EventSchema {
    return {
        ...res,
        user: res?.expand?.user,
        subject: res?.expand?.subject,
    }
}
function responseFeedEventCleanup(res: any) {
    return {
        id: res?.id,
        userName: res?.expand?.user.name,
        subject: res?.subject,
        datasetTitle: res?.expand?.dataset.title,
        content: res?.content,
        created: res?.created,
        types: res?.types,
    }
}

function responseFeedCleanup(res: any) {
    return {
        page: res?.page,
        perPage: res?.perPage,
        totalPages: res?.totalPages,
        totalItems: res?.totalItems,
        items: res.items?.map((item: any) => {
            return responseFeedEventCleanup(item)
        }),
    }
}
