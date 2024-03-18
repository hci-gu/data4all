'use client'
import { pb, removeUser } from '@/adapters/api'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
<<<<<<< HEAD
export default function RemoveAccountButton({userId}: {userId?: string}) {
    // const userId = pb.authStore.model?.id
    const router = useRouter()
    
    const removeAccount = async (userId?: string) => {
        if (userId && await removeUser(userId)) router.push('/skapa-konto')
=======
import toast from 'react-hot-toast'
export default function RemoveAccountButton() {
    const userId = pb.authStore.model?.id
    const router = useRouter()
    const removeAccount = async (userId: string) => {
        const response = await removeUser(userId)
        if (!response.succses) toast.error('Något gick fel')
        if (response.succses) router.push('/skapa-konto')
>>>>>>> main
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
