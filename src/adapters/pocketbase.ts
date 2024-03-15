import { siginUpSchema, signInSchema, updateUserSchema } from '@/types/zod'
import PocketBase from 'pocketbase'
export const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE)

export const signUp = async (user: siginUpSchema) => {
    const response = await fetch('/api/auth/sign-up', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: user.email,
            password: user.password,
            passwordConfirmation: user.passwordConfirmation,
            role: user.role,
        }),
    })
    if (response.status === 200) {
        return true
    }
    return false
}

export const signIn = async (user: signInSchema) => {
    const response = await fetch('/api/auth/sign-in', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: user.email,
            password: user.password,
        }),
    })
    if (response.status === 200) {
        return true
    }
    return false
}

export const updateUser = async (
    formData: updateUserSchema,
    userId: string
) => {
    const response = await fetch('/api/auth/updateAccount', {
        method: 'PUT',
        body: JSON.stringify({
            id: userId,
            formData: {
                name: formData?.name,
                email: formData?.email,
                oldPassword: formData?.oldPassword,
                password: formData?.password,
                passwordConfirm: formData?.passwordConfirm,
                role: formData?.role,
            },
        }),
    })
    if (response.status === 200) {
        return true
    }
    return false
}

export const signOut = async () => {
    const response = await fetch('/api/auth/sign-out', {
        method: 'DELETE',
    })

    if (response.status === 200) {
        pb.authStore.clear()
        return true
    }
    return false
}

export const removeUser = async (userId: string) => {
    const response = await fetch('/api/auth/removeAccount', {
        method: 'DELETE',
        body: JSON.stringify({
            id: userId,
        }),
    })

    if (response.status === 200) {
        pb.authStore.clear()
        return true
    }
    return false
}
