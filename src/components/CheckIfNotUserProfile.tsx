'use client'

import { authContext } from '@/lib/context/authContext'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'

export default function CheckIfNotUserProfile({
    name,
    children
}: {
    name: string
    children: React.ReactNode
}) {
    const user = useContext(authContext).auth
    const router = useRouter()

    if (user.name === name) {
        router.push('/profile')
    }

    return <>{children}</>
}
