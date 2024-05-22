import { NextRequest, NextResponse } from 'next/server'
import PocketBase, { ClientResponseError } from 'pocketbase'
import { EventSchema } from '@/types/zod'
import { pbForRequest } from '@/adapters/pocketbase'

export async function GET(
    request: NextRequest,
    context: { params: { datasetId: string } }
) {
    try {
        const { params } = context
        const pb = pbForRequest(request)

        const records = await pb
            .collection<EventSchema>('events')
            .getList(1, 50, {
                filter: `dataset="${params.datasetId}"`,
                expand: 'user,user.role,subject,subjectRole',
            })

        // console.log(records.items[0].expand.user.expand.role.name)

        return NextResponse.json(
            { message: 'success', body: records.items },
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
        return NextResponse.json(
            {
                message: 'något gick fel',
                error,
            },
            { status: 500 }
        )
    }
}
