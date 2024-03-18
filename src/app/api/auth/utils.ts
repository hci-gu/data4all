import PocketBase from 'pocketbase'
import { cookies } from 'next/headers'
import { z } from 'zod'
import { env } from '@/lib/env'

export function loadAuthorizeduser() {
    const pb = new PocketBase(env.NEXT_PUBLIC_POCKETBASE)
    const authorizedUser = cookies().get('PBAuth')
    if (!authorizedUser) {
        return {}
    }
    pb.authStore.loadFromCookie(z.string().parse(authorizedUser?.value))
    return pb.authStore.model
}
