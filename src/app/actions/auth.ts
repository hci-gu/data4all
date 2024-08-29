'use server'

import {
    AuthorizedUserSchema,
    roleSchema,
    signInSchema,
    signUpSchema,
    updateUserSchema,
} from '@/types/zod'
import { getPocketBase } from './pocketbase'
import { cookies } from 'next/headers'
import { getSlug } from '@/lib/utils'
import { revalidatePath } from 'next/cache'

export const signOut = async () => {
    cookies().delete('pb_auth')
}

export const signIn = async (credentials: signInSchema) => {
    const pb = await getPocketBase()

    const response = await pb
        .collection('users')
        .authWithPassword(credentials.email, credentials.password)
    cookies().set('pb_auth', pb.authStore.exportToCookie())

    return AuthorizedUserSchema.parse(response.record)
}

export const signUp = async (newUser: signUpSchema) => {
    const pb = await getPocketBase()

    const role = await pb
        .collection('roles')
        .getFirstListItem(`name="${newUser.role}"`)

    const data = {
        email: newUser.email,
        emailVisibility: true,
        password: newUser.password,
        passwordConfirm: newUser.passwordConfirmation,
        name: newUser.name,
        role: role.id,
        slug: getSlug(newUser.name),
    }
    await pb.collection('users').create(data)
}

export const updateUser = async (
    userId: string,
    formData: updateUserSchema
) => {
    const pb = await getPocketBase()

    const newRole = await pb.collection('roles').getOne(formData.role ?? '')

    const record = await pb.collection('users').update(userId, {
        ...formData,
        role: newRole.id,
        slug: getSlug(formData.name),
    })

    const token = pb.authStore.token

    pb.authStore.save(token, record)
    const authCookie = pb.authStore.exportToCookie()
    cookies().set('pb_auth', authCookie)

    revalidatePath('/profile')

    return AuthorizedUserSchema.parse(record)
}

export const deleteAccount = async () => {
    const pb = await getPocketBase()
    await pb.collection('users').delete(pb.authStore.model?.id)
    cookies().delete('pb_auth')
}

export const getLoggedInUser = async () => {
    const pb = await getPocketBase()
    return AuthorizedUserSchema.parse(pb.authStore.model)
}

export const getUsers = async (searchTerm?: string) => {
    const pb = await getPocketBase()

    let records = []
    if (searchTerm) {
        records = (
            await pb.collection('users').getList(1, 25, {
                sort: '-created',
                filter: `name ~ "${decodeURI(searchTerm)}"`,
                expand: 'role',
            })
        ).items
    } else {
        records = await pb.collection('users').getFullList({
            sort: '-created',
            expand: 'role',
        })
    }

    const cleanUsers = records.map((user: any) => {
        return {
            avatar: user.avatar,
            collectionId: user.collectionId,
            collectionName: user.collectionName,
            created: user.created,
            email: user.email,
            emailVisibility: user.emailVisibility,
            id: user.id,
            name: user.name,
            role: user.expand?.role.name,
            updated: user.updated,
            username: user.username,
            verified: user.verified,
            slug: user.slug,
        }
    })

    return AuthorizedUserSchema.array().parse(cleanUsers)
}

export const getUser = async (username: string) => {
    const pb = await getPocketBase()

    try {
        const record = await pb
            .collection('users')
            .getFirstListItem(`slug="${getSlug(username)}"`)

        return AuthorizedUserSchema.parse(record)
    } catch (e) {
        return null
    }
}

export const getRoles = async () => {
    const pb = await getPocketBase()
    const records = await pb.collection('roles').getFullList({})

    return roleSchema.array().parse(records)
}
