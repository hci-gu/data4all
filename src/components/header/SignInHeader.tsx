'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useContext, useState } from 'react'
import Typography from '../ui/Typography'
import { Button } from '../ui/button'
import { Search, X } from 'lucide-react'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { getInitials, stringWithHyphen } from '@/lib/utils'
import SearchBar from '../searchBar'
import { authContext } from '@/lib/context/authContext'
import Logo from '../../../public/logo.svg'

export default function SignInHeader() {
    const userContext = useContext(authContext)
    const usersName = userContext.auth.name

    const [isSearchOpen, setIsSearchOpen] = useState(false)
    return (
        <header
            className={`sticky flex h-[60px] w-full items-center justify-between border-b-2 border-slate-200 bg-white ${!!isSearchOpen ? 'max-sm:justify-evenly' : 'px-4'}`}
        >
            <Link href={'/'} className="flex items-center gap-4 [&>div]:hidden">
                <Image src={Logo} alt="Kungsbacka dataportal loga" />
                <Typography level="Large">Kungsbacka dataportal</Typography>
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
                            href={`/profile`}
                            className="flex items-center justify-center gap-2"
                        >
                            <span className="max-sm:sr-only">{usersName}</span>
                            <Avatar>
                                <AvatarFallback>
                                    {getInitials(usersName)}
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
    )
}
