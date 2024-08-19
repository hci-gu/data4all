import { NotSignInHeader } from '@/components/header'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <NotSignInHeader />
            {children}
        </>
    )
}
