import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextResponse } from 'next/server'

export async function DELETE(request: Request) {

    cookies().delete('PBAuth')

    return NextResponse.json({ message: 'succes' }, { status: 200 })
}
