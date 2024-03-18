'use client'
import { signOut } from '@/adapters/pocketbase'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
export default function LogoutButton() {
    const router = useRouter()
    const logout = async () => {
        if (await signOut()) router.push('/logga-in')
    }
    return (
        <>
            <Button variant={'outline'} onClick={() => logout()}>
                Logga ut
            </Button>
        </>
    )
}
