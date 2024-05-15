import { NextRequest, NextResponse } from 'next/server'
import * as utils from './../utils'
import { ClientResponseError } from 'pocketbase'
import { pbForRequest } from '@/adapters/pocketbase'
import { datasetSchema, datasetWithRelationsSchema } from '@/types/zod'
import { ZodError } from 'zod'

export async function GET(
    req: NextRequest,
    context: { params: { slug: string } }
) {
    try {
        const pb = pbForRequest(req)
        const { params } = context

        const records = await utils.datasetForSlug(params.slug, pb)

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

export async function PATCH(
    req: NextRequest,
    context: { params: { slug: string } }
) {
    try {
        const pb = pbForRequest(req)
        const { params } = context
        const data = await req.json()

        const body = datasetWithRelationsSchema.partial().parse(await data)

        const record = await pb
            .collection<datasetWithRelationsSchema>('dataset')
            .update(params.slug, body, { expand: 'related_datasets,tag' })

        return NextResponse.json(
            {
                message: 'success',
                body: record,
            },
            { status: 200 }
        )
    } catch (error) {
        if (error instanceof ClientResponseError) {
            // using return as thats what the nextjs docs recommend
            return NextResponse.json(
                { message: 'Misslyckades att uppdatera dataset' },
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
