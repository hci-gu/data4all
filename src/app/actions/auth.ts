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
import { getDatasets } from './datasets'

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

    let role
    try {
        role = await pb
            .collection('roles')
            .getFirstListItem(`name="${newUser.role}"`)
    } catch (e) {}

    const data = {
        email: newUser.email,
        emailVisibility: true,
        password: newUser.password,
        passwordConfirm: newUser.passwordConfirmation,
        name: newUser.name,
        role: role?.id,
        slug: getSlug(newUser.name),
    }
    await pb.collection('users').create(data)
}

export const updateUser = async (
    userId: string,
    formData: updateUserSchema
) => {
    const pb = await getPocketBase()

    let role
    if (formData.role) {
        role = await pb.collection('roles').getOne(formData.role ?? '')
    }

    const record = await pb.collection('users').update(userId, {
        ...formData,
        role: role ? role.id : null,
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

export const getUsers = async (searchTerm?: string, isDataOwner = false) => {
    const pb = await getPocketBase()

    let dataOwnerIds: string[] = []
    if (isDataOwner) {
        const datasets = await getDatasets(
            undefined,
            undefined,
            '&& dataowner!=""'
        )
        console.log('datasets', datasets)
        dataOwnerIds = datasets
            .map((dataset) => dataset.dataowner?.id ?? '')
            .filter((id) => id)
    }

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

    if (isDataOwner) {
        console.log('dataOwnerIds', dataOwnerIds)
        records = records.filter((user) => dataOwnerIds.includes(user.id))
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
