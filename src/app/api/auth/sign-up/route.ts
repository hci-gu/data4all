import { env } from '@/lib/env'
import { siginUpSchema } from '@/types/zod'
import { NextResponse } from 'next/server'
import PocketBase from 'pocketbase'

export async function POST(request: Request) {
    const pb = new PocketBase(env.NEXT_PUBLIC_POCKETBASE)
    const newUser = siginUpSchema.parse(await request.json())
    const data = {
        email: newUser.email,
        emailVisibility: true,
        password: newUser.password,
        passwordConfirm: newUser.passwordConfirmation,
        name: newUser.email,
        role: newUser.role,
    }
    const authUser = await pb.collection('users').create(data)
    pb.collection('users')

    return NextResponse.json({ message: 'succes' }, { status: 200 })
}
