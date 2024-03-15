import { updateUserSchema } from '@/types/zod'
import { NextResponse } from 'next/server'
import PocketBase from 'pocketbase'
import { z } from 'zod'

export async function PUT(request: Request) {
    const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE)
    const data = await request.json()
    const formData = updateUserSchema.parse(data?.formData)
    const userId = z.string().parse(data?.id)

    await pb.collection('users').update(userId, formData)

    return NextResponse.json({ message: 'succes' }, { status: 200 })
}
