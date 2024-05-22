import { NextRequest, NextResponse } from 'next/server'
import PocketBase, { ClientResponseError } from 'pocketbase'
import { env } from '@/lib/env'
const pb = new PocketBase(env.NEXT_PUBLIC_POCKETBASE)

export async function GET(request: NextRequest) {
    try {
        const name = request.nextUrl.searchParams.get('name') ?? ''
        const cookie = request.headers.get('auth')

        if (!cookie) {
            return NextResponse.json(
                { message: 'Du har inte tillgång att se användare' },
                { status: 403 }
            )
        }
        pb.authStore.loadFromCookie(cookie)
        const records = await pb.collection('users').getList(1, 25, {
            sort: '-created',
            filter: `name ~ "${decodeURI(name)}"`,
            expand: 'role',
        })

        const cleanUsers = records.items.map((user: any) => {
            return {
                avatar: user.avatar,
                collectionId: user.collectionId,
                collectionName: user.collectionName,
                created: user.created,
                email: user.email,
                emailVisibility: user.emailVisibility,
                id: user.id,
                name: user.name,
                role: user.expand?.role.name,
                updated: user.updated,
                username: user.username,
                verified: user.verified,
                slug: user.slug,
            }
        })



        return NextResponse.json(
            {
                message: 'success',
                body: cleanUsers,
            },
            { status: 200 }
        )
    } catch (error) {
        if (error instanceof ClientResponseError) {
            // using return as thats what the nextjs docs recommend
            return NextResponse.json(
                { message: 'misslyckades att hämta användare' },
                { status: 400 }
            )
        }
        return NextResponse.json({ message: 'Något gick fel' }, { status: 500 })
    }
}
