import { NextResponse } from 'next/server'
import PocketBase from 'pocketbase'

export async function GET() {
    const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE)
    const records = await pb.collection('mocDataset').getFullList({
        sort: '-created',
    })

    return NextResponse.json(
        { message: 'succes', body: { records } },
        { status: 200 }
    )
}
