import { Inter as FontSans } from 'next/font/google'
import { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import { cn } from '@/lib/utils'
import '../globals.css'
import { NotSignInHeader } from '@/components/header'

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
}: {
    children: React.ReactNode
}) {
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
                <NotSignInHeader />
                {children}
            </body>
        </html>
    )
}
