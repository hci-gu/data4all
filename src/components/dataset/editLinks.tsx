'use client'

import {
    AuthorizedUserSchema,
    datasetUpdateSchema,
    datasetWithRelationsSchema,
} from '@/types/zod'
import { ExternalLink, Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form'
import { updateDataset } from '@/app/actions/datasets'
import toast from 'react-hot-toast'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../ui/button'
import { useState } from 'react'
import { set } from 'zod'

function EditableLinks({
    dataset,
}: {
    dataset: datasetWithRelationsSchema
    loggedInUser: AuthorizedUserSchema
}) {
    const [loading, setLoading] = useState(false)
    const form = useForm({
        resolver: zodResolver(datasetUpdateSchema),
        defaultValues: {
            published: dataset.published,
            entryscape: dataset.entryscape,
        },
    })

    const submit = async (value: any) => {
        setLoading(true)
        const request = Promise.allSettled([
            updateDataset(dataset.id, {
                published: value.published,
                entryscape: value.entryscape,
            }),
            new Promise((resolve) => setTimeout(resolve, 700)),
        ])

        await toast.promise(request, {
            loading: 'Sparar länkar...',
            success: 'Länkar sparade',
            error: 'Något gick fel',
        })
        setLoading(false)
    }

    console.log(form.formState.errors)

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submit)} method="POST">
                <ul className="flex flex-col gap-1">
                    <li className="flex items-center justify-between gap-4 rounded-md border border-slate-200 px-3 py-2 text-sm sm:w-fit">
                        <Image
                            width={32}
                            height={32}
                            src={'/dataportal.png'}
                            alt="Dataportal.se logo"
                        />
                        <FormField
                            control={form.control}
                            name="published"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Länk till data</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Länk" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </li>
                    <li className="flex items-center justify-between gap-4 rounded-md border border-slate-200 px-3 py-2 text-sm sm:w-fit">
                        <Image
                            width={32}
                            height={32}
                            src={'/entryscape.png'}
                            alt="Entryscape logo"
                        />
                        <FormField
                            control={form.control}
                            name="entryscape"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Länk till entryscape</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Länk" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </li>
                </ul>
                <Button
                    type="submit"
                    className="mt-2 w-fit"
                    disabled={!form.formState.isValid || loading}
                >
                    {loading && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Uppdatera
                </Button>
            </form>
        </Form>
    )
}

export default function EditLinks({
    dataset,
    loggedInUser,
}: {
    dataset: datasetWithRelationsSchema
    loggedInUser: AuthorizedUserSchema
}) {
    const isOwner = dataset.dataowner?.id === loggedInUser.id

    if (isOwner) {
        return <EditableLinks dataset={dataset} loggedInUser={loggedInUser} />
    }

    return (
        <ul className="flex flex-col gap-1">
            {!dataset.published && !dataset.entryscape && (
                <li className="text-sm">Inga externa länkar</li>
            )}
            {dataset.published && (
                <li className="flex items-center justify-between gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm sm:w-fit">
                    <div className="flex items-center gap-2">
                        <Image
                            width={44}
                            height={44}
                            src={'/dataportal.png'}
                            alt="Dataportal.se logo"
                        />
                        <b className="flex gap-1">
                            Öppna på
                            <Link
                                href={dataset.published}
                                className="text-cyan-700 underline"
                            >
                                Dataportal.se
                            </Link>
                        </b>
                    </div>
                    <ExternalLink />
                </li>
            )}
            {dataset.entryscape && (
                <li className="flex items-center justify-between gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm sm:w-fit">
                    <div className="flex items-center gap-2">
                        <Image
                            width={60}
                            height={44}
                            src={'/entryscape.png'}
                            alt="Entryscape logo"
                        />
                        <b className="flex gap-1">
                            Öppna på
                            <Link
                                href={dataset.entryscape}
                                className="text-cyan-700 underline"
                            >
                                Entryscape.se
                            </Link>
                        </b>
                    </div>
                    <ExternalLink />
                </li>
            )}
        </ul>
    )
}
