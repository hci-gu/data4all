import { NextRequest, NextResponse } from 'next/server'
import PocketBase, { ClientResponseError } from 'pocketbase'
import { env } from '@/lib/env'
import { EventSchema } from '@/types/zod'

export async function POST(request: NextRequest) {
    try {
        const pb = new PocketBase(env.NEXT_PUBLIC_POCKETBASE)

        const data = EventSchema.parse(await request.json())

        const record = await pb.collection<EventSchema>('events').create(data)

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
