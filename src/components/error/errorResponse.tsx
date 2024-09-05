'use client'
import Typography from '@/components/ui/Typography'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function ErrorResponse({ reset }: { reset: () => void }) {
    const router = useRouter()

    return (
        <main className="grid h-screen w-full grid-cols-2 items-center justify-between">
            <div className="flex w-full flex-col items-center justify-center">
                <Image
                    src={'/absurd_signup_black.png'}
                    alt="400"
                    width={300}
                    height={300}
                />
            </div>
            <div className="flex w-fit flex-col justify-center">
                <Typography level="H1">400</Typography>
                <Typography level="P">
                    Det blev något fel på vår sida. Försök igen senare eller
                    prova ladda om sidan.
                </Typography>
                <div className="mt-6 flex gap-11">
                    <Button variant="outline" onClick={() => reset()}>
                        Ladda om sidan
                    </Button>
                    <Button onClick={() => router.push('/')}>
                        Gå till startsidan
                    </Button>
                </div>
            </div>
        </main>
    )
}
