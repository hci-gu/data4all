import Typography from '@/components/ui/Typography'
import Image from 'next/image'
import absurd from '../../../public/absurd 1.png'
import SignIn from '@/components/SignIn'


export default function () {
    return (
        <main className="grid grid-cols-2 h-screen">
            <div className="bg-black flex items-center px-40">
                <Image src={absurd} priority={true} alt="" />
            </div>
            <div className="flex flex-col gap-12 justify-center mx-auto">
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