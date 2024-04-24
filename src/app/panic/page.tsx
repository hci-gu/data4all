'use client'
import { signOut } from '@/adapters/api'
import { LogoutButton } from '@/components/auth'
import Typography from '@/components/ui/Typography'
import { useRouter } from 'next/navigation'

async function test() {
    const router = useRouter()
    await signOut()
    router.push('/logga-in')
}
export default async function panic() {
    try {
        test()
        return
    } catch (error) {
        return (
            <main className="grid h-screen place-content-center">
                <Typography level="H1">
                    Något hände med din in loggning
                </Typography>
                <div className="mt-2 flex gap-4">
                    <LogoutButton text="Gå till logga in" />
                </div>
            </main>
        )
    }
}
