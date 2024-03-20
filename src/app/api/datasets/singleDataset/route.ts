import { NextRequest, NextResponse } from 'next/server'
import PocketBase, { ClientResponseError } from 'pocketbase'
import { env } from '@/lib/env'

export async function GET(request: NextRequest) {
    try {
        const pb = new PocketBase(env.NEXT_PUBLIC_POCKETBASE)
        const datasetTitle = request.nextUrl.searchParams.get('title') as string

        const records = await pb
            .collection('mocDataset')
            .getFirstListItem(`title="${datasetTitle}"`)
        return NextResponse.json(
            { message: 'success', body: { records } },
            { status: 200 }
        )
    } catch (error) {
        if (error instanceof ClientResponseError) {
            // using return as thats what the nextjs docs recommend
            return NextResponse.json(
                { message: 'misslyckades att hämta dataset' },
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
