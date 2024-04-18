'use client'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { AuthorizedUserSchema, EventSchema } from '@/types/zod'
import { getInitials } from '@/lib/utils'
import { createEvent } from '@/adapters/api'
import { z } from 'zod'
import { Dispatch, SetStateAction } from 'react'

export default function EventForm({
    user,
    datasetId,
    setEvents,
}: {
    user: AuthorizedUserSchema
    datasetId: string
    setEvents: Dispatch<SetStateAction<EventSchema[]>>
}) {
    const formSchema = z.object({
        comment: z.string().min(2, {
            message: 'Kommentaren måste vara minst 2 tecken lång.',
        }),
    })
    type formSchema = z.infer<typeof formSchema>

    const form = useForm<formSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            comment: '',
        },
    })
    async function onSubmit(values: formSchema) {
        const event: EventSchema = {
            user,
            content: values.comment,
            dataset: datasetId,
            types: 'comment',
        }
        await createEvent(event)
        setEvents((prev) => [...prev, event])
        form.reset()
    }
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
            >
                <FormField
                    control={form.control}
                    name="comment"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="sr-only">Kommentar</FormLabel>
                            <FormControl>
                                <div className="flex items-center gap-2">
                                    <Avatar className="h-6 w-6">
                                        <AvatarFallback className="text-[0.5625rem]">
                                            {getInitials(user.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <Input
                                        placeholder="Skriv en kommentar..."
                                        {...field}
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}
