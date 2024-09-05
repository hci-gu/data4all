'use client'

import { AuthorizedUserSchema } from '@/types/zod'
import { useRouter } from 'next/navigation'

export default function CheckIfNotUserProfile({
    user,
    loggedInUser,
}: {
    user: AuthorizedUserSchema
    loggedInUser: AuthorizedUserSchema
}) {
    const router = useRouter()

    if (user.name === loggedInUser.name) {
        router.push('/profile')
    }
    return <></>
}
