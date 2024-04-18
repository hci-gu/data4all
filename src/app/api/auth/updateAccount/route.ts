import { pbForRequest } from '@/adapters/pocketbase'
import { env } from '@/lib/env'
import { updateUserSchema } from '@/types/zod'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import PocketBase, { ClientResponseError } from 'pocketbase'
import { z } from 'zod'

export async function PUT(request: NextRequest) {
    try {
        const pb = pbForRequest(request)
        
        const data = await request.json()
        const formData = updateUserSchema.parse(data?.formData)
        const userId = z.string().parse(data?.id)

        const records = await pb.collection('users').update(userId, formData)

        const authorizedUser = cookies().get('PBAuth')
        if (!authorizedUser) {
            return
        }
        pb.authStore.loadFromCookie(authorizedUser.value)

        const dbUser = await pb.collection('users').getOne(userId)
        const token = pb.authStore.token

        pb.authStore.save(token, dbUser)
        const authCookie = pb.authStore.exportToCookie()
        cookies().set('PBAuth', authCookie)

        return NextResponse.json({ message: 'success' }, { status: 200 })
    } catch (error) {
        if (error instanceof ClientResponseError) {
            // using return as thats what the nextjs docs recommend
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
