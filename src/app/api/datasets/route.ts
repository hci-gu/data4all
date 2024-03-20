import { NextRequest, NextResponse } from 'next/server'
import PocketBase, { ClientResponseError } from 'pocketbase'
import { env } from '@/lib/env'
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
        let records
        switch (true) {
            case request.nextUrl.searchParams.get('datasetTitle') !== null:
                // gets single dataset by its title
                const datasetTitle = request.nextUrl.searchParams.get(
                    'datasetTitle'
                ) as string

                records = await pb
                    .collection('mocDataset')
                    .getFirstListItem(`title="${datasetTitle}"`)
                return NextResponse.json(
                    { message: 'success', body: { records } },
                    { status: 200 }
                )
            case request.nextUrl.searchParams.get('userId') !== null:
                // gets all datasets related to the users id
                const userId = request.nextUrl.searchParams.get('userId') as string

                const userEvents = await pb
                    .collection('events')
                    .getList(1, 50, {
                        filter: `user="${userId}"`,
                    })

                const datasetIds = Array.from(
                    new Set(
                        userEvents.items.map((e) => {
                            return e.dataset
                        })
                    )
                )

                records = await getDatasetArray(datasetIds as string[])

                return NextResponse.json(
                    {
                        message: 'success',
                        body: {
                            userEvents: userEvents.items,
                            datasetIds: records,
                        },
                    },
                    { status: 200 }
                )

            default:
                // gets all datasets
                records = await pb.collection('mocDataset').getFullList({
                    sort: '-created',
                })

                return NextResponse.json(
                    { message: 'success', body: { records: records } },
                    { status: 200 }
                )
        }
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
