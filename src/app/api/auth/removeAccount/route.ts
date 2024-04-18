import { pbForRequest } from '@/adapters/pocketbase'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { ClientResponseError } from 'pocketbase'

export async function DELETE(request: NextRequest) {
    try {
        const pb = pbForRequest(request)

        
        const user = await request.json()

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
        if (error === 'forbidden') {
            return NextResponse.json(
                { message: 'Du har inte tillgång' },
                { status: 403 }
            )
        }
        return NextResponse.json({ message: 'Något gick fel' }, { status: 500 })
    }
}
