'use client'
import { signOut } from '@/adapters/api'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'

export default function LogoutButton() {
    const [isClicked, setIsClicked] = useState(false)
    const router = useRouter()
    const logout = async () => {
        try {
            setIsClicked(true)
            await signOut()
            router.push('/logga-in')
        } catch (e) {
            setIsClicked(false)
            toast.error('Något gick fel')
        }
    }
    if (!isClicked) {
        return (
            <>
                <Button variant={'outline'} onClick={() => logout()}>
                    Logga ut
                </Button>
            </>
        )
    }
    return (
        <>
            <Button variant={'outline'} disabled onClick={() => logout()}>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logga ut
            </Button>
        </>
    )
}
