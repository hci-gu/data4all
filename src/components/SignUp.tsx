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
import { roleSchema, siginUpSchema } from '@/types/zod'
import { useRouter } from 'next/navigation'
import { EnvelopeClosedIcon } from '@radix-ui/react-icons'
import { signUp } from '@/adapters/api'
export default function SignUp() {
    const router = useRouter()
    const form = useForm<siginUpSchema>({
        resolver: zodResolver(siginUpSchema),
        defaultValues: {
            email: 'styris.n@gmail.com',
            password: 'j7eKjmFE3zpGHet',
            passwordConfirmation: 'j7eKjmFE3zpGHet',
            role: 'User',
        },
        resetOptions: {
            keepIsSubmitSuccessful: true,
        },
    })
    const submit = async (value: siginUpSchema) => {
        if (await signUp(value)) router.push('/loga-in')
    }

    const rols = Object.values(roleSchema.Values)

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
                                        {rols.map((role) => (
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
                <Button type="submit">
                    <EnvelopeClosedIcon className="mr-2" />
                    Skapa konto
                </Button>
            </form>
        </Form>
    )
}
