'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
} from './ui/form'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import * as api from '@/adapters/api'
import { datasetSchema } from '@/types/zod'
import Link from 'next/link'
const searchSchema = z.object({
    searchTerm: z.string().min(1),
})
type searchSchema = z.infer<typeof searchSchema>

const useDebouncedValue = (inputValue: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(inputValue)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(inputValue)
        }, delay)

        return () => {
            clearTimeout(handler)
        }
    }, [inputValue, delay])

    return debouncedValue
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
    const [suggestions, setSuggestions] = useState<datasetSchema[]>([])
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

    const autoComplete = async () => {
        if (!!isFocused) {
            setSuggestions(await api.getDatasets(debouncedSearchTerm))
        }
    }

    useEffect(() => {
        console.log('asd')

        autoComplete()
    }, [debouncedSearchTerm])

    const slowClose = () => {
        setTimeout(() => setIsFocused(false), 225)
    }

    const sugestionsOnFocus = async () => {
        setSuggestions(await api.getDatasets(debouncedSearchTerm))
    }

    suggestions.sort((a, b) => {
        const aTitle = a.title.toLowerCase()
        const bTitle = b.title.toLowerCase()
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
                    className="z-50 flex w-fit flex-col items-start max-sm:mt-1 max-sm:w-full"
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
                        <div className="absolute left-0 right-0 top-[1rem] z-10 mx-auto mt-11 h-fit w-[392px] rounded-md bg-white shadow max-sm:w-screen">
                            {suggestions.length > 0 &&
                            debouncedSearchTerm !== '' ? (
                                <div className="flex w-full flex-col py-2">
                                    {suggestions.map((suggestion) => (
                                        <Link
                                            key={
                                                suggestion.id + suggestion.title
                                            }
                                            href={`/dataset/${suggestion.slug}`}
                                            className="w-full px-3 py-1 text-sm hover:bg-slate-50"
                                        >
                                            <Highlight
                                                text={suggestion.title}
                                                highlight={debouncedSearchTerm}
                                            />
                                        </Link>
                                    ))}
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
                    {/* <FormDescription>
                        Du kan söka på titlar, beskrivning eller taggar.
                    </FormDescription> */}
                </form>
            </Form>
        </search>
    )
}
