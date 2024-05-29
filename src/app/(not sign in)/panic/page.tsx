'use client'
import { signOut } from '@/adapters/api'
import { LogoutButton } from '@/components/auth'
import Typography from '@/components/ui/Typography'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

async function RedirectToLogin(router: AppRouterInstance) {
    await signOut()
    router.push('/logga-in')
}
export default function Panic() {
    const router = useRouter()
    const [redirectFailed, setRedirectFailed] = useState(false)

    useEffect(() => {
        try {
            RedirectToLogin(router)
            return
        } catch (error) {
            setRedirectFailed(true)
        }
    }, [router])
    if (redirectFailed) {
        return (
            <main className="grid h-screen place-content-center">
                <Typography level="H1">
                    Något hände med din inloggning
                </Typography>
                <div className="mt-2 flex gap-4">
                    <LogoutButton text="Gå till logga in" />
                </div>
            </main>
        )
    }
    return
}
