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
import { signInSchema } from '@/types/zod'
import { EnvelopeClosedIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'
import * as api from '@/adapters/api'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export default function SignIn() {
    const router = useRouter()
    const form = useForm<signInSchema>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })
    const submit = async (value: signInSchema) => {
        try {
            const user = await api.signIn(value)
            router.push('/')
        } catch (event) {
            form.setError('root', { message: 'Inloggnings uppgifter är fel' })
        }
    }
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(submit)}
                method="post"
                className="space-y-4"
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
                    name="root"
                    render={() => (
                        <FormItem>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex flex-col items-center gap-4 sm:items-start">
                    <Button type="submit">
                        <EnvelopeClosedIcon className="mr-2" /> Logga in med
                        mejl
                    </Button>
                    <Button className="sm:hidden" type="button" variant="link">
                        <Link
                            href="/skapa-konto"
                            className="flex items-center gap-1"
                        >
                            Skapa ett konto
                            <ChevronRight />
                        </Link>
                    </Button>
                </div>
            </form>
        </Form>
    )
}
