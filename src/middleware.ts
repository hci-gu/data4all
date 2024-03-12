import { pb } from '@/adapters/pocketbase'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const currentUser = pb.authStore.isValid
    if (currentUser && request.nextUrl.pathname.startsWith('/loga-in')) {
        return Response.redirect(new URL('/profile', request.url))
    }
    if (currentUser && request.nextUrl.pathname.startsWith('/skapa-konto')) {
        return Response.redirect(new URL('/profile', request.url))
    }

    if (!currentUser && !request.nextUrl.pathname.startsWith('/loga-in')) {
        return Response.redirect(new URL('/loga-in', request.url))
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
