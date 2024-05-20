import { NextRequest, NextResponse } from 'next/server'
import PocketBase, { ClientResponseError } from 'pocketbase'
import { env } from '@/lib/env'
const pb = new PocketBase(env.NEXT_PUBLIC_POCKETBASE)

export async function GET(request: NextRequest) {
    try {
        const name = request.nextUrl.searchParams.get('name') ?? ''
        const cookie = request.headers.get('auth')

        if (!cookie) {
            return NextResponse.json(
                { message: 'Du har inte tillgång att se användare' },
                { status: 403 }
            )
        }
        pb.authStore.loadFromCookie(cookie)
        const records = await pb.collection('roles').getFullList({})

        return NextResponse.json(
            {
                message: 'success',
                body: records,
            },
            { status: 200 }
        )
    } catch (error) {
        if (error instanceof ClientResponseError) {
            // using return as thats what the nextjs docs recommend
            return NextResponse.json(
                { message: 'misslyckades att hämta råller' },
                { status: 400 }
            )
        }
        return NextResponse.json({ message: 'Något gick fel' }, { status: 500 })
    }
}
