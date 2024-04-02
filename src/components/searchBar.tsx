'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
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

const searchSchema = z.object({
    searchTerm: z.string().min(1),
})
type searchSchema = z.infer<typeof searchSchema>
export default function SearchBar({ prevSearch }: { prevSearch?: string }) {
    const [isClicked, setIsClicked] = useState(false)
    const router = useRouter()
    const form = useForm<searchSchema>({
        resolver: zodResolver(searchSchema),
        defaultValues: {
            searchTerm: prevSearch ?? '',
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

    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(submit)}
                    className="flex w-fit flex-col items-start"
                >
                    <div className="mb-[6px] flex max-w-[432px] gap-2">
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
                    <FormDescription>
                        Du kan söka på titlar, beskrivning eller taggar.
                    </FormDescription>
                </form>
            </Form>
        </>
    )
}
