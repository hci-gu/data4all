import { NextRequest, NextResponse } from 'next/server'
import PocketBase, { ClientResponseError } from 'pocketbase'
import { env } from '@/lib/env'
import { EventSchema } from '@/types/zod'
import { pbForRequest } from '@/adapters/pocketbase'

export async function POST(request: NextRequest) {
    try {
        const pb = pbForRequest(request)

        
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
        if (error === 'forbidden') {
            return NextResponse.json(
                { message: 'Du har inte tillgång' },
                { status: 403 }
            )
        }
        return NextResponse.json({ message: 'något gick fel' }, { status: 500 })
    }
}
