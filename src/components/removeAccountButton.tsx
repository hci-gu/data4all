'use client'
import { pb, removeUser } from '@/adapters/api'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
export default function RemoveAccountButton() {
    const userId = pb.authStore.model?.id
    const router = useRouter()
    const removeAccount = async (userId: string) => {
        const response = await removeUser(userId)
        if (!response.succses) toast.error('Något gick fel')
        if (response.succses) router.push('/skapa-konto')
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
