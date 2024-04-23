import { getInitials } from '@/lib/utils'
import { Avatar, AvatarFallback } from './ui/avatar'
import { UserSchema } from '@/types/zod'

export default function User({
    user,
    size = 'default',
}: {
    user: UserSchema
    size?: 'default' | 'small'
}) {
    if (size === 'small') {
        return (
            <div className="flex gap-2">
                <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-[0.5625rem]">
                        {getInitials(user.name)}
                    </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start">
                    <p className="text-xs sm:text-lg">
                        <b>{user.name}</b>
                    </p>
                    <p className="text-[0.625rem] text-gray-500 sm:text-sm">
                        {user.role}
                    </p>
                </div>
            </div>
        )
    }
    return (
        <div className="flex gap-2">
            <Avatar>
                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col text-start">
                <p className="text-lg line-clamp-1">
                    <b>{user.name}</b>
                </p>
                <p className="text-sm text-gray-500">{user.role}</p>
            </div>
        </div>
    )
}
