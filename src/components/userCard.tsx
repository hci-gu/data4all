import { ChevronRight } from 'lucide-react'
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card'
import { AuthorizedUserSchema } from '@/types/zod'
import Link from 'next/link'
import { Avatar, AvatarFallback } from './ui/avatar'
import { getInitials } from '@/lib/utils'

export default function UserCard({ user }: { user: AuthorizedUserSchema }) {
    return (
        <Card className="w-[560px] max-sm:w-full">
            <CardHeader>
                <Link
                    href={`/profile/${user.slug}`}
                    className="flex h-fit w-full items-center justify-between"
                >
                    <div className="flex gap-2">
                        <Avatar>
                            <AvatarFallback>
                                {getInitials(user.name)}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="text-xl">
                                {user.name}
                            </CardTitle>
                            <CardDescription className="line-clamp-2">
                                {user.role ?? '-'}
                            </CardDescription>
                        </div>
                    </div>
                    <ChevronRight />
                </Link>
            </CardHeader>
        </Card>
    )
}
