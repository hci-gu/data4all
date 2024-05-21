'use client'

import Typography from '@/components/ui/Typography'
import { Button } from '@/components/ui/button'
import absurd from '../../public/absurd 2.png'
import Image from 'next/image'
import ErrorType from 'next/error'
import { useRouter } from 'next/navigation'

export default function Error({
    error,
    reset,
}: {
    error: ErrorType & { digest?: string }
    reset: () => void
}) {
    const router = useRouter()
    const errorCode = error.props.statusCode
    const is500ErrorCode = errorCode.toString().startsWith('5')

    console.log('här är error');
    

    if (is500ErrorCode) {
        return (
            <main className="grid h-screen w-full grid-cols-2 items-center justify-between px-28 py-9">
                <Image src={absurd} alt="404" />
                <div className="flex w-fit flex-col justify-self-end">
                    <Typography level="H1">{errorCode}</Typography>
                    <Typography level="P">
                        Det blev något fel på våran sida. Försök igen senare
                        eller prova ladda om sidan.
                    </Typography>
                    <div className="mt-6 flex gap-11">
                        <Button onClick={() => router.push('/')}>
                            Gå till start sidan
                        </Button>
                        <Button variant="outline" onClick={() => reset()}>
                            Ladda om sidan
                        </Button>
                    </div>
                </div>
            </main>
        )
    }

    return (
        <main className="grid h-screen w-full grid-cols-2 items-center justify-between px-28 py-9">
            <Image src={absurd} alt="404" />
            <div className="flex w-fit flex-col justify-self-end">
                <Typography level="H1">{errorCode}</Typography>
                <Typography level="P">
                    Ser ut som att du försöker nå en sida som inte finns.
                </Typography>
                <div className="mt-6 flex gap-11">
                    <Button onClick={() => router.push('/')}>
                        Gå till start sidan
                    </Button>
                </div>
            </div>
        </main>
    )
}
