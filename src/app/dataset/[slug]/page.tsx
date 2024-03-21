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
import { UserSchema } from '@/types/zod'

export default function Page({
    params: { slug },
}: {
    params: { slug: string }
}) {
    const user: UserSchema = {
        id: 1,
        name: 'Sebastian Andreasson',
        roll: 'Admin',
    }
    const TagsData = [
        {
            id: 1,
            href: '/tag/Geodata',
            title: 'Geodata',
        },
        {
            id: 2,
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
                                href="/dataset/Parkeringsplatser"
                            >
                                Parkeringsplatser
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <Typography level="H1">Parkeringsplatser</Typography>
                <p className="max-w-prose text-sm">
                    Denna datamängd listar offentliga parkeringsplatser i
                    kommunen, inklusive platser, avgifter, tidsbegränsningar och
                    antal lediga platser. Den kan även inkludera information om
                    parkeringshus eller gatuparkering.
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

                <EventForm />

                <ul
                    className="flex flex-col gap-4"
                    aria-label="Aktivitets flödet"
                >
                    <li className="flex gap-2">
                        <Avatar>
                            <AvatarImage src="https://github.com/josefforkman.png" />
                            <AvatarFallback>SA</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-1">
                            <p className="text-xs">
                                <b>Jonathan Crusoe</b> föreslog sig själv som
                                dataägare
                            </p>
                            <b className="text-xs">4 timmar sedan</b>
                        </div>
                    </li>
                    <li className="flex gap-2">
                        <Avatar>
                            <AvatarImage src="https://github.com/josefforkman.png" />
                            <AvatarFallback>SA</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-1">
                            <p className="text-xs">
                                <b>Jonathan Crusoe</b> föreslog sig själv som
                                dataägare
                            </p>
                            <b className="text-xs">4 timmar sedan</b>
                        </div>
                    </li>
                </ul>
            </div>
        </main>
    )
}
