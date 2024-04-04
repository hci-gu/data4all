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

export default function SearchBar({
    initialSearchTerm,
}: {
    initialSearchTerm?: string
}) {
    const [isClicked, setIsClicked] = useState(false)
    const [searchTerm, setSearchTerm] = useState(initialSearchTerm ?? '')
    const [isFocused, setIsFocused] = useState(false)
    const debouncedSearchTerm = useDebouncedValue(searchTerm, 250)
    const [sugestions, setSugestions] = useState<datasetSchema[]>([])
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
            setSugestions(await api.getDatasets(debouncedSearchTerm))
            console.log(sugestions)
        }
    }

    useEffect(() => {
        autoComplete()
    }, [debouncedSearchTerm])

    const slowClose = () => {
        setTimeout(() => setIsFocused(false), 225)
    }

    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(submit)}
                    className="relative z-50 flex w-fit flex-col items-start"
                    onChange={() => setSearchTerm(form.getValues('searchTerm'))}
                >
                    <div className="mb-[6px] flex max-w-[432px] flex-wrap gap-2">
                        <FormField
                            control={form.control}
                            name="searchTerm"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            className="w-[384px]"
                                            placeholder="T.ex. Grillplatser"
                                            {...field}
                                            onFocus={() => setIsFocused(true)}
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
                        <>
                            <div className="absolute left-[-4px] top-[0.30rem] z-10 mt-11 h-fit w-[392px] rounded-md  bg-white shadow">
                                <div className="flex w-full flex-col py-2">
                                    {sugestions.map((sugestion) => (
                                        <>
                                            <Link
                                                href={`/dataset/${sugestion.slug}`}
                                                className="w-full px-3 py-1 text-sm hover:bg-slate-50"
                                            >
                                                {sugestion.title}
                                            </Link>
                                        </>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                    <FormDescription>
                        Du kan söka på titlar, beskrivning eller taggar.
                    </FormDescription>
                </form>
            </Form>
        </>
    )
}
