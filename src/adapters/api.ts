import {
    datasetSchema,
    responseObject,
    siginUpSchema,
    signInSchema,
    updateUserSchema,
} from '@/types/zod'
import PocketBase from 'pocketbase'
export const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE)

const apiUrl = (endpoint: string) => `/api/${endpoint}`
const handleResponse = async (Response: Response): Promise<responseObject> => {
    const json = await Response.json()
    console.log('handleResponse: ', json)

    if (!Response.ok) {
        const responseObject: responseObject = {
            succses: false,
            error: json.message,
        }
        return responseObject
    }

    const body = datasetSchema.safeParse(json.body)
    if (body.successs) {
        const responseObject: responseObject = {
            succses: true,
            body: body.data,
        }
        return responseObject
    }
    const responseObject: responseObject = { succses: true }
    return responseObject
}
const apiRequest = async (
    url: string,
    method: string,
    body?: any
): Promise<responseObject> => {
    const options: RequestInit = {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : undefined,
    }

    const response = await fetch(url, options)
    return await handleResponse(response)
}

export const signUp = async (user: siginUpSchema): Promise<responseObject> => {
    return await apiRequest(apiUrl('auth/sign-up'), 'POST', user)
}

export const signIn = async (user: signInSchema): Promise<responseObject> => {
    return await apiRequest(apiUrl('auth/sign-in'), 'POST', user)
}

export const signOut = async (): Promise<responseObject> => {
    return await apiRequest(apiUrl('auth/sign-out'), 'DELETE')
}

export const updateUser = async (
    formData: updateUserSchema,
    userId: string
): Promise<responseObject> => {
    return await apiRequest(apiUrl('auth/updateAccount'), 'PUT', {
        id: userId,
        formData,
    })
}

export const removeUser = async (userId: string): Promise<responseObject> => {
    return await apiRequest(apiUrl('removeAccount'), 'DELETE', { id: userId })
}

// this function is only for testing against the moc data in pocketbase and should not be used in prod
export const getAllDatasets = async () => {
    return await apiRequest(apiUrl('datasets'), 'GET')
}
