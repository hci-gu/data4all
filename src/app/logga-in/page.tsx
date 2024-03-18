import Typography from '@/components/ui/Typography'
import Image from 'next/image'
import absurd from '../../../public/absurd 1.png'
import SignIn from '@/components/SignIn'

function LoginPage() {
    return (
        <main className="grid h-screen grid-cols-2">
            <div className="flex items-center bg-black px-40">
                <Image src={absurd} priority={true} alt="" />
            </div>
            <div className="mx-auto flex flex-col justify-center gap-12">
                <div>
                    <Typography level="H1">Logga in</Typography>
                    <Typography level="P">
                        För att komma åt Dataportalen så behöver du ha fått en
                        inbjudan.
                    </Typography>
                </div>
                <SignIn />
            </div>
        </main>
    )
}

export default LoginPage
