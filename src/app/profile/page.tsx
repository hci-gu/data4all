'use client'
import { pb, removeUser, signOut } from '@/adapters/pocketbase'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { Form, useForm } from 'react-hook-form'
import { infer, z } from 'zod'

export default function () {
    const router = useRouter()

    const removeAccount = (userId: string) => {
        removeUser(userId)
        router.push('/SkapaKonto')
    }
    const user = pb.authStore.model
    console.log(user)

    const updateUserSchema = z
        .object({
            username: z.string().min(1, 'name is required'),
            email: z
                .string()
                .min(1, 'email is required')
                .email('invalid email'),
            password: z
                .string()
                .min(8, 'password needs to be at least 8 characters'),
            passwordConfirm: z
                .string()
                .min(8, 'password needs to be at least 8 characters'),
            role: z.string(),
        })
        .refine((data) => data.password === data.passwordConfirm, {
            path: ['passwordConfirm'],
            message: 'Passwords does not match',
        })

    const form = useForm<z.infer<typeof updateUserSchema>>({
        resolver: zodResolver(updateUserSchema),
        defaultValues: {
            username: user?.username,
            email: user?.email,
            role: user?.role,
        },
    })

    return (
        <main className="flex w-full justify-center gap-9 pt-8">
            <div className="flex w-[573.5px] flex-col gap-[10px]">
                <h1 className="text-5xl font-extrabold">Profil</h1>
                {/* form */}
                <Form {...form}>
                    <form className='flex flex-col gap-[10xp]'>
                        <FormField control={form.control} name='username' render={({field}) => (
                            <FormItem>
                                <FormLabel>Namn</FormLabel>
                                <FormControl>
                                    <Input placeholder='namn' {...field} />
                                </FormControl>
                            </FormItem>
                        )} />
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
