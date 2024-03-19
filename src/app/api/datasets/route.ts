import { env } from '@/lib/env'
import { NextResponse } from 'next/server'
import PocketBase, { ClientResponseError } from 'pocketbase'

export async function GET() {
    try {
        const pb = new PocketBase(env.NEXT_PUBLIC_POCKETBASE)
        const records = await pb.collection('mocDataset').getFullList({
            sort: '-created',
        })

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
