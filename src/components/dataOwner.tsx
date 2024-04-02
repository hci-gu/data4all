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
import { UserPlus } from 'lucide-react'
import User from './user'
import { UserSchema } from '@/types/zod'

export default function DataOwner({ user }: { user?: UserSchema }) {
    const users: UserSchema[] = [
        {
            name: 'Sebastian Andreasson',
            role: 'Admin',
        },
        {
            name: 'Styrbjörn Nordberg',
            role: 'User',
        },
        {
            name: 'Josef Forkman',
            role: 'User',
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
                                        users.map((user, index) => (
                                            <SelectItem
                                                key={index}
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
                                users.map((user, index) => (
                                    <li key={index}>
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
