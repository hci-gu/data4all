'use client'
import { pb, removeUser, signOut, updateUser } from '@/adapters/pocketbase'
import { Button } from '@/components/ui/button'
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
import { roleSchema } from '@/types/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const updateUserSchema = z
    .object({
        name: z.string().min(1, 'name is required'),
        email: z.string().min(1, 'email is required').email('invalid email'),
        oldPassword: z.string(),
        password: z.string(),
        passwordConfirm: z.string(),
        role: z.string(),
    })
    .refine((data) => data.password === data.passwordConfirm, {
        path: ['passwordConfirm'],
        message: 'Passwords does not match',
    })

export default function () {
    const router = useRouter()

    const removeAccount = (userId: string) => {
        removeUser(userId)
        router.push('/SkapaKonto')
    }
    const user = pb.authStore.model

    const roles = Object.values(roleSchema.Values)

    const form = useForm<z.infer<typeof updateUserSchema>>({
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

    const submit = (value: z.infer<typeof updateUserSchema>) => {
        const userId = pb.authStore.model?.id
        console.log(userId)
        console.log(pb.authStore.model)

        //@ts-ignore
        updateUser(value, userId)
    }

    return (
        <main className="flex h-[96vh] w-full justify-center gap-9 pt-8">
            <div className="flex w-[573.5px] flex-col gap-[10px]">
                <h1 className="text-5xl font-extrabold">Profil</h1>
                {/* form */}
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
                        <div>
                            <Button type="submit">Uppdatera</Button>
                        </div>
                    </form>
                </Form>
                <div className="h-[2px] w-full bg-slate-200"></div>
                {/* info */}
                <h2 className="text-3xl font-semibold">
                    Om Kungsbacka dataportal
                </h2>
                <p className="text-base">
                    Kungsbacka Dataportal är en innovativ digital plattform som
                    syftar till att öka öppenheten och tillgängligheten av data
                    inom Kungsbacka kommun. Genom att ge invånare, företagare,
                    forskare och andra intressenter tillgång till kvalitativ och
                    uppdaterad information, strävar portalen efter att stimulera
                    till innovation, förbättrad kommunikation och ökat
                    engagemang.
                </p>
                <div className="h-[2px] w-full bg-slate-200"></div>
                {/* logout and remove acc */}
                <div className="flex justify-start gap-[10px]">
                    <Button
                        variant={'outline'}
                        onClick={() => {
                            signOut()
                            router.push('/LogaIn')
                        }}
                    >
                        Logga ut
                    </Button>
                    <Button
                        variant={'destructive'}
                        onClick={() => removeAccount(user?.id)}
                    >
                        Ta bort konto
                    </Button>
                </div>
            </div>
            <div className="w-[2px] bg-slate-200"></div>
            <div className="w-[573.5px] flex-col gap-[10px]">
                <h2 className="text-center text-3xl font-semibold">
                    Dina dataset
                </h2>
            </div>
        </main>
    )
}
