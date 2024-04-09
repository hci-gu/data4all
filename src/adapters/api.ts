import { env } from '@/lib/env'
import {
    signUpSchema,
    signInSchema,
    updateUserSchema,
    EventSchema,
    datasetSchema,
    datasetWithRelationsSchema,
} from '@/types/zod'
import PocketBase from 'pocketbase'
export const pb = new PocketBase(env.NEXT_PUBLIC_POCKETBASE)
pb.autoCancellation(false)

const baseURL = 'http://localhost:3000'

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
    body?: any
) => {
    try {
        const options: RequestInit = {
            method,
            headers: {
                'Content-Type': 'application/json',
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
    apiRequest(apiUrl('auth/sign-up'), 'POST', user)

export const signIn = async (user: signInSchema): Promise<void> =>
    apiRequest(apiUrl('auth/sign-in'), 'POST', user)

export const signOut = async (): Promise<void> =>
    apiRequest(apiUrl('auth/sign-out'), 'DELETE')

export const updateUser = async (
    formData: updateUserSchema,
    userId: string
): Promise<void> =>
    apiRequest(apiUrl('auth/updateAccount'), 'PUT', {
        id: userId,
        formData,
    })

export const removeUser = async (userId: string): Promise<void> => {
    apiRequest(apiUrl('auth/removeAccount'), 'DELETE', {
        id: userId,
    })
}

// this function is only for testing against the moc data in pocketbase and should not be used in prod
export const getAllDatasets = async () => {
    return datasetSchema
        .array()
        .parse(await apiRequest(apiUrl('datasets'), 'GET'))
}
export const getDatasets = async (datasetTitle: string) => {
    const datasets = await apiRequest(
        apiUrl(`datasets?title=${datasetTitle}`),
        'GET'
    )

    let cleanDatasets = []
    for (let i = 0; datasets.length > i; i++) {
        const cleanDataset = responseDatasetCleanup(datasets[i])
        cleanDatasets.push(cleanDataset)
    }

    return datasetWithRelationsSchema.array().parse(cleanDatasets)
}
export const getDataset = async (datasetTitle: string) => {
    const dataset = await apiRequest(
        apiUrl(`datasets/${encodeURI(datasetTitle)}`),
        'GET'
    )

    const cleanDataset = responseDatasetCleanup(dataset)

    return datasetWithRelationsSchema.parse(cleanDataset)
}
export const getEvents = async (datasetId: string) => {
    const events = await apiRequest(apiUrl(`events/${datasetId}`), 'GET')
    return EventSchema.array().parse(events.items)
}
export const createEvent = async (event: EventSchema) => {
    return EventSchema.parse(await apiRequest(apiUrl(`events`), 'POST', event))
}
export const getDatasetFromUser = async (userId: string) => {
    const datasets = await apiRequest(apiUrl(`datasets/user/${userId}`), 'GET')

    let cleanDatasets = []
    for (let i = 0; datasets.length > i; i++) {
        const cleanDataset = responseDatasetCleanup(datasets[i])
        cleanDatasets.push(cleanDataset)
    }

    return datasetWithRelationsSchema.array().parse(cleanDatasets)
}

function responseDatasetCleanup(res: any) {
    const cleanDataset = {
        id: res.id,
        title: res.title,
        description: res.description,
        slug: res.slug,
        relatedDatasets: res?.expand?.related_datasets ?? [],
        tags: res?.expand?.tag ?? [],
    }
    return cleanDataset
}
