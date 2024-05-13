import { NextRequest, NextResponse } from 'next/server'
import { ClientResponseError } from 'pocketbase'
import { pbForRequest } from '@/adapters/pocketbase'
import { FeedFilter } from '@/types/constants'

export async function GET(request: NextRequest) {
    try {
        const pb = pbForRequest(request)
        const filter =
            (request.nextUrl.searchParams.get('filter') as FeedFilter) ??
            FeedFilter.All

        let records = []
        switch (filter) {
            case FeedFilter.Tagged:
                records = await pb.collection('events').getFullList({
                    sort: '-created',
                    filter: `subject = "${pb.authStore.model?.id || 'no user found'}"`,
                    expand: 'user,subject,dataset',
                })
                break
            case FeedFilter.MyDatasets:
            // TODO: implement this
            case FeedFilter.All:
                records = await pb.collection('events').getFullList({
                    sort: '-created',
                    expand: 'user,subject,dataset',
                })
                break
        }

        return NextResponse.json(
            {
                message: 'success',
                body: records,
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
        if (error === 'forbidden') {
            return NextResponse.json(
                { message: 'Du har inte tillgång' },
                { status: 403 }
            )
        }
        return NextResponse.json({ message: 'Något gick fel' }, { status: 500 })
    }
}