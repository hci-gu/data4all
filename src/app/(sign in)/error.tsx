'use client'

import Typography from '@/components/ui/Typography'
import { Button } from '@/components/ui/button'
import absurd from '../../../public/absurd 2.png'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    const router = useRouter()

    return (
        <main className="grid h-screen w-full grid-cols-2 items-center justify-between px-28 py-9">
            <Image src={absurd} alt="404" />
            <div className="flex w-fit flex-col justify-self-end">
                <Typography level="H1">400</Typography>
                <Typography level="P">
                    Ser ut som att du försöker nå en sida som inte finns.
                </Typography>
                <div className="mt-6 flex gap-11">
                    <Button onClick={() => router.push('/')}>
                        Gå till startsidan
                    </Button>
                </div>
            </div>
        </main>
    )
}
