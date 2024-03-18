'use client'
import { signOut } from '@/adapters/api'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
export default function LogoutButton() {
    const router = useRouter()
    const logout = async () => {
        const response = await signOut()
        if (!response.succses) console.log()
        if (response.succses) router.push('/loga-in')
    }
    return (
        <>
            <Button variant={'outline'} onClick={() => logout()}>
                Logga ut
            </Button>
        </>
    )
}
