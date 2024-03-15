import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'
import PocketBase from 'pocketbase'

export function middleware(request: NextRequest) {
    const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE)
    const authorizedUser = cookies().get('PBAuth')
    const path = request.nextUrl.pathname

    if (
        !authorizedUser &&
        !path.startsWith('/loga-in') &&
        !path.startsWith('/skapa-konto')
    ) {
        return Response.redirect(new URL('/loga-in', request.url))
    }

    if (authorizedUser) {
        pb.authStore.loadFromCookie(authorizedUser.value)
    }

    if (
        !pb.authStore.isValid &&
        !path.startsWith('/loga-in') &&
        !path.startsWith('/skapa-konto')
    ) {
        return Response.redirect(new URL('/loga-in', request.url))
    }

    if (
        authorizedUser &&
        (path.startsWith('/loga-in') || path.startsWith('/skapa-konto'))
    ) {
        return Response.redirect(new URL('/profile', request.url))
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
