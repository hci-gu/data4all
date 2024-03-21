import { Avatar, AvatarFallback } from './ui/avatar'
type User = {
    id: number
    name: string
    roll: string
    initials: string
}
export default function User({ user }: { user: User }) {
    return (
        <div className="flex items-center gap-4">
            <Avatar>
                {/* <AvatarImage src="https://github.com/sebastianandreasson.png" /> */}
                <AvatarFallback>{user.initials}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
                <p>
                    <b className="text-lg">{user.name}</b>
                </p>
                <p className="text-sm text-gray-500">{user.roll}</p>
            </div>
        </div>
    )
}
