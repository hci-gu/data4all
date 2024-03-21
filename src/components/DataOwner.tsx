import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Typography from '@/components/ui/Typography'
import { UserPlus } from 'lucide-react'
import User from './User'

type User = {
    id: number
    name: string
    roll: string
    initials: string
}

export default function DataOwner({ user }: { user?: User }) {
    const users = [
        {
            id: 1,
            name: 'Sebastian Andreasson',
            roll: 'Business Intelligence',
            initials: 'SA',
        },
        {
            id: 2,
            name: 'Styrbjörn Nordberg',
            roll: 'Business Intelligence',
            initials: 'SN',
        },
        {
            id: 3,
            name: 'Josef Forkman',
            roll: 'Business Intelligence',
            initials: 'JF',
        },
    ]

    if (!user) {
        return (
            <>
                <h2 id="DataOwner" className="text-lg font-bold">
                    Ingen dataägare
                </h2>
                <Popover>
                    <PopoverTrigger className="flex gap-4 rounded-sm bg-slate-500 px-4 py-2 text-primary-foreground hover:bg-slate-600">
                        <UserPlus /> Föreslå dataägare
                    </PopoverTrigger>
                    <PopoverContent className="flex flex-col gap-2">
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Sök efter användare" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Användare</SelectLabel>
                                    {users &&
                                        users.map((user) => (
                                            <SelectItem
                                                key={user.id}
                                                value={user.name.replaceAll(
                                                    ' ',
                                                    ''
                                                )}
                                            >
                                                {user.name}
                                            </SelectItem>
                                        ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <p className="text-sm font-bold">Relevanta användare</p>
                        <ul className="flex flex-col gap-4">
                            {users &&
                                users.map((user) => (
                                    <li key={user.id}>
                                        <User user={user} />
                                    </li>
                                ))}
                        </ul>
                    </PopoverContent>
                </Popover>
            </>
        )
    }

    return (
        <div className="flex flex-col gap-1">
            <h2 id="DataOwner" className="text-lg font-bold">
                Dataägare
            </h2>
            <User user={user} />
        </div>
    )
}
