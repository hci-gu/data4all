import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import '../globals.css'
import { cn } from '@/lib/utils'
import { loadAuthorizedUser } from '../api/auth/utils'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '@/lib/context/authContext'
import { cookies } from 'next/headers'
import { SignInHeader } from '@/components/header'

const fontSans = FontSans({
    subsets: ['latin'],
    variable: '--font-sans',
})

export const metadata: Metadata = {
    title: 'Data4all',
    description: 'A data handling service',
}

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
        <html lang="en">
            <body
                className={cn(
                    'min-h-screen bg-background font-sans antialiased',
                    fontSans.variable
                )}
            >
                {
                    <Toaster
                        position="bottom-right"
                        toastOptions={{ duration: 2500 }}
                    />
                }
                <AuthProvider user={user} authCookie={authCookie.value}>
                    <SignInHeader />
                    {children}
                </AuthProvider>
            </body>
        </html>
    )
}
