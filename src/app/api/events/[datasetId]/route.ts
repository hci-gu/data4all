import { NextRequest, NextResponse } from 'next/server'
import PocketBase, { ClientResponseError } from 'pocketbase'
import { env } from '@/lib/env'
import { EventSchema } from '@/types/zod'

export async function GET(
    request: NextRequest,
    context: { params: { datasetId: string } }
) {
    try {
        const { params } = context
        const pb = new PocketBase(env.NEXT_PUBLIC_POCKETBASE)
        const cookie = request.headers.get('auth')
        pb.authStore.loadFromCookie(cookie as string)

        if (!pb.authStore.isValid) {
            throw 'forbidden'
        }

        const records = await pb
            .collection<EventSchema>('events')
            .getList(1, 50, {
                filter: `dataset="${params.datasetId}"`,
            })

        return NextResponse.json(
            { message: 'success', body: records },
            { status: 200 }
        )
    } catch (error) {
        if (error instanceof ClientResponseError) {
            // using return as thats what the nextjs docs recommend
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
        return NextResponse.json(
            {
                message: 'något gick fel',
                error,
            },
            { status: 500 }
        )
    }
}
