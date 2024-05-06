import { NextRequest, NextResponse } from 'next/server'
import { ClientResponseError } from 'pocketbase'
import { pbForRequest } from '@/adapters/pocketbase'
import { stringWithHyphen } from '@/lib/utils'

export async function GET(
    req: NextRequest,
    context: { params: { username: string } }
) {
    try {
        const pb = pbForRequest(req)
        const { params } = context

        const records = await pb
            .collection('users')
            .getFirstListItem(`slug="${stringWithHyphen(params.username)}"`)

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
                { message: 'Misslyckades att hämta användare' },
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
