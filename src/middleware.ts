import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'
import PocketBase from 'pocketbase'
import { z } from 'zod'

export function middleware(request: NextRequest) {
    const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE)
    const authorizedUser = cookies().get('PBAuth')
    if (!authorizedUser) {
        return Response.redirect(new URL('/loga-in', request.url))
    }

    pb.authStore.loadFromCookie(z.string().parse(authorizedUser?.value))

    const path = request.nextUrl.pathname

    if (!pb.authStore.isValid) {
        if (!path.startsWith('/loga-in') && !path.startsWith('/skapa-konto')) {
            return Response.redirect(new URL('/loga-in', request.url))
        }
    }

    switch (true) {
        case path.startsWith('/loga-in'):
            return Response.redirect(new URL('/profile', request.url))
        case path.startsWith('/skapa-konto'):
            return Response.redirect(new URL('/profile', request.url))
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
