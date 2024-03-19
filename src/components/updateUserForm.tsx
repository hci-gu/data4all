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
import { roleSchema, updateUserSchema } from '@/types/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from './ui/button'
import { updateUser } from '@/adapters/api'
import { useRouter } from 'next/navigation'
import { AuthModel } from 'pocketbase'
import toast from 'react-hot-toast'

export default function UpdateUserForm({ user }: { user: AuthModel }) {
    const form = useForm<updateUserSchema>({
        resolver: zodResolver(updateUserSchema),
        defaultValues: {
            name: user?.name,
            email: user?.email,
            oldPassword: '',
            password: '',
            passwordConfirm: '',
            role: user?.role,
        },
    })

    const roles = Object.values(roleSchema.Values)
    const router = useRouter()

    const submit = async (value: updateUserSchema) => {
        try {
            await updateUser(value, user?.id)
            router.refresh()
        } catch (e) {
            toast.error('Något gick fel')
        }
    }
    return (
        <Form {...form}>
            <form
                className="flex w-[384px] flex-col gap-[10px]"
                onSubmit={form.handleSubmit(submit)}
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Namn</FormLabel>
                            <FormControl>
                                <Input placeholder="namn" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mejl</FormLabel>
                            <FormControl>
                                <Input placeholder="email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Lösenord</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Lösenord"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="oldPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nuvarande lösenord</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Nuvarande lösenord"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="passwordConfirm"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Bekräfta lösenord</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Bekräfta lösenord"
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
                                        <SelectTrigger>
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
                <div>
                    <Button type="submit">Uppdatera</Button>
                </div>
            </form>
        </Form>
    )
}
