'use client'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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
import { signUpSchema } from '@/types/zod'
import { useRouter } from 'next/navigation'
import { EnvelopeClosedIcon } from '@radix-ui/react-icons'
import * as api from '@/adapters/api'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { stringWithHyphen } from '@/lib/utils'
import { useEffect } from 'react'

export default function SignUp({ roles }: { roles: any[] }) {
    const router = useRouter()
    const form = useForm<signUpSchema>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: '',
            password: '',
            passwordConfirmation: '',
        },
        resetOptions: {
            keepIsSubmitSuccessful: true,
        },
    })
    const submit = async (value: signUpSchema) => {
        try {
            await api.signUp(value)
            router.push('/logga-in')
        } catch (e) {
            form.reset()
            form.setError('root', { message: 'Du är redan registrerad' })
        }
    }

    useEffect(() => {
        form.setValue('slug', stringWithHyphen(form.getValues('email')))
    }, [form.watch('email')])

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(submit)}
                className="space-y-4"
                method="post"
            >
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mail</FormLabel>
                            <FormControl>
                                <Input
                                    type="email"
                                    placeholder="Mail"
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
                    name="passwordConfirmation"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Upprepa lösenord</FormLabel>
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
                <FormField
                    name="root"
                    render={({ field }) => (
                        <FormItem>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="sr-only">slug</FormLabel>
                            <FormControl>
                                <Input
                                    type="hidden"
                                    placeholder="Slug"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <div className="flex flex-col items-center gap-4">
                    <Button type="submit">
                        <EnvelopeClosedIcon className="mr-2" />
                        Skapa konto
                    </Button>
                    <Button className="sm:hidden" type="button" variant="link">
                        <Link
                            href="/logga-in"
                            className="flex items-center gap-1"
                        >
                            Logga in istället
                            <ChevronRight />
                        </Link>
                    </Button>
                </div>
            </form>
        </Form>
    )
}
