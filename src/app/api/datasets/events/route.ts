import { env } from '@/lib/env'
import { NextRequest, NextResponse } from 'next/server'
import PocketBase, { ClientResponseError } from 'pocketbase'

export async function GET(request: NextRequest) {
    try {
        const pb = new PocketBase(env.NEXT_PUBLIC_POCKETBASE)
        const datasetId = request.nextUrl.searchParams.get('id') as string

        const records = await pb.collection('events').getList(1, 50, {
            filter: `dataset="${datasetId}"`,
        })

        return NextResponse.json(
            { message: 'success', body: { records } },
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
        return NextResponse.json(
            {
                message: 'något gick fel',
                error,
            },
            { status: 500 }
        )
    }
}
