import { env } from '@/lib/env'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import PocketBase, { ClientResponseError } from 'pocketbase'

export async function DELETE(request: Request) {
    try {
        const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE)
        const user = await request.json()
        console.log(user?.id)

        cookies().delete('PBAuth')
        await pb.collection('users').delete(user?.id)

        return NextResponse.json({ message: 'success' }, { status: 200 })
    } catch (error) {
        if (error instanceof ClientResponseError) {
            // using return as thats what the nextjs docs recommend
            return NextResponse.json(
                { message: 'misslyckades att ta bort användare' },
                { status: 400 }
            )
        }
    }
}
