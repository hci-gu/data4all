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
import Typography from '@/components/ui/Typography'
import Image from 'next/image'
import absurd from '../../../public/absurd 2.png'
import { roleSchema, siginUpSchema } from '@/types/zod'
import { signUp } from '@/adapters/pocketbase'
import { EnvelopeClosedIcon } from '@radix-ui/react-icons'

export default function () {
    const form = useForm<siginUpSchema>({
        resolver: zodResolver(siginUpSchema),
        defaultValues: {
            email: 'exampel@kungsbacka.se',
            password: 'password',
            passwordConfirmation: 'password',
            role: 'User',
        },
        resetOptions: {
            keepIsSubmitSuccessful: true,
        },
    })
    const submit = async (value: siginUpSchema) => {
        console.log({ value })
        const user = await signUp(value)
        console.log({ user });
    }

    const rols = Object.values(roleSchema.Values)

    return (
        <main className="grid grid-cols-2 h-screen">
            <div className="bg-black flex items-center px-40">
                <Image src={absurd} alt="" />
            </div>
            <div className="flex flex-col gap-12 justify-center mx-auto">
                <div>
                    <Typography level="H1">Skapa konto</Typography>
                    <Typography level="P">
                        Om du har en @kungsbacka.se mejl kan du skapa ett konto.
                    </Typography>
                </div>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(submit)}
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
                                                    <SelectItem
                                                        value={role}
                                                        key={role}
                                                    >
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
                        <Button type="submit"><EnvelopeClosedIcon className='mr-2' />Skapa konto</Button>
                    </form>
                </Form>
            </div>
        </main>
    )
}
