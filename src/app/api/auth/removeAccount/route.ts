import { env } from '@/lib/env'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import PocketBase, { ClientResponseError } from 'pocketbase'

export async function DELETE(request: Request) {
    try {
        const pb = new PocketBase(env.NEXT_PUBLIC_POCKETBASE)
        const cookie = request.headers.get('auth')
        pb.authStore.loadFromCookie(cookie as string)

        if (!pb.authStore.isValid) {
            throw 'forbidden'
        }
        const user = await request.json()

        cookies().delete('PBAuth')
        await pb.collection('users').delete(user?.id)

        return NextResponse.json({ message: 'success' }, { status: 200 })
    } catch (error) {
        if (error instanceof ClientResponseError) {
            // using return as thats what the nextjs docs recommend
            return NextResponse.json(
                { message: 'misslyckades att ta bort användare' },
                { status: 400 }
            )
        }
        if (error === 'forbidden') {
            return NextResponse.json(
                { message: 'Du har inte tillgång' },
                { status: 403 }
            )
        }
        return NextResponse.json({ message: 'Något gick fel' }, { status: 500 })
    }
}
