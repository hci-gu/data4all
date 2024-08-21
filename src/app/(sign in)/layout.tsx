import { SignInHeader } from '@/components/header'
import { getLoggedInUser } from '../actions/auth'

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const user = await getLoggedInUser()

    if (!user) {
        throw new Error('Användaren är inte inloggad')
    }

    return (
        <>
            <SignInHeader user={user} />
            {children}
        </>
    )
}
