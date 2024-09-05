'use client'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { deleteAccount } from '@/app/actions/auth'

export default function RemoveAccountButton() {
    const [isClicked, setIsClicked] = useState(false)
    const router = useRouter()
    const removeAccount = async () => {
        try {
            setIsClicked(true)
            await deleteAccount()
            router.push('/skapa-konto')
        } catch (e) {
            setIsClicked(false)
            toast.error('Något gick fel')
        }
    }
    if (!isClicked) {
        return (
            <>
                <Button variant={'destructive'} onClick={() => removeAccount()}>
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
                onClick={() => removeAccount()}
            >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Ta bort konto
            </Button>
        </>
    )
}
