'use client'
import { signOut } from '@/adapters/pocketbase'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function Home() {
    const router = useRouter()
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Button
                onClick={() => {
                    signOut()
                    router.push('/logga-in')
                }}
            >
                Loga ut
            </Button>
        </main>
    )
}
