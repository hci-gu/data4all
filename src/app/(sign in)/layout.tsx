import { loadAuthorizedUser } from '../api/auth/utils'
import { AuthProvider } from '@/lib/context/authContext'
import { cookies } from 'next/headers'
import { SignInHeader } from '@/components/header'

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const user = await loadAuthorizedUser()
    const authCookie = cookies().get('PBAuth')

    if (!authCookie) {
        throw new Error('Användaren är inte inloggad')
    }
    return (
        <>
            <AuthProvider user={user} authCookie={authCookie.value}>
                <SignInHeader />
                {children}
            </AuthProvider>
        </>
    )
}
