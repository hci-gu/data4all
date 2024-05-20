import PocketBase from 'pocketbase'
import { cookies } from 'next/headers'
import { env } from '@/lib/env'
import { AuthorizedUserSchema } from '@/types/zod'

export async function loadAuthorizedUser() {
    const pb = new PocketBase(env.NEXT_PUBLIC_POCKETBASE)
    const authorizedUser = cookies().get('PBAuth')
    if (!authorizedUser) {
        throw new Error('Användaren är inte inloggad')
    }
    pb.authStore.loadFromCookie(authorizedUser.value)

    const user = await pb
        .collection('users')
        .getFirstListItem(`id="${pb.authStore.model?.id}"`, { expand: 'role' })

    const cleanUser = {
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
    }

    console.log('user', cleanUser)
    return AuthorizedUserSchema.parse(cleanUser)
}
