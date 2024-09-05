import { cookies } from 'next/headers'
import { type NextRequest } from 'next/server'
import PocketBase from 'pocketbase'
import { env } from './lib/env'

export async function middleware(request: NextRequest) {
    const pb = new PocketBase(env.NEXT_PUBLIC_POCKETBASE)
    const authorizedUser = cookies().get('pb_auth')
    const path = request.nextUrl.pathname

    if (authorizedUser) {
        pb.authStore.loadFromCookie(authorizedUser.value)
    }
    const isLoginPage =
        path.startsWith('/logga-in') || path.startsWith('/skapa-konto')
    const isUnauthorized = !authorizedUser && !isLoginPage
    const isInvalidAuth =
        authorizedUser && !pb.authStore.isValid && !isLoginPage

    if (isUnauthorized) {
        return Response.redirect(new URL('/logga-in', request.url))
    }
    if (authorizedUser && isLoginPage) {
        return Response.redirect(new URL('/profile', request.url))
    }
    if (isInvalidAuth && !path.startsWith('/panic')) {
        return Response.redirect(new URL('/panic', request.url))
    }
    if (authorizedUser && !isLoginPage && !path.startsWith('/panic')) {
        try {
            await pb.collection('users').getOne(pb.authStore.model?.id)
        } catch (error) {
            return Response.redirect(new URL('/panic', request.url))
        }
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
