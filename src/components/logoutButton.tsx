'use client'
import { signOut } from '@/adapters/api'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function LogoutButton() {
    const router = useRouter()
    const logout = async () => {
        try {
            await signOut()
            router.push('/logga-in')
        } catch (e) {
            toast.error('Något gick fel')
        }
    }
    return (
        <>
            <Button variant={'outline'} onClick={() => logout()}>
                Logga ut
            </Button>
        </>
    )
}
