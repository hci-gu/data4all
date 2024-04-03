import { env } from '@/lib/env'
import { updateUserSchema } from '@/types/zod'
import { NextResponse } from 'next/server'
import PocketBase, { ClientResponseError } from 'pocketbase'
import { z } from 'zod'

export async function PUT(request: Request) {
    const pb = new PocketBase(env.NEXT_PUBLIC_POCKETBASE)
    try {
        const data = await request.json()
        const formData = updateUserSchema.parse(data?.formData)
        const userId = z.string().parse(data?.id)

        await pb.collection('users').update(userId, formData)

        return NextResponse.json({ message: 'success' }, { status: 200 })
    } catch (error) {
        if (error instanceof ClientResponseError) {
            // using return as thats what the nextjs docs recommend
            throw NextResponse.json(
                { message: 'misslyckades att uppdatera användare' },
                { status: 400 }
            )
        }
    }
}
