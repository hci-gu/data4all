'use client'

import Typography from '@/components/ui/Typography'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Error() {
    return (
        <main className="grid h-screen place-content-center">
            <Typography level="H1">Något hände</Typography>
            <Typography level="P">Kunde inte hitta det du letade efter</Typography>
            <div className="mt-2 flex gap-4">
                <Button><Link href="/">Gå till startsidan</Link></Button>
            </div>
        </main>
    )
}
