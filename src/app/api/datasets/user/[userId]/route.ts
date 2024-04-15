import { NextResponse } from 'next/server'
import * as utils from '../../utils'
import PocketBase, { ClientResponseError } from 'pocketbase'
import { env } from '@/lib/env'
const pb = new PocketBase(env.NEXT_PUBLIC_POCKETBASE)

export async function GET(
    req: Request,
    context: { params: { userId: string } }
) {
    try {
        const { params } = context
        const cookie = req.headers.get('auth')
        pb.authStore.loadFromCookie(cookie as string)
        
        if (!pb.authStore.isValid) {
            throw 'forbidden'
        }
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
        if (error === 'forbidden') {
            return NextResponse.json(
                { message: 'Du har inte tillgång' },
                { status: 403 }
            )
        }
        return NextResponse.json({ message: 'Något gick fel' }, { status: 500 })
    }
}
