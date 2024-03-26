'use client'
import * as api from '@/adapters/api'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { Button } from '../../ui/button'

const searchSchema = z.object({
    searchTerm: z.string().min(1),
})
type searchSchema = z.infer<typeof searchSchema>
export default function SearchBar({
    onFormSubmit,
}: {
    onFormSubmit: (datasets: any[]) => void
}) {
    const [isClicked, setIsClicked] = useState(false)
    const form = useForm<searchSchema>({
        resolver: zodResolver(searchSchema),
        defaultValues: {
            searchTerm: '',
        },
    })

    const submit = async (value: searchSchema) => {
        try {
            setIsClicked(true)
            console.log(value.searchTerm)

            const records = await api.getDatasets(value.searchTerm)
            if (records) setIsClicked(false)
            console.log(records.records)

            onFormSubmit(records.records)
        } catch (error) {
            setIsClicked(false)
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
                                Sök
                            </Button>
                        ) : (
                            <Button type="submit">sök</Button>
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
