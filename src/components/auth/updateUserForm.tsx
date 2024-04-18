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
import { AuthorizedUserSchema, roleSchema, updateUserSchema } from '@/types/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { updateUser } from '@/adapters/api'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'

export default function UpdateUserForm({
    user,
    authCookie,
}: {
    user: AuthorizedUserSchema
    authCookie: string
}) {
    const [isClicked, setIsClicked] = useState(false)
    const form = useForm<updateUserSchema>({
        resolver: zodResolver(updateUserSchema),
        defaultValues: {
            name: user.name,
            email: user.email,
            oldPassword: '',
            password: '',
            passwordConfirm: '',
            role: user.role,
        },
    })

    const roles = Object.values(roleSchema.Values)
    const router = useRouter()

    const submit = (value: updateUserSchema) => {
        setIsClicked(true)
        const request = Promise.allSettled([
            updateUser(value, user.id, authCookie),
            new Promise((resolve) => setTimeout(resolve, 700)),
        ])
            .then(() => {
                router.refresh()
                setIsClicked(false)
            })
            .catch(() => {
                setIsClicked(false)
            })

        if (!isClicked) {
            toast.promise(request, {
                loading: 'Uppdaterar användaren',
                success: 'Användaren uppdaterad',
                error: 'Något gick fel',
            })
        }
    }
    return (
        <Form {...form}>
            <form
                className="flex w-[384px] flex-col gap-[10px] max-sm:w-full"
                onSubmit={form.handleSubmit(submit)}
                method="POST"
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
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nytt lösenord</FormLabel>
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
                <div
                    className={form.getValues().password !== '' ? '' : 'hidden'}
                >
                    <FormField
                        control={form.control}
                        name="passwordConfirm"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Bekräfta nytt lösenord</FormLabel>
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
                </div>
                <div
                    className={form.getValues().password !== '' ? '' : 'hidden'}
                >
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
                </div>
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
                <div className="w-full">
                    {isClicked ? (
                        <Button type="submit" disabled className="w-full">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Uppdatera
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full">
                            Uppdatera
                        </Button>
                    )}
                </div>
            </form>
        </Form>
    )
}
