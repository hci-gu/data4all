'use client'
import { removeUser } from '@/adapters/api'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'

export default function RemoveAccountButton({ userId, authCookie }: { userId: string, authCookie: string }) {
    const [isClicked, setIsClicked] = useState(false)
    const router = useRouter()
    const removeAccount = async (userId: string) => {
        try {
            setIsClicked(true)
            await removeUser(userId, authCookie)
            router.push('/skapa-konto')
        } catch (e) {
            setIsClicked(false)
            console.log(e)
            toast.error('Något gick fel')
        }
    }
    if (!isClicked) {
        return (
            <>
                <Button
                    variant={'destructive'}
                    onClick={() => removeAccount(userId)}
                >
                    Ta bort konto
                </Button>
            </>
        )
    }
    return (
        <>
            <Button
                variant={'destructive'}
                disabled
                onClick={() => removeAccount(userId)}
            >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Ta bort konto
            </Button>
        </>
    )
}
