import Typography from '@/components/ui/Typography'
import Image from 'next/image'
import absurd from '../../../public/absurd 2.png'
import SignUp from '@/components/SignUp'

function SignUpPage() {
    return (
        <main className="grid h-screen grid-cols-2">
            <div className="flex items-center bg-black px-40">
                <Image src={absurd} priority={true} alt="" />
            </div>
            <div className="mx-auto flex flex-col justify-center gap-12">
                <div>
                    <Typography level="H1">Skapa konto</Typography>
                    <Typography level="P">
                        Om du har en @kungsbacka.se mejl kan du skapa ett konto.
                    </Typography>
                </div>
                <SignUp />
            </div>
        </main>
    )
}

export default SignUpPage
