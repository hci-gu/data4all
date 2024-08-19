'use client'
import Typography from '@/components/ui/Typography'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function NotSignInHeader() {
    const pathname = usePathname()

    return (
        <header className="fixed flex h-[60px] w-full justify-between  px-4">
            <div className="flex w-[50%] items-center justify-between pr-4 font-semibold [&>*]:border-none [&>*]:text-lg [&>*]:text-white">
                <Typography level="H2">Kungsbacka dataportal</Typography>
                <Image
                    src={'/boxes.png'}
                    width={40}
                    height={40}
                    alt="Kungsbacka dataportal logotyp"
                />
            </div>
            <div className="flex w-[50%] items-center justify-end">
                {pathname === '/logga-in' ? (
                    <Link className="h-fit text-sm" href={'/skapa-konto'}>
                        Skapa ett konto
                    </Link>
                ) : (
                    <Link className="h-fit text-sm" href={'/logga-in'}>
                        Logga in istället
                    </Link>
                )}
            </div>
        </header>
    )
}
