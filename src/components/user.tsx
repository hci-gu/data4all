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
            <div className="flex items-center gap-4">
                <Avatar>
                    <AvatarFallback className="h-6 w-6">
                        {getInitials(user.name)}
                    </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <p>
                        <b className="text-lg">{user.name}</b>
                    </p>
                    <p className="text-sm text-gray-500">{user.role}</p>
                </div>
            </div>
        )
    }
    return (
        <div className="flex items-center gap-4">
            <Avatar>
                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
                <p>
                    <b className="text-lg">{user.name}</b>
                </p>
                <p className="text-sm text-gray-500">{user.role}</p>
            </div>
        </div>
    )
}
