import { siginUpSchema, signInSchema, updateUserSchema } from '@/types/zod'
import PocketBase from 'pocketbase'
export const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE)

const apiUrl = (endpoint: string) => `/api/auth/${endpoint}`
const handleResponse = async (Response: Response): Promise<boolean> => {
    if (Response.ok) {
        return true
    }
    return false
}
const apiRequest = async (
    url: string,
    method: string,
    body?: any
): Promise<boolean> => {
    const options: RequestInit = {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : undefined,
    }

    const response = await fetch(url, options)
    return await handleResponse(response)
}

export const signUp = async (user: siginUpSchema): Promise<boolean> => {
    return await apiRequest(apiUrl('sign-up'), 'POST', user)
}

export const signIn = async (user: signInSchema): Promise<boolean> => {
    return await apiRequest(apiUrl('sign-in'), 'POST', user)
}

export const signOut = async (): Promise<boolean> => {
    return await apiRequest(apiUrl('sign-out'), 'DELETE')
}

export const updateUser = async (
    formData: updateUserSchema,
    userId: string
): Promise<boolean> => {
    return await apiRequest(apiUrl('updateAccount'), 'PUT', {
        id: userId,
        formData,
    })
}

export const removeUser = async (userId: string): Promise<boolean> => {
    return await apiRequest(apiUrl('removeAccount'), 'DELETE', { id: userId })
}
