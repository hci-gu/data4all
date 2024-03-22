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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import EventForm from '@/components/EventForm'
import DataOwner from '@/components/DataOwner'
import Tags from '@/components/Tag'
import Datasets from '@/components/Datasets'
import { AuthorizedUserSchema, EventSchema, UserSchema, datasetSchema } from '@/types/zod'
import { getDataset } from '@/adapters/api'
import { datasetWithSpace, datasetWithUnderscore } from '@/lib/utils'
import { ZodError } from 'zod'
import * as api from '@/adapters/api'
import { loadAuthorizedUser } from '@/app/api/auth/utils'
import moment from "moment";

export default async function Page({
    params: { slug },
}: {
    params: { slug?: string }
}) {
    // const router = useRouter()
    const AuthorizedUser = AuthorizedUserSchema.parse(loadAuthorizedUser())
    const user: UserSchema = {
        name: 'Sebastian Andreasson',
        role: 'Admin',
    }
    const TagsData = [
        {
            href: '/tag/Geodata',
            title: 'Geodata',
        },
        {
            href: '/tag/Miljö',
            title: 'Miljö',
        },
    ]
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

    let parsedPageData: datasetSchema | null = null
    let events: EventSchema | null = null
    try {
        if (slug) {
            const pageData = await getDataset(datasetWithSpace(decodeURI(slug)))
            parsedPageData = datasetSchema.parse(pageData)
            events = EventSchema.parse(await api.getEvent(parsedPageData.records.id))
        }
    } catch (error) {
        if (error instanceof ZodError) {
            throw new Error(error.errors[0].message)
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
                                href={`/dataset/${parsedPageData && datasetWithUnderscore(parsedPageData.records.title)}`}
                            >
                                {parsedPageData && parsedPageData.records.title}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <Typography level="H1">{parsedPageData && parsedPageData.records.title}</Typography>
                <p className="max-w-prose text-sm">
                    {parsedPageData && parsedPageData.records.description}
                </p>
                <section aria-labelledby="DataOwner">
                    <DataOwner user={user} />
                </section>
                <section className="flex flex-col gap-1">
                    <Typography level="Large">Taggar</Typography>
                    <Tags Tags={TagsData} />
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
            <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold">Aktivitet</h2>
                <p className="text-sm">
                    Bli den första att skriva något kring det här datasetet.
                </p>

                <EventForm user={AuthorizedUser} />

                <ul
                    className="flex flex-col gap-4"
                    aria-label="Aktivitets flödet"
                >
                    {events && events.records.items.map((event) => (
                        <li className="flex gap-2">
                            <Avatar>
                                <AvatarFallback>e</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col gap-1">
                                <div dangerouslySetInnerHTML={{ __html: event.content }} />
                                <b className="text-xs">{moment(event.created).fromNow()}</b>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    )
}
