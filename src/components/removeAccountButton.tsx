'use client'
import { pb, removeUser } from '@/adapters/api'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function RemoveAccountButton({ userId }: { userId: string }) {
    const router = useRouter()
    const removeAccount = async (userId: string) => {
        try {
            await removeUser(userId)
            router.push('/skapa-konto')
        } catch (e) {
            console.log(e)
            toast.error('Något gick fel')
        }
    }
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
