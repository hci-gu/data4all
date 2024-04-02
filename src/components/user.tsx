import { getInitials } from '@/lib/utils'
import { Avatar, AvatarFallback } from './ui/avatar'
import { UserSchema } from '@/types/zod'

export default function User({ user }: { user: UserSchema }) {
    return (
        <div className="flex items-center gap-4">
            <Avatar>
                {/* <AvatarImage src="https://github.com/sebastianandreasson.png" /> */}
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
