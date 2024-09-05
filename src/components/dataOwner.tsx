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

import { AuthorizedUserSchema, datasetWithRelationsSchema } from '@/types/zod'
import { z } from 'zod'
import { Button } from './ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'

import SuggestDataOwner from './dataset/suggestDataOwner'
import { ScrollArea } from './ui/scroll-area'
import { useDebouncedValue } from '@/lib/hooks/useDebouncedValue'
import { getUsers } from '@/app/actions/auth'

export default function DataOwner({
    dataset,
    loggedInUser,
}: {
    dataset: datasetWithRelationsSchema
    loggedInUser: AuthorizedUserSchema
}) {
    const [users, setUsers] = useState<AuthorizedUserSchema[]>([])
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

    useEffect(() => {
        const autoComplete = async () => {
            await Promise.allSettled([
                debouncedSearchTerm
                    ? setUsers(await getUsers(debouncedSearchTerm))
                    : setUsers([]),
                new Promise((resolve) => setTimeout(resolve, time)),
            ])
        }
        autoComplete()
    }, [debouncedSearchTerm])

    if (!dataset || !dataset.dataowner) {
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
                                            <SuggestDataOwner
                                                user={user}
                                                loggedInUser={loggedInUser}
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
            <User user={dataset.dataowner} />
        </div>
    )
}
