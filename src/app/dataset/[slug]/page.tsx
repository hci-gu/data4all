import Typography from '@/components/ui/Typography'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { ChevronRight } from 'lucide-react'
import DataOwner from '@/components/dataOwner'
import Tags from '@/components/tag'
import { Datasets, ActivityFlow } from '@/components/dataset'
import { AuthorizedUserSchema, UserSchema } from '@/types/zod'
import { getDataset } from '@/adapters/api'
import { createTag, stringWithHyphen } from '@/lib/utils'
import { ZodError } from 'zod'
import * as api from '@/adapters/api'
import { loadAuthorizedUser } from '@/app/api/auth/utils'
import { cookies } from 'next/headers'

export default async function Page({
    params: { slug },
}: {
    params: { slug: string }
}) {
    const authorizedUser = AuthorizedUserSchema.parse(loadAuthorizedUser())
    const authCookie = cookies().get('PBAuth')?.value
    const user: UserSchema = {
        name: 'Sebastian Andreasson',
        role: 'Admin',
    }

    const dataset = await getDataset(
        stringWithHyphen(decodeURI(slug)),
        authCookie as string
    )
    const events = await api.getEvents(dataset.id, authCookie as string)

    return (
        <main className="grid grid-cols-[1fr_auto_1fr] items-stretch gap-9 px-28 py-9">
            <div className="flex flex-col gap-4">
                <Breadcrumb className="mb-2">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink className="text-xl" href="/">
                                Home
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="text-2xl [&>svg]:size-5">
                            <ChevronRight />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbLink
                                className="text-xl font-bold"
                                href={`/dataset/${stringWithHyphen(dataset.title)}`}
                            >
                                {dataset.title}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <Typography level="H1">{dataset.title}</Typography>
                <p className="max-w-prose text-sm">{dataset.description}</p>
                <section aria-labelledby="DataOwner">
                    <DataOwner user={user} />
                </section>
                <section className="flex flex-col gap-1">
                    <Typography level="Large">Taggar</Typography>
                    {<Tags Tags={dataset.tags} />}
                </section>
                <section
                    aria-labelledby="RelatedDatasets"
                    className="flex flex-col gap-2"
                >
                    <h2 id="RelatedDatasets" className="text-2xl font-bold">
                        Relaterade dataset
                    </h2>
                    <Datasets datasets={dataset.relatedDatasets} />
                </section>
            </div>
            <Separator orientation="vertical" />
            {
                <ActivityFlow
                    user={authorizedUser}
                    datasetId={dataset.id}
                    initialEvents={events ?? []}
                />
            }
        </main>
    )
}
