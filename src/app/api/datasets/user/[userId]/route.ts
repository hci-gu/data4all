import { NextResponse } from 'next/server'
import * as utils from '../../utils'
import { ClientResponseError } from 'pocketbase'

export async function GET(req: Request, context: any) {
    try {
        const { params } = context
        const records = await utils.datasetsForUserId(params.userId)

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
                { message: 'misslyckades att hämta dataset' },
                { status: 400 }
            )
        }
        return NextResponse.json({ message: 'Något gick fel' }, { status: 500 })
    }
}
