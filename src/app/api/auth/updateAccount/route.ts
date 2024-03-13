import { updateUserSchema } from '@/types/zod'
import { NextResponse } from 'next/server'
import PocketBase from 'pocketbase'

export async function PUT(request: Request) {
    const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE)
    const formData = updateUserSchema.parse(await request.json())

    return NextResponse.json({ message: 'succes' }, { status: 200 })
}
// export const updateUser = async (
//   formData: updateUserSchema,
//   userId: string
// ) => {
//   const data = {
//       name: formData?.name,
//       email: formData?.email,
//       oldPassword: formData?.oldPassword,
//       password: formData?.password,
//       passwordConfirm: formData?.passwordConfirm,
//       role: formData?.role,
//   }
//   try {
//       await pb.collection('users').update(userId, data)
//   } catch (error) {
//       console.log(error)
//   }
// }
