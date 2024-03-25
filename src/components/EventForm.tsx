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
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { AuthorizedUserSchema, EventSchema } from '@/types/zod'
import { getInitials } from '@/lib/utils'
import { createEvent } from '@/adapters/api'

export default function EventForm({ user, datasetId }: { user: AuthorizedUserSchema, datasetId: string }) {
    const formSchema = z.object({
        comment: z.string().min(2, {
            message: 'Kommentaren måste vara minst 2 tecken lång.',
        }),
    })
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            comment: '',
        },
    })
    async function onSubmit(values: z.infer<typeof formSchema>, datasetId: string) {
        const event: EventSchema = {
            user: user.id,
            content: values.comment,
            dataset: datasetId,
            types: 'comment'
        }
        await createEvent(event)
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit((value) => onSubmit(value, datasetId))} className="space-y-8">
                <FormField
                    control={form.control}
                    name="comment"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="sr-only">Kommentar</FormLabel>
                            <FormControl>
                                <div className="flex gap-2">
                                    <Avatar>
                                        <AvatarFallback>
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
