'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem } from './ui/form'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { AuthorizedUserSchema, datasetWithRelationsSchema } from '@/types/zod'
import Link from 'next/link'
import { useDebouncedValue } from '@/lib/hooks/useDebouncedValue'
import { getDatasets } from '@/app/actions/datasets'
import { getUsers } from '@/app/actions/auth'
const searchSchema = z.object({
    searchTerm: z.string().min(1),
})
type searchSchema = z.infer<typeof searchSchema>

type autoCompleteSuggestion = {
    id: string
    name: string
    type: 'dataset' | 'user'
    slug: string
}

const datasetToSuggestion = (datasets: datasetWithRelationsSchema[]) => {
    let newDatasetArray: autoCompleteSuggestion[] = []

    datasets.map((dataset) => {
        const newDataset: autoCompleteSuggestion = {
            id: dataset.id,
            name: dataset.title,
            type: 'dataset',
            slug: dataset.slug,
        }
        newDatasetArray.push(newDataset)
    })
    return newDatasetArray
}
const userToSuggestion = (users: AuthorizedUserSchema[]) => {
    let newUserArray: autoCompleteSuggestion[] = []

    users.map((user) => {
        const newUser: autoCompleteSuggestion = {
            id: user.id,
            name: user.name,
            type: 'user',
            slug: user.slug,
        }
        newUserArray.push(newUser)
    })
    return newUserArray
}

const Highlight = ({
    text,
    highlight,
}: {
    text: string
    highlight: string
}) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'))
    return (
        <span>
            {parts.map((part, index) => (
                <span
                    key={index}
                    style={
                        part.toLowerCase() === highlight.toLowerCase()
                            ? { fontWeight: 'bold' }
                            : {}
                    }
                >
                    {part}
                </span>
            ))}
        </span>
    )
}

export default function SearchBar({
    initialSearchTerm,
}: {
    initialSearchTerm?: string
}) {
    const [isClicked, setIsClicked] = useState(false)
    const [searchTerm, setSearchTerm] = useState(initialSearchTerm ?? '')
    const [isFocused, setIsFocused] = useState(false)
    const debouncedSearchTerm = useDebouncedValue(searchTerm, 250)
    const [suggestions, setSuggestions] = useState<autoCompleteSuggestion[]>([])
    const router = useRouter()

    const form = useForm<searchSchema>({
        resolver: zodResolver(searchSchema),
        defaultValues: {
            searchTerm: initialSearchTerm ?? '',
        },
    })

    const submit = async (value: searchSchema) => {
        try {
            setIsClicked(true)
            router.push(`/sok?searchTerm=${value.searchTerm}`)
            setIsClicked(false)
        } catch (error) {
            toast.error('något gick fel')
        }
    }

    useEffect(() => {
        const autoComplete = async () => {
            if (!!isFocused) {
                const datasets = await getDatasets(debouncedSearchTerm)
                const users = await getUsers(debouncedSearchTerm)

                setSuggestions([
                    ...datasetToSuggestion(datasets),
                    ...userToSuggestion(users),
                ])
            }
        }
        autoComplete()
    }, [debouncedSearchTerm, isFocused])

    const slowClose = () => {
        setTimeout(() => setIsFocused(false), 225)
    }

    const sugestionsOnFocus = async () => {
        const datasets = await getDatasets(debouncedSearchTerm)
        const users = await getUsers(debouncedSearchTerm)
        setSuggestions([
            ...datasetToSuggestion(datasets),
            ...userToSuggestion(users.filter((user) => user.id !== user.id)),
        ])
    }

    suggestions.sort((a, b) => {
        const aTitle = a.name.toLowerCase()
        const bTitle = b.name.toLowerCase()
        if (aTitle.startsWith(debouncedSearchTerm.toLowerCase())) {
            return -1
        }
        if (bTitle.startsWith(debouncedSearchTerm.toLowerCase())) {
            return 1
        }
        return 0
    })

    return (
        <search>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(submit)}
                    className="z-50 flex w-fit flex-col items-start max-sm:mt-1 max-sm:w-full sm:relative"
                    onChange={() => setSearchTerm(form.getValues('searchTerm'))}
                >
                    <div className="mb-[6px] flex max-w-[432px] gap-2 max-sm:w-full">
                        <FormField
                            control={form.control}
                            name="searchTerm"
                            render={({ field }) => (
                                <FormItem className="max-sm:w-full">
                                    <FormControl>
                                        <Input
                                            type="search"
                                            className="w-[384px] max-sm:w-full"
                                            placeholder="T.ex. Grillplatser"
                                            {...field}
                                            onFocus={() => {
                                                setIsFocused(true)
                                                sugestionsOnFocus()
                                            }}
                                            onBlur={() => slowClose()}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        {isClicked ? (
                            <Button type="submit" disabled>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                <Search />
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                                variant={'outline'}
                                className="w-10 p-2"
                            >
                                <Search />
                            </Button>
                        )}
                    </div>
                    {!!isFocused && (
                        <div className="absolute left-0 right-0 top-[1rem] z-10 mx-auto mt-11 h-fit w-[392px] rounded-md bg-white shadow max-sm:w-screen sm:right-12 sm:mx-0">
                            {suggestions.length > 0 &&
                            debouncedSearchTerm !== '' ? (
                                <div className="flex w-full flex-col py-2">
                                    {suggestions.map((suggestion) => {
                                        if (suggestion.type === 'dataset') {
                                            return (
                                                <Link
                                                    key={suggestion.name}
                                                    href={`/dataset/${suggestion.slug}`}
                                                    className="w-full px-3 py-1 text-sm hover:bg-slate-50"
                                                >
                                                    <Highlight
                                                        text={suggestion.name}
                                                        highlight={
                                                            debouncedSearchTerm
                                                        }
                                                    />
                                                </Link>
                                            )
                                        }
                                        return (
                                            <Link
                                                key={suggestion.name}
                                                href={`/profile/${suggestion.slug}`}
                                                className="w-full px-3 py-1 text-sm hover:bg-slate-50"
                                            >
                                                <Highlight
                                                    text={suggestion.name}
                                                    highlight={
                                                        debouncedSearchTerm
                                                    }
                                                />
                                            </Link>
                                        )
                                    })}
                                </div>
                            ) : (
                                <div className="flex w-full flex-col p-2">
                                    <p className="text-sm">
                                        Du kan söka på titlar, beskrivning eller
                                        taggar.
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </form>
            </Form>
        </search>
    )
}
