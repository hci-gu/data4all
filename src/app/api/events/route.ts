import { NextRequest, NextResponse } from 'next/server'
import { ClientResponseError } from 'pocketbase'
import { EventCreateSchema } from '@/types/zod'
import { pbForRequest } from '@/adapters/pocketbase'
import { ZodError } from 'zod'

export async function POST(request: NextRequest) {
    try {
        const pb = pbForRequest(request)
        const cookie = request.headers.get('auth')

        if (!cookie) {
            return NextResponse.json(
                { message: 'Du har inte tillgång' },
                { status: 403 }
            )
        }

        const data = EventCreateSchema.parse(await request.json())

        pb.authStore.loadFromCookie(cookie)
        const record = await pb.collection('events').create(
            {
                ...data,
                user: data.user,
                subject: data.subject?.map((s) => s.id),
            },
            { expand: 'user.role,subject' }
        )

        return NextResponse.json(
            { message: 'success', body: record },
            { status: 201 }
        )
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json(
                { message: 'Formateringen av data är incorrect' },
                { status: 415 }
            )
        }

        if (error instanceof ClientResponseError) {
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
        return NextResponse.json({ message: 'något gick fel' }, { status: 500 })
    }
}
