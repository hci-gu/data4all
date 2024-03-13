import { signInSchema } from '@/types/zod'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import PocketBase from 'pocketbase'

export async function POST(request: Request) {
    const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE)
    const user = signInSchema.parse(await request.json())
    const authUser = await pb
        .collection('users')
        .authWithPassword(user.email, user.password)

    cookies().set('PBAuth', authUser.token)

    return NextResponse.json({ message: 'succes' }, { status: 200 })
}
