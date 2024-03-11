'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Typography from './Typography'
import { pb } from '@/adapters/pocketbase'

const Header = () => {
    const pathname = usePathname()
    switch (pathname) {
        case '/LogaIn':
            return (
                <>
                    <header className="fixed flex w-full justify-between px-4 pt-4">
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
                    <header className="fixed flex w-full justify-between px-4 pt-4">
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
                    <header className="sticky flex w-full justify-between px-4 py-4 border-b-2 border-slate-200">
                        <img src="Logo.png" alt="" />
                        <div className="flex items-center justify-end font-semibold [&>*]:border-none [&>*]:text-lg">
                            <Typography level="H2">
                                {pb.authStore.model?.username}
                            </Typography>
                        </div>
                    </header>
                </>
            )
    }
}
export default Header
