'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Typography from './Typography'
import Image from 'next/image'
import Box from '../../../public/boxes.png'
import Logo from '../../../public/logo.svg'
import { Button } from './button'
import { Search, X } from 'lucide-react'
import { useState } from 'react'
import SearchBar from '../searchBar'
import { Avatar, AvatarFallback } from './avatar'
import { getInitials } from '@/lib/utils'
import { z } from 'zod'

export default function Header({ usersName }: { usersName?: string }) {
    let userName = ''
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const pathname = usePathname()
    if (z.string().safeParse(usersName)) userName = usersName as string
    switch (pathname) {
        case '/logga-in':
            return (
                <>
                    <header className="fixed flex h-[60px] w-full justify-between  px-4">
                        <div className="flex w-[50%] items-center justify-between pr-4 font-semibold [&>*]:border-none [&>*]:text-lg [&>*]:text-white">
                            <Typography level="H2">
                                Kungsbacka dataportal
                            </Typography>
                            <Image
                                src={Box}
                                alt="Kungsbacka dataportal logotyp"
                            />
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
                            <Image src={Box} alt="Kungsbacka dataportal loga" />
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
                    <header
                        className={`sticky flex h-[60px] w-full items-center justify-between border-b-2 bg-white border-slate-200 ${!!isSearchOpen ? 'max-sm:justify-evenly' : 'px-4'}`}
                    >
                        <Link
                            href={'/'}
                            className="flex items-center gap-4 [&>div]:hidden"
                        >
                            <Image
                                src={Logo}
                                alt="Kungsbacka dataportal loga"
                            />
                            <Typography level="Large">
                                Kungsbacka dataportal
                            </Typography>
                        </Link>
                        {!isSearchOpen ? (
                            <div className="flex gap-6">
                                <Button
                                    className="w-10 p-2 sm:hidden"
                                    variant={'outline'}
                                    onClick={() => setIsSearchOpen(true)}
                                >
                                    <Search />
                                </Button>
                                <div className="flex items-center justify-end font-semibold [&>*]:border-none [&>*]:p-0 [&>*]:text-lg ">
                                    <Link
                                        href={'/profile'}
                                        className="flex items-center justify-center gap-2"
                                    >
                                        <span className="max-sm:sr-only">
                                            {usersName}
                                        </span>
                                        <Avatar>
                                            <AvatarFallback>
                                                {getInitials(userName)}
                                            </AvatarFallback>
                                        </Avatar>
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 bg-white sm:hidden">
                                <SearchBar />
                                <Button
                                    className="w-10 p-2 sm:hidden"
                                    variant={'ghost'}
                                    onClick={() => setIsSearchOpen(false)}
                                >
                                    <X />
                                </Button>
                            </div>
                        )}
                    </header>
                </>
            )
    }
}
