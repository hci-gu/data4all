'use client'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { UserPlus } from 'lucide-react'
import User from './user'

import { AuthorizedUserSchema, datasetSchema } from '@/types/zod'
import { set, z } from 'zod'
import { Button } from './ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'

import SuggestDataOwner from './dataset/suggestDataOwner'
import { getUsers } from '@/adapters/api'
import { ScrollArea } from './ui/scroll-area'
import { useDebouncedValue } from '@/lib/hooks/useDebouncedValue'

export default function DataOwner({
    user,
    signInUser,
    dataset,
}: {
    user: AuthorizedUserSchema | null
    signInUser: AuthorizedUserSchema
    dataset: datasetSchema
}) {
    const recommendedUsers: AuthorizedUserSchema[] = [
        {
            collectionId: '_pb_users_auth_',
            collectionName: 'users',
            created: '2024-03-18 12:56:08.789Z',
            email: 'Sebastian.Andreasson@kungsbacka.se',
            emailVisibility: true,
            id: '5sufjyr2vdad3s0',
            name: 'Sebastian Andreasson',
            role: 'Admin',
            updated: '2024-03-18 12:56:08.789Z',
            username: 'users36283',
            verified: false,
        },
        {
            collectionId: '_pb_users_auth_',
            collectionName: 'users',
            created: '2024-03-18 12:56:08.789Z',
            email: 'styris.n@gmail.com',
            emailVisibility: true,
            id: '5sufjyr2vdad3s0',
            name: 'styris.n@gmail.com',
            role: 'User',
            updated: '2024-03-18 12:56:08.789Z',
            username: 'users36283',
            verified: false,
        },
        {
            avatar: '',
            collectionId: '_pb_users_auth_',
            collectionName: 'users',
            created: '2024-04-02 12:59:18.094Z',
            email: 'exampel@kungsbacka.se',
            emailVisibility: true,
            id: '0zfiwpwiv1myhrc',
            name: 'exampel',
            role: 'User',
            updated: '2024-04-11 09:14:09.924Z',
            username: 'users48961',
            verified: false,
        },
        {
            avatar: '',
            collectionId: '_pb_users_auth_',
            collectionName: 'users',
            created: '2024-04-02 12:59:18.094Z',
            email: 'Josef@kungsbacka.se',
            emailVisibility: true,
            id: '0zfiwpwiv1myhrc',
            name: 'Josef',
            role: 'User',
            updated: '2024-04-11 09:14:09.924Z',
            username: 'users48961',
            verified: false,
        },
    ]
    const [users, setUsers] = useState<AuthorizedUserSchema[]>(recommendedUsers)
    const [searchTerm, setSearchTerm] = useState('')
    const [isFocused, setIsFocused] = useState(false)
    const time = 250
    const debouncedSearchTerm = useDebouncedValue(searchTerm, time)

    const formSchema = z.object({
        dataset: z.string(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            dataset: '',
        },
    })

    const autoComplete = async () => {
        if (isFocused) {
            debouncedSearchTerm
                ? setUsers(await getUsers(debouncedSearchTerm))
                : setUsers(recommendedUsers)
        }
    }

    useEffect(() => {
        autoComplete()
    }, [debouncedSearchTerm])

    const slowClose = () => {
        setTimeout(() => setIsFocused(false), time - 25)
    }

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
                        <Form {...form}>
                            <form
                                onChange={() =>
                                    setSearchTerm(form.getValues('dataset'))
                                }
                                className="flex gap-2"
                            >
                                <FormField
                                    control={form.control}
                                    name="dataset"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormControl>
                                                <Input
                                                    type="search"
                                                    placeholder="Sök efter användare"
                                                    {...field}
                                                    onFocus={() => {
                                                        setIsFocused(true)
                                                    }}
                                                    onBlur={() => slowClose()}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    type="submit"
                                    variant={'outline'}
                                    className="sr-only w-10 p-2"
                                >
                                    Sök
                                </Button>
                            </form>
                        </Form>

                        <p className="text-sm font-bold">Relevanta användare</p>
                        <ul className="flex flex-col gap-4">
                            <ScrollArea className="h-48">
                                {users &&
                                    users.map((user, index) => (
                                        <li key={index}>
                                            <SuggestDataOwner
                                                user={user}
                                                signInUser={signInUser}
                                                dataset={dataset}
                                            />
                                        </li>
                                    ))}
                                {users.length === 0 && (
                                    <p>Inga användare hittades</p>
                                )}
                            </ScrollArea>
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
