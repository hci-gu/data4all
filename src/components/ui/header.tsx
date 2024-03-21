'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Typography from './Typography'
import Image from 'next/image'
import Box from '../../../public/boxes.png'
import Logo from '../../../public/Logo.png'

export default function Header({ usersName }: { usersName: string }) {
    const pathname = usePathname()
    switch (pathname) {
        case '/logga-in':
            return (
                <>
                    <header className="fixed flex h-[60px] w-full justify-between  px-4">
                        <div className="flex w-[50%] items-center justify-between pr-4 font-semibold [&>*]:border-none [&>*]:text-lg [&>*]:text-white">
                            <Typography level="H2">
                                Kungsbacka dataportal
                            </Typography>
                            <Image src={Box} alt="" />
                        </div>
                        <div className="flex w-[50%] items-center justify-end">
                            <Link
                                className="h-fit text-sm"
                                href={'/skapa-konto'}
                            >
                                Skapa ett konto
                            </Link>
                        </div>
                    </header>
                </>
            )
        case '/skapa-konto':
            return (
                <>
                    <header className="fixed flex h-[60px] w-full justify-between px-4">
                        <div className="flex w-[50%] items-center justify-between pr-4 font-semibold [&>*]:border-none [&>*]:text-lg [&>*]:text-white">
                            <Typography level="H2">
                                Kungsbacka dataportal
                            </Typography>
                            <Image src={Box} alt="" />
                        </div>
                        <div className="flex w-[50%] items-center justify-end">
                            <Link className="h-fit text-sm" href={'/logga-in'}>
                                Logga in istället
                            </Link>
                        </div>
                    </header>
                </>
            )
        default:
            return (
                <>
                    <header className="sticky flex h-[60px] w-full items-center justify-between border-b-2 border-slate-200 px-4">
                        <Image src={Logo} alt="Logo" />
                        <div className="flex items-center justify-end font-semibold [&>*]:border-none [&>*]:p-0 [&>*]:text-lg">
                            <Link href={'/profile'}>{usersName}</Link>
                        </div>
                    </header>
                </>
            )
    }
}
