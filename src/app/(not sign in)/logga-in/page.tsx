import Typography from '@/components/ui/Typography'
import Image from 'next/image'
import { SignIn } from '@/components/auth'

function LoginPage() {
    return (
        <main className="grid h-screen sm:grid-cols-2">
            <div className="hidden items-center bg-black sm:flex sm:px-12 md:px-24 xl:px-40">
                <Image
                    src={'/absurd_login.png'}
                    priority={true}
                    alt=""
                    width={400}
                    height={400}
                />
            </div>
            <div className="flex flex-col justify-center gap-12 px-4 sm:mx-auto">
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
