import { NextRequest, NextResponse } from 'next/server'
import PocketBase, { ClientResponseError } from 'pocketbase'
import { env } from '@/lib/env'
import { z } from 'zod'
const pb = new PocketBase(env.NEXT_PUBLIC_POCKETBASE)

async function getDatasetArray(datasetIds: string[]): Promise<any[]> {
    // pb.collection('mocDataset').getList(1, 50, {
    //     filter: ``
    // })
    const datasetPromises = datasetIds.map((id) => {
        const record = pb
            .collection('mocDataset')
            .getFirstListItem(`id="${id}"`)
        return record
    })
    const records = await Promise.all(datasetPromises)

    return records
}

export async function GET(request: NextRequest) {
    try {
        const userId = request.nextUrl.searchParams.get('id') as string

        const userEvents = await pb.collection('events').getList(1, 50, {
            filter: `user="${userId}"`,
        })
        const datasetIds = new Set(userEvents.items.map((e) => e.dataset))

        const records = await getDatasetArray(
            z.array(z.string()).parse(datasetIds)
        )

        return NextResponse.json(
            {
                message: 'success',
                body: { userEvents: userEvents.items, dataset: records },
            },
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
