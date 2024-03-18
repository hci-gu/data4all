import { signInSchema } from '@/types/zod'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import PocketBase, { ClientResponseError } from 'pocketbase'

export async function POST(request: Request) {
    const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE)
    const user = signInSchema.parse(await request.json())

    try {
        await pb.collection('users').authWithPassword(user.email, user.password)
        cookies().set('PBAuth', pb.authStore.exportToCookie())
        return NextResponse.json({ message: 'succes' }, { status: 200 })
    } catch (error) {
        if (error instanceof ClientResponseError) {
            return NextResponse.json(
                { message: 'misslyckades att logga in användare' },
                { status: 400 }
            )
        }
    }
}
