import { siginUpSchema, signInSchema, updateUserSchema } from '@/types/zod'
import PocketBase from 'pocketbase'
export const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE)

export const signUp = async (user: siginUpSchema) => {
    const data = {
        email: user.email,
        emailVisibility: true,
        password: user.password,
        passwordConfirm: user.passwordConfirmation,
        name: user.email,
        role: user.role,
    }
    const authUser = await pb.collection('users').create(data)
    pb.collection('users').requestVerification(user.email)
}

export const signIn = async (user: signInSchema) => {
    const authUser = await pb
        .collection('users')
        .authWithPassword(user.email, user.password)
    const cookieString = pb.authStore.exportToCookie()
    // cookies().set('auth', cookieString)
    console.log(authUser)
}

export const updateUser = async (
    formData: updateUserSchema,
    userId: string
) => {
    const data = {
        name: formData?.name,
        email: formData?.email,
        oldPassword: formData?.oldPassword,
        password: formData?.password,
        passwordConfirm: formData?.passwordConfirm,
        role: formData?.role,
    }
    try {
        await pb.collection('users').update(userId, data)
    } catch (error) {
        console.log(error)
    }
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
