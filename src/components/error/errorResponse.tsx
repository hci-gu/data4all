'use client'
import Typography from '@/components/ui/Typography'
import { Button } from '@/components/ui/button'
import absurd from '../../../public/absurd 2.png'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
export default function ErrorResponse({ reset }: { reset: () => void }) {
    const router = useRouter()

    return (
        <main className="grid h-screen w-full grid-cols-2 items-center justify-between px-28 py-9">
            <Image src={absurd} alt="404" />
            <div className="flex w-fit flex-col justify-self-end">
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