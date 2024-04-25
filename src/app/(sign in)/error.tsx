'use client'

import Typography from '@/components/ui/Typography'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <main className="grid h-screen place-content-center">
            <Typography level="H1">Något hände</Typography>
            <Typography level="P">{error.message}</Typography>
            <div className="mt-2 flex gap-4">
                <Button onClick={() => reset()}>Försök igen</Button>
                <Link href="/">Gå till startsidan</Link>
            </div>
        </main>
    )
}
