import {
    datasetSchema,
    siginUpSchema,
    signInSchema,
    updateUserSchema,
} from '@/types/zod'
import PocketBase from 'pocketbase'
export const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE)

const apiUrl = (endpoint: string) => `/api/${endpoint}`
const handleResponse = async (
    Response: Response
): Promise<boolean | Object> => {
    const json = await Response.json()
    const body = datasetSchema.safeParse(json.body)
    console.log('req good:', Response.ok, body)
    if (Response.ok) {
        if (body.success) {
            return body.data
        }
        return true
    }
    return false
}
const apiRequest = async (
    url: string,
    method: string,
    body?: any
): Promise<boolean | Object> => {
    const options: RequestInit = {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : undefined,
    }

    const response = await fetch(url, options)
    return await handleResponse(response)
}

export const signUp = async (
    user: siginUpSchema
): Promise<boolean | Object> => {
    return await apiRequest(apiUrl('auth/sign-up'), 'POST', user)
}

export const signIn = async (user: signInSchema): Promise<boolean | Object> => {
    return await apiRequest(apiUrl('auth/sign-in'), 'POST', user)
}

export const signOut = async (): Promise<boolean | Object> => {
    return await apiRequest(apiUrl('auth/sign-out'), 'DELETE')
}

export const updateUser = async (
    formData: updateUserSchema,
    userId: string
): Promise<boolean | Object> => {
    return await apiRequest(apiUrl('auth/updateAccount'), 'PUT', {
        id: userId,
        formData,
    })
}

export const removeUser = async (userId: string): Promise<boolean | Object> => {
    return await apiRequest(apiUrl('removeAccount'), 'DELETE', { id: userId })
}

export const getAllDatasets = async () => {
    return await apiRequest(apiUrl('datasets'), 'GET')
}
