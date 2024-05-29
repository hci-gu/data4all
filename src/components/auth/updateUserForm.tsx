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
import { updateUserSchema } from '@/types/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { getRoles, getUser, updateUser } from '@/adapters/api'
import toast from 'react-hot-toast'
import { useContext, useState } from 'react'
import { Loader2 } from 'lucide-react'
import { authContext } from '@/lib/context/authContext'

export default function UpdateUserForm({ roles }: { roles: any[] }) {
    const userContext = useContext(authContext)
    const user = userContext.auth
    const cookie = userContext.cookie

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
            slug: user.slug,
        },
    })

    const submit = async (value: updateUserSchema) => {
        setIsClicked(true)

        try {
            const userDB = await getUser(value.name, cookie)
            if (userDB.id !== user.id) {
                toast.error('Användarnamnet är upptaget')
                form.setError('name', { message: 'Användarnamnet är upptaget' })
                setIsClicked(false)

                return
            }
        } catch (error) {
            setIsClicked(false)
        }

        const request = Promise.allSettled([
            updateUser(value, user.id, cookie),
            new Promise((resolve) => setTimeout(resolve, 700)),
        ])
            .then((res) => {
                userContext.setAuth(
                    res[0].status === 'fulfilled' ? res[0].value : user
                )
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
                <div className={form.getValues('password') ? '' : 'hidden'}>
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
                <div className={form.getValues('password') ? '' : 'hidden'}>
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
                                            <SelectItem
                                                value={role.name}
                                                key={role.name}
                                            >
                                                {role.name}
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
