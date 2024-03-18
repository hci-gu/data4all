import Typography from '@/components/ui/Typography'
import Image from 'next/image'
import absurd from '../../../public/absurd 2.png'
import SignUp from '@/components/SignUp'

function skapaKonto () {


    return (
        <main className="grid grid-cols-2 h-screen">
            <div className="bg-black flex items-center px-40">
                <Image src={absurd} priority={true} alt="" />
            </div>
            <div className="flex flex-col gap-12 justify-center mx-auto">
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

export default skapaKonto
