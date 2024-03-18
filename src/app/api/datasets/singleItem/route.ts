import { NextResponse } from 'next/server'
import PocketBase, { ClientResponseError } from 'pocketbase'
import { env } from 'process'

export async function POST(request: Request) {
    try {
        const pb = new PocketBase(env.NEXT_PUBLIC_POCKETBASE)
        const data = await request.json()
        const datasetTitle = data?.title

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
    }
}
