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
import DataOwner from '@/components/DataOwner'
import Tags from '@/components/Tag'
import Datasets from '@/components/Datasets'
import {
    AuthorizedUserSchema,
    EventAPISchema,
    UserSchema,
    datasetSchema,
} from '@/types/zod'
import { getDataset } from '@/adapters/api'
import { stringWithHyphen } from '@/lib/utils'
import { ZodError } from 'zod'
import * as api from '@/adapters/api'
import ActivityFlow from '@/components/ActivityFlow'
import { loadAuthorizedUser } from '@/app/api/auth/utils'
import { notFound } from 'next/navigation'

export default async function Page({
    params: { slug },
}: {
    params: { slug?: string }
}) {
    const authorizedUser = AuthorizedUserSchema.parse(loadAuthorizedUser())
    const user: UserSchema = {
        name: 'Sebastian Andreasson',
        role: 'Admin',
    }
    let TagsData: { title: string; href: string }[] = []
    const DatasetsData = [
        {
            title: 'Lekplatser',
            description:
                'Datamängden lekplatser omfattar barnvänliga områden där barn kan leka säkert.',
            href: '/dataset/Lekplatser',
        },
        {
            title: 'Badplatser',
            description:
                'Datamängden badplatser innehåller information om offentliga sjöar, floder eller pooler där invånare kan bada.',
            href: '/dataset/Badplatser',
        },
        {
            title: 'Badplatser',
            description:
                'Datamängden badplatser innehåller information om offentliga sjöar, floder eller pooler där invånare kan bada.',
            href: '/dataset/Badplatser',
        },
        {
            title: 'Badplatser',
            description:
                'Datamängden badplatser innehåller information om offentliga sjöar, floder eller pooler där invånare kan bada.',
            href: '/dataset/Badplatser',
        },
    ]
    let eventsRespond: EventAPISchema | undefined
    let parsedPageData: datasetSchema | null = null
    try {
        if (slug) {
            const pageData = datasetSchema.safeParse(
                await getDataset(stringWithHyphen(decodeURI(slug)))
            )

            if (!pageData.success) notFound()

            parsedPageData = pageData.data
            eventsRespond = EventAPISchema.parse(
                await api.getEvent(parsedPageData.records.id)
            )
            TagsData =
                parsedPageData.records.expand?.tag.map((tag) => ({
                    title: tag.name,
                    href: `/tag/${tag.name}`,
                })) ?? []
        }
    } catch (error) {
        if (error instanceof ZodError) {
            return new Error(error.errors[0].message)
        }
        throw new Error('Dataset hittades inte')
    }
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
                                href={`/dataset/${parsedPageData && stringWithHyphen(parsedPageData.records.title)}`}
                            >
                                {parsedPageData && parsedPageData.records.title}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <Typography level="H1">
                    {parsedPageData && parsedPageData.records.title}
                </Typography>
                <p className="max-w-prose text-sm">
                    {parsedPageData && parsedPageData.records.description}
                </p>
                <section aria-labelledby="DataOwner">
                    <DataOwner user={user} />
                </section>
                <section className="flex flex-col gap-1">
                    <Typography level="Large">Taggar</Typography>
                    {TagsData && <Tags Tags={TagsData} />}
                </section>
                <section
                    aria-labelledby="RelatedDatasets"
                    className="flex flex-col gap-2"
                >
                    <h2 id="RelatedDatasets" className="text-2xl font-bold">
                        Relaterade dataset
                    </h2>
                    <Datasets datasets={DatasetsData} />
                </section>
            </div>
            <Separator orientation="vertical" />
            {parsedPageData && (
                <ActivityFlow
                    user={authorizedUser}
                    datasetId={parsedPageData.records.id}
                    eventData={eventsRespond?.records.items ?? []}
                />
            )}
        </main>
    )
}
