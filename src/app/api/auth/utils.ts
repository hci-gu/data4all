import PocketBase from 'pocketbase'
import { cookies } from 'next/headers'
import { env } from '@/lib/env'
import { AuthorizedUserSchema } from '@/types/zod'

export function loadAuthorizedUser() {
    const pb = new PocketBase(env.NEXT_PUBLIC_POCKETBASE)
    const authorizedUser = cookies().get('PBAuth')
    if (!authorizedUser) {
        return
    }
    pb.authStore.loadFromCookie(authorizedUser.value)

    const user = AuthorizedUserSchema.parse(pb.authStore.model)
    return user
}
