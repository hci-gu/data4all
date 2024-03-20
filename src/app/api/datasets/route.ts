import { NextRequest, NextResponse } from 'next/server'
import PocketBase, { ClientResponseError } from 'pocketbase'
import { env } from '@/lib/env'
import { datasetFromUser, singleDataset } from './utils'
const pb = new PocketBase(env.NEXT_PUBLIC_POCKETBASE)

export async function GET(request: NextRequest) {
    try {
        let records
        switch (true) {
            case request.nextUrl.searchParams.get('datasetTitle') !== null:
                // gets single dataset by its title
                const datasetTitle = request.nextUrl.searchParams.get(
                    'datasetTitle'
                ) as string

                records = singleDataset(datasetTitle)
                break
            case request.nextUrl.searchParams.get('userId') !== null:
                // gets all datasets related to the users id
                const userId = request.nextUrl.searchParams.get(
                    'userId'
                ) as string

                records = datasetFromUser(userId)

                break

            default:
                // gets all datasets
                records = await pb.collection('mocDataset').getFullList({
                    sort: '-created',
                })

                break
        }
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
