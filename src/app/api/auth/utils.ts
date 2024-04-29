import PocketBase from 'pocketbase'
import { cookies } from 'next/headers'
import { env } from '@/lib/env'
import { AuthorizedUserSchema } from '@/types/zod'

export function loadAuthorizedUser() {
    const pb = new PocketBase(env.NEXT_PUBLIC_POCKETBASE)
    const authorizedUser = cookies().get('PBAuth')
    if (!authorizedUser) {
        throw new Error('Användaren är inte inloggad')
    }
    pb.authStore.loadFromCookie(authorizedUser.value)

    return AuthorizedUserSchema.parse(pb.authStore.model)
}
