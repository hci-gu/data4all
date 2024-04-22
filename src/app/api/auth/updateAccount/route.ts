import { pbForRequest } from '@/adapters/pocketbase'
import { updateUserSchema } from '@/types/zod'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { ClientResponseError } from 'pocketbase'
import { z } from 'zod'

export async function PUT(request: NextRequest) {
    try {
        const pb = pbForRequest(request)

        const data = await request.json()
        const formData = updateUserSchema.parse(data?.formData)
        const userId = z.string().parse(data?.id)

        const authorizedUser = request.headers.get('auth')
        if (!authorizedUser) {
            return NextResponse.json(
                { message: 'Du har inte tillgång att se användare' },
                { status: 403 }
            )
        }

        pb.authStore.loadFromCookie(authorizedUser)

        // console.log({ userId, authorizedUser, user: pb.authStore.model })
        const records = await pb.collection('users').update(userId, formData)

        // const dbUser = await pb.collection('users').getOne(userId)
        const token = pb.authStore.token

        pb.authStore.save(token, records)
        const authCookie = pb.authStore.exportToCookie()
        cookies().set('PBAuth', authCookie)

        return NextResponse.json({ message: 'success' }, { status: 200 })
    } catch (error) {
        if (error instanceof ClientResponseError) {
            // using return as thats what the nextjs docs recommend
            console.log('error', error);
            
            return NextResponse.json(
                { message: 'misslyckades att uppdatera användare' },
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
