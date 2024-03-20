import { env } from '@/lib/env'
import { signUpSchema, signInSchema, updateUserSchema } from '@/types/zod'
import PocketBase from 'pocketbase'
export const pb = new PocketBase(env.NEXT_PUBLIC_POCKETBASE)

const baseURL = 'http://localhost:3000'

const apiUrl = (endpoint: string) => `${baseURL}/api/${endpoint}`

const handleResponse = async (Response: Response): Promise<any> => {
    const json = await Response.json()

    if (!Response.ok) {
        throw new Error(json.message)
    }

    return json.body
}
const apiRequest = async (
    url: string,
    method: string,
    body?: any
): Promise<any> => {
    try {
        const options: RequestInit = {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: body ? JSON.stringify(body) : undefined,
        }

        const response = await fetch(url, options)
        return handleResponse(response)
    } catch (e) {
        throw e
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
    return apiRequest(apiUrl('auth/removeAccount'), 'DELETE', {
        id: userId,
    })
}

// this function is only for testing against the moc data in pocketbase and should not be used in prod
export const getAllDatasets = async () => {
    return apiRequest(apiUrl('datasets'), 'GET')
}
export const getDataset = async (datasetTitle: string) => {
    return apiRequest(
        apiUrl(`datasets?datasetTitle=${encodeURI(datasetTitle)}`),
        'GET'
    )
}
export const getEvent = async (datasetId: string) => {
    return apiRequest(apiUrl(`datasets/events?id=${datasetId}`), 'GET')
}
export const getDatasetFromUserEvent = async (userId: string) => {
    return apiRequest(apiUrl(`datasets?userId=${userId}`), 'GET')
}
