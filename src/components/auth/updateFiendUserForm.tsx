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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import {
    AuthorizedUserSchema,
    roleSchema,
    updateFrendUserSchema,
} from '@/types/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

export default function UpdateFiendUserForm({
    user,
}: {
    user: AuthorizedUserSchema
}) {
    const form = useForm<updateFrendUserSchema>({
        resolver: zodResolver(updateFrendUserSchema),
        defaultValues: {
            email: user.email,
            role: user.role,
        },
    })

    const roles = Object.values(roleSchema.Values)

    return (
        <Form {...form}>
            <form
                className="flex w-[384px] flex-col gap-[10px] max-sm:w-full"
                method="POST"
            >
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mejl</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="email"
                                    disabled
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Arbetsroll</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger disabled>
                                            <SelectValue placeholder="Välj din arbetsroll" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {roles.map((role) => (
                                            <SelectItem value={role} key={role}>
                                                {role}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}
