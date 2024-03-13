import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const authorizedUser = cookies().get('PBAuth')
    
    if (authorizedUser) {
        const path = request.nextUrl.pathname
        switch (true) {
            case path.startsWith('/loga-in'):
                return Response.redirect(new URL('/profile', request.url))
            case path.startsWith('/skapa-konto'):
                return Response.redirect(new URL('/profile', request.url))
        }
    }
    if (!authorizedUser) {
        const path = request.nextUrl.pathname
        if (!path.startsWith('/loga-in') && !path.startsWith('/skapa-konto')) {
            return Response.redirect(new URL('/loga-in', request.url))
        }
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
