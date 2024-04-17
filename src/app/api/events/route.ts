import { NextRequest, NextResponse } from 'next/server'
import PocketBase, { ClientResponseError } from 'pocketbase'
import { env } from '@/lib/env'
import { EventCreateSchema, EventSchema } from '@/types/zod'

export async function POST(request: NextRequest) {
    try {
        const pb = new PocketBase(env.NEXT_PUBLIC_POCKETBASE)
        const body = await request.json()

        const data = EventCreateSchema.parse(body)

        const record = await pb
            .collection('events')
            .create(
                { ...data, user: data.user, subject: data.subject?.id },
                { expand: 'user,subject' }
            )

        return NextResponse.json(
            { message: 'success', body: record },
            { status: 201 }
        )
    } catch (error) {
        if (error instanceof ClientResponseError) {
            return NextResponse.json(
                { message: 'misslyckades att hämta event' },
                { status: 400 }
            )
        }
        return NextResponse.json({ message: 'något gick fel' }, { status: 500 })
    }
}
