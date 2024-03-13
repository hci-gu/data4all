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
export default function SignIn() {
    const router = useRouter()
    const form = useForm<signInSchema>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: 'styris.n@gmail.com',
            password: '&j7eKjmFE3zpGHet',
        },
    })
    const submit = async (value: signInSchema) => {
        const response = await fetch('/api/auth/sign-in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: value.email,
                password: value.password,
            }),
        })

        if (response.status === 200) {
            router.push('/')
        }
    }
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(submit)}
                // action="/api/auth/sign-in"
                // method="post"
                className="space-y-8"
            >
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
                <Button type="submit">
                    <EnvelopeClosedIcon className="mr-2" /> Logga in med mejl
                </Button>
            </form>
        </Form>
    )
}
