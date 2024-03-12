'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Typography from './Typography'
import { pb } from '@/adapters/pocketbase'
import Image from 'next/image'

const Header = () => {
    const pathname = usePathname()
    switch (pathname) {
        case '/LogaIn':
            return (
                <>
                    <header className="fixed flex h-[60px] w-full justify-between  px-4">
                        <div className="flex w-[50%] items-center justify-between pr-4 font-semibold [&>*]:border-none [&>*]:text-lg [&>*]:text-white">
                            <Typography level="H2">
                                Kungsbacka dataportal
                            </Typography>
                            <img src="boxes.png" alt="" />
                        </div>
                        <div className="flex w-[50%] items-center justify-end">
                            <Link
                                className="h-fit text-sm"
                                href={'/Skapakonto'}
                            >
                                Skapa ett konto
                            </Link>
                        </div>
                    </header>
                </>
            )
        case '/SkapaKonto':
            return (
                <>
                    <header className="fixed flex h-[60px] w-full justify-between px-4">
                        <div className="flex w-[50%] items-center justify-between pr-4 font-semibold [&>*]:border-none [&>*]:text-lg [&>*]:text-white">
                            <Typography level="H2">
                                Kungsbacka dataportal
                            </Typography>
                            <img src="boxes.png" alt="" />
                        </div>
                        <div className="flex w-[50%] items-center justify-end">
                            <Link className="h-fit text-sm" href={'/LogaIn'}>
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
                        <Image
                            src="/Logo.png"
                            height={40}
                            width={251}
                            alt="Logo"
                        />
                        <div className="flex items-center justify-end font-semibold [&>*]:border-none [&>*]:p-0 [&>*]:text-lg">
                            <Typography level="H2">
                                {pb.authStore.model?.name}
                            </Typography>
                        </div>
                    </header>
                </>
            )
    }
}
export default Header
