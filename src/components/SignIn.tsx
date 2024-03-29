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
            await api.signIn(value)
            router.push('/')
        } catch (e) {
            form.setError('root', { message: 'Inloggnings uppgifter är fel' })
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mail</FormLabel>
                            <FormControl>
                                <Input placeholder="Mail" {...field} />
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
                    render={({ field }) => (
                        <FormItem>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">
                    <EnvelopeClosedIcon className="mr-2" /> Logga in med mejl
                </Button>
            </form>
        </Form>
    )
}
