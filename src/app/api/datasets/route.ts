import { NextRequest, NextResponse } from 'next/server'
import PocketBase, { ClientResponseError } from 'pocketbase'
import { env } from '@/lib/env'
const pb = new PocketBase(env.NEXT_PUBLIC_POCKETBASE)

export async function GET(request: NextRequest) {
    try {
        // gets all datasets
        const records = await pb.collection('dataset').getFullList({
            sort: '-created',
        })

        return NextResponse.json(
            {
                message: 'success',
                body: {
                    records: records,
                },
            },
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
        return NextResponse.json({ message: 'Något gick fel' }, { status: 500 })
    }
}
