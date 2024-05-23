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

import { AuthorizedUserSchema } from '@/types/zod'
import { z } from 'zod'
import { Button } from './ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext, useEffect, useState } from 'react'

import SuggestDataOwner from './dataset/suggestDataOwner'
import { getUsers } from '@/adapters/api'
import { ScrollArea } from './ui/scroll-area'
import { useDebouncedValue } from '@/lib/hooks/useDebouncedValue'
import { authContext } from '@/lib/context/authContext'
import { DatasetContext } from '@/lib/context/datasetContext'

export default function DataOwner() {
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
            slug: 'sebastian-andreasson',
            is_admin: false
        },
        {
            collectionId: '_pb_users_auth_',
            collectionName: 'users',
            created: '2024-03-18 12:56:08.789Z',
            email: 'styris.n@gmail.com',
            emailVisibility: true,
            id: '5sufjyr2vdad3s0',
            name: 'styris.n@gmail.com',
            role: 'Utvecklare',
            updated: '2024-03-18 12:56:08.789Z',
            username: 'users36283',
            verified: false,
            slug: 'styris.n@gmail.com',
            is_admin: false
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
            role: 'Utvecklare',
            updated: '2024-04-11 09:14:09.924Z',
            username: 'users48961',
            verified: false,
            slug: 'exampel',
            is_admin: false
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
            role: 'Utvecklare',
            updated: '2024-04-11 09:14:09.924Z',
            username: 'users48961',
            verified: false,
            slug: 'josef',
            is_admin: false
        },
    ]
    const { cookie } = useContext(authContext)
    const { dataset } = useContext(DatasetContext)

    const [users, setUsers] = useState<AuthorizedUserSchema[]>(recommendedUsers)
    const [searchTerm, setSearchTerm] = useState('')
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
        await Promise.allSettled([
            debouncedSearchTerm
                ? setUsers(await getUsers(debouncedSearchTerm, cookie))
                : setUsers(recommendedUsers),
            new Promise((resolve) => setTimeout(resolve, time)),
        ])
    }

    useEffect(() => {
        autoComplete()
    }, [debouncedSearchTerm])

    if (!dataset.dataowner) {
        return (
            <>
                <h2 id="DataOwner" className="text-lg font-bold">
                    Ingen dataägare
                </h2>
                <Popover>
                    <PopoverTrigger className="flex gap-4 rounded-sm bg-slate-500 px-4 py-2 text-primary-foreground hover:bg-slate-600">
                        <UserPlus /> Föreslå dataägare
                    </PopoverTrigger>
                    <PopoverContent className="flex w-screen min-w-80 flex-col gap-2 sm:w-fit">
                        <Form {...form}>
                            <form
                                onChange={() =>
                                    setSearchTerm(form.getValues('dataset'))
                                }
                                onSubmit={(event) => event.preventDefault()}
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
                        <ul className="flex h-80 flex-col gap-4">
                            <ScrollArea className="">
                                {users &&
                                    users.map((user, index) => (
                                        <li key={index}>
                                            <SuggestDataOwner user={user} />
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
            <User user={dataset.dataowner} />
        </div>
    )
}
