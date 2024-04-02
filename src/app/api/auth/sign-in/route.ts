import { env } from '@/lib/env'
import { signInSchema } from '@/types/zod'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import PocketBase, { ClientResponseError } from 'pocketbase'

export async function POST(request: Request) {
    try {
        const pb = new PocketBase(env.NEXT_PUBLIC_POCKETBASE)
        const user = signInSchema.parse(await request.json())
        await pb.collection('users').authWithPassword(user.email, user.password)
        cookies().set('PBAuth', pb.authStore.exportToCookie())
        
        return NextResponse.json({ message: 'success' }, { status: 200 })
    } catch (error) {
        if (error instanceof ClientResponseError) {
            // using return as thats what the nextjs docs recommend
            return NextResponse.json(
                { message: 'misslyckades att logga in användare' },
                { status: 400 }
            )
        }
    }
}
