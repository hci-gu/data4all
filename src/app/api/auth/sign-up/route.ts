import { env } from '@/lib/env'
import { stringWithHyphen } from '@/lib/utils'
import { signUpSchema } from '@/types/zod'
import { NextResponse } from 'next/server'
import PocketBase, { ClientResponseError } from 'pocketbase'

export async function POST(request: Request) {
    const pb = new PocketBase(env.NEXT_PUBLIC_POCKETBASE)
    const newUser = signUpSchema.parse(await request.json())
    try {
        const role = await pb
            .collection('roles')
            .getFirstListItem(`name="${newUser.role}"`)


        const data = {
            email: newUser.email,
            emailVisibility: true,
            password: newUser.password,
            passwordConfirm: newUser.passwordConfirmation,
            name: newUser.name,
            role: role.id,
            slug: stringWithHyphen(newUser.name),
        }
        await pb.collection('users').create(data)
        return NextResponse.json({ message: 'success' }, { status: 200 })
    } catch (error) {

        if (error instanceof ClientResponseError) {
            return NextResponse.json(
                { message: 'misslyckades att registrera användare' },
                { status: 400 }
            )
        }
    }
}
