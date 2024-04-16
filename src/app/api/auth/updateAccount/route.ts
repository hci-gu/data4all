import { env } from '@/lib/env'
import { updateUserSchema } from '@/types/zod'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import PocketBase, { ClientResponseError } from 'pocketbase'
import { z } from 'zod'

export async function PUT(request: Request) {
    const pb = new PocketBase(env.NEXT_PUBLIC_POCKETBASE)
    try {
        const cookie = request.headers.get('auth')
        pb.authStore.loadFromCookie(cookie as string)

        if (!pb.authStore.isValid) {
            throw 'forbidden'
        }
        const data = await request.json()
        const formData = updateUserSchema.parse(data?.formData)
        const userId = z.string().parse(data?.id)

        const records = await pb.collection('users').update(userId, formData)
        console.log(records)

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
            console.log(error)

            // using return as thats what the nextjs docs recommend
            // throw NextResponse.json(
            //     { message: 'misslyckades att uppdatera användare' },
            //     { status: 400 }
            // )
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
