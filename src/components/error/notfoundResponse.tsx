import Typography from '@/components/ui/Typography'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function NotFoundResponse() {
    const router = useRouter()
    return (
        <main className="grid h-screen w-full grid-cols-2 items-center">
            <div className="flex w-full flex-col items-center justify-center">
                <Image
                    src={'/absurd_signup_black.png'}
                    alt="404"
                    width={300}
                    height={300}
                />
            </div>
            <div className="flex w-fit flex-col items-center justify-center">
                <Typography level="H1">404</Typography>
                <Typography level="P">
                    Ser ut som att du försöker nå en sida som inte finns.
                </Typography>
                <Button className="mt-6" onClick={() => router.push('/')}>
                    Gå till startsidan
                </Button>
            </div>
        </main>
    )
}
