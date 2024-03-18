'use client'
import { signOut } from '@/adapters/api'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function LogoutButton() {
    const router = useRouter()
    const logout = async () => {
        const response = await signOut()
        if (!response.success) toast.error('Något gick fel')

        if (response.success) router.push('/loga-in')
    }
    return (
        <>
            <Button variant={'outline'} onClick={() => logout()}>
                Logga ut
            </Button>
        </>
    )
}
