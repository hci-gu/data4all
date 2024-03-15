'use client'
import { pb, removeUser } from '@/adapters/pocketbase'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
export default function RemoveAccountButton() {
    const userId = pb.authStore.model?.id
    const router = useRouter()
    const removeAccount = async (userId: string) => {
        if (await removeUser(userId)) router.push('/skapa-konto')
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
