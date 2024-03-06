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
    }
    const authUser = await pb.collection('users').create(data)
    return authUser

    /* Todo: Fix 403 "Only admins can perform this action." */
    const userData = await pb
        .collection('User')
        .create({ Role: user.role, UserId: authUser.id })

    return userData
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
    console.log({userToken: pb.authStore.token});
    pb.authStore.clear()
}
