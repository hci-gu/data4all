import { NextRequest } from 'next/server'
import PocketBase from 'pocketbase'
import { env } from '@/lib/env'
import { cookies } from 'next/headers'

export const pbForRequest = (request: NextRequest) => {
    const pb = new PocketBase(env.NEXT_PUBLIC_POCKETBASE)
    const cookie = request.headers.get('auth')
    
    if (cookie) {
        pb.authStore.loadFromCookie(cookie)
    }
    return pb
}
