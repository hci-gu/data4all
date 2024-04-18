import { NextRequest, NextResponse } from 'next/server'
import { ClientResponseError } from 'pocketbase'
import { pbForRequest } from '@/adapters/pocketbase'

export async function GET(request: NextRequest) {
    try {
        const pb = pbForRequest(request)
        const title = request.nextUrl.searchParams.get('title') ?? ''

        const records = await pb.collection('dataset').getList(1, 25, {
            sort: '-created',
            filter: `title ~ "${decodeURI(title)}"`,
            expand: 'tag',
        })

        return NextResponse.json(
            {
                message: 'success',
                body: records.items,
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
        if (error === 'forbidden') {
            return NextResponse.json(
                { message: 'Du har inte tillgång' },
                { status: 403 }
            )
        }
        return NextResponse.json({ message: 'Något gick fel' }, { status: 500 })
    }
}
