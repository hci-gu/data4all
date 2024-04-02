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
import Datasets from '@/components/datasets'
import { AuthorizedUserSchema, UserSchema } from '@/types/zod'
import { getDataset } from '@/adapters/api'
import { stringWithHyphen } from '@/lib/utils'
import * as api from '@/adapters/api'
import ActivityFlow from '@/components/activityFlow'
import { loadAuthorizedUser } from '@/app/api/auth/utils'

export default async function Page({
    params: { slug },
}: {
    params: { slug: string }
}) {
    const authorizedUser = AuthorizedUserSchema.parse(loadAuthorizedUser())
    const user: UserSchema = {
        name: 'Sebastian Andreasson',
        role: 'Admin',
    }
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

    const PageData = await getDataset(stringWithHyphen(decodeURI(slug)))
    const eventsRespond = await api.getEvents(PageData.id)

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
                                href={`/dataset/${stringWithHyphen(PageData.title)}`}
                            >
                                {PageData && PageData.title}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <Typography level="H1">{PageData.title}</Typography>
                <p className="max-w-prose text-sm">{PageData.description}</p>
                <section aria-labelledby="DataOwner">
                    <DataOwner user={user} />
                </section>
                <section className="flex flex-col gap-1">
                    <Typography level="Large">Taggar</Typography>
                    {<Tags Tags={PageData.tags} />}
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
            {
                <ActivityFlow
                    user={authorizedUser}
                    datasetId={PageData.id}
                    eventData={eventsRespond ?? []}
                />
            }
        </main>
    )
}
