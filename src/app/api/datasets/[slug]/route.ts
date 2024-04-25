import { NextRequest, NextResponse } from 'next/server'
import * as utils from './../utils'
import { ClientResponseError } from 'pocketbase'
import { pbForRequest } from '@/adapters/pocketbase'

export async function GET(req: NextRequest, context: any) {
    try {
        const pb = pbForRequest(req)
        const { params } = context
        

        const records = await utils.datasetForSlug(
            params.slug,
            pb
        )

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
            console.log('error', error);
            
            return NextResponse.json(
                { message: 'Misslyckades att hämta dataset' },
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
