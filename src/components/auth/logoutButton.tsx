'use client'
import { signOut } from '@/adapters/api'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { useContext, useState } from 'react'
import { Loader2 } from 'lucide-react'
import { authContext } from '@/lib/context/authContext'

export default function LogoutButton({ text = 'Logga ut' }: { text?: string }) {
    const userContext = useContext(authContext)
    if (!userContext) {
        throw new Error('User context is not defined')
    }
    const [isClicked, setIsClicked] = useState(false)
    const router = useRouter()
    const logout = async () => {
        try {
            setIsClicked(true)
            userContext.setAuth(undefined)
            userContext.setCookie(undefined)
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
                    {text}
                </Button>
            </>
        )
    }
    return (
        <>
            <Button variant={'outline'} disabled onClick={() => logout()}>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {text}
            </Button>
        </>
    )
}
