import { roleSchema, siginUpSchema, signInSchema } from '@/types/zod'
import PocketBase from 'pocketbase'
const pb = new PocketBase('http://127.0.0.1:8090')

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
    return authUser
}

export const signIn = async (user: signInSchema) => {
    const authUser = await pb
        .collection('users')
        .authWithPassword(user.email, user.password)
    return authUser
}

export const signOut = async () => {
    if (pb.authStore.token === '') {
        return
    }
    console.log({ userToken: pb.authStore.token })
    pb.authStore.clear()
}
