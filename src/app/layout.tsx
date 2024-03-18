import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import Header from '@/components/ui/header'
import { loadAuthorizedUser } from './api/auth/utils'
import { Toaster } from 'react-hot-toast'

const fontSans = FontSans({
    subsets: ['latin'],
    variable: '--font-sans',
})

export const metadata: Metadata = {
    title: 'Data4all',
    description: 'A data handling service',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const user = loadAuthorizedUser()
    return (
        <html lang="en">
            <body
                className={cn(
                    'min-h-screen bg-background font-sans antialiased',
                    fontSans.variable
                )}
            >
                <Toaster
                    position="bottom-right"
                    toastOptions={{ duration: 2500 }}
                />
                <Header usersName={user?.name} />
                {children}
            </body>
        </html>
    )
}
