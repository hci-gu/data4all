'use client'

import Typography from "@/components/ui/Typography"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <main className="h-screen grid place-content-center">
            <Typography level="H1">Något hände</Typography>
            <Typography level="P">{error.message}</Typography>
            <div className="flex gap-4 mt-2">
                <Button onClick={() => reset()}>Försök igen</Button>
                <Link href='/'>Gå till startsidan</Link>
            </div>
        </main>
    )
}