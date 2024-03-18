import { env } from '@/lib/env'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import PocketBase from 'pocketbase'

export async function DELETE(request: Request) {
    const pb = new PocketBase(env.NEXT_PUBLIC_POCKETBASE)
    const user = await request.json()
    console.log(user?.id)

    cookies().delete('PBAuth')
    await pb.collection('users').delete(user?.id)

    return NextResponse.json({ message: 'succes' }, { status: 200 })
}
