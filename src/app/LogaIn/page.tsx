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
import Typography from '@/components/ui/Typography'
import Image from 'next/image'
import absurd from '../../../public/absurd 1.png'
import { signInSchema } from '@/types/zod'
import { signIn } from '@/adapters/pocketbase'

export default function () {
    const form = useForm<signInSchema>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: 'exampel@kungsbacka.se',
            password: 'password',
        },
    })
    const submit = async (value: signInSchema) => {
        console.log(value)
        const user = await signIn(value);
        console.log({ user });
    }

    return (
        <main className="grid grid-cols-2 h-screen">
            <div className="bg-black flex items-center px-40">
                <Image src={absurd} alt="" />
            </div>
            <div className="flex flex-col gap-12 justify-center mx-auto">
                <div>
                    <Typography level="H1">Logga in</Typography>
                    <Typography level="P">
                        För att komma åt Dataportalen så behöver du ha fått en
                        inbjudan.
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
                        <Button type="submit">Logga in med mejl</Button>
                    </form>
                </Form>
            </div>
        </main>
    )
}
