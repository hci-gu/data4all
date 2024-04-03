import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { ClientResponseError } from 'pocketbase'

export async function DELETE() {
    try {
        cookies().delete('PBAuth')

        return NextResponse.json({ message: 'success' }, { status: 200 })
    } catch (error) {
        if (error instanceof ClientResponseError) {
            // using return as thats what the nextjs docs recommend
            return NextResponse.json(
                { message: 'misslyckades att logga ut' },
                { status: 400 }
            )
        }
    }
}
