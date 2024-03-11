import { siginUpSchema, signInSchema } from '@/types/zod'
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
}

export const signOut = async () => {
    if (pb.authStore.token === '') {
        return
    }
    console.log({ userToken: pb.authStore.token })
    pb.authStore.clear()
}
