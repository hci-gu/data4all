import { Inter } from 'next/font/google'
import { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import { cn } from '@/lib/utils'
import './globals.css'
import { NotSignInHeader } from '@/components/header'

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
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
                    inter.variable
                )}
            >
                <Toaster
                    position="bottom-right"
                    toastOptions={{ duration: 2500 }}
                />
                {children}
            </body>
        </html>
    )
}
