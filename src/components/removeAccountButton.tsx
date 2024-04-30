'use client'
import { removeUser } from '@/adapters/api'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { useContext, useState } from 'react'
import { Loader2 } from 'lucide-react'
import { authContext } from '@/lib/context/authContext'
import { getUserFromURL } from '@/lib/utils'

export default function RemoveAccountButton() {
    const userContext = useContext(authContext)
    const user = userContext.auth

    const [isClicked, setIsClicked] = useState(false)
    const router = useRouter()
    const removeAccount = async () => {
        try {
            setIsClicked(true)
            await removeUser(user.id, userContext.cookie)
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
