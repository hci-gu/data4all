import PocketBase from 'pocketbase'
import { env } from '@/lib/env'
import { cookies } from 'next/headers'

export const getPocketBase = async () => {
    const pb = new PocketBase(env.NEXT_PUBLIC_POCKETBASE)
    const next_cookie = await cookies().get('pb_auth')

    pb.autoCancellation(false)
    if (next_cookie) {
        pb.authStore.loadFromCookie(next_cookie.value)
    }

    return pb
}
