import Typography from '@/components/ui/Typography'
import Image from 'next/image'
import absurd from '../../../../public/absurd 2.png'
import { SignUp } from '@/components/auth'
import { cookies } from 'next/headers'
import { getRoles } from '@/adapters/api'

async function SignUpPage() {

    const roles = await getRoles()
    return (
        <main className="grid h-screen sm:grid-cols-2">
            <div className="hidden items-center bg-black sm:flex sm:px-12 md:px-24 xl:px-40">
                <Image src={absurd} priority={true} alt="" />
            </div>
            <div className="flex flex-col justify-center gap-12 px-4 sm:mx-auto">
                <div>
                    <Typography level="H1">Skapa konto</Typography>
                    <Typography level="P">
                        Om du har en @kungsbacka.se mejl kan du skapa ett konto.
                    </Typography>
                </div>
                <SignUp roles={roles} />
            </div>
        </main>
    )
}

export default SignUpPage
