import Typography from '@/components/ui/Typography'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { ChevronRight, ExternalLink } from 'lucide-react'
import DataOwner from '@/components/dataOwner'
import Tags from '@/components/tag'
import { Datasets, ActivityFlow } from '@/components/dataset'
import { AuthorizedUserSchema, UserSchema } from '@/types/zod'
import { getDataset } from '@/adapters/api'
import { stringWithHyphen } from '@/lib/utils'
import * as api from '@/adapters/api'
import { loadAuthorizedUser } from '@/app/api/auth/utils'
import Image from 'next/image'
import Dataportal from '../../../../public/dataportal.png'
import Entryscape from '../../../../public/entryscape.png'
import Link from 'next/link'

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

    const dataset = await getDataset(stringWithHyphen(decodeURI(slug)))
    const events = await api.getEvents(dataset.id)

    return (
        <main className="grid items-stretch gap-9 px-4 py-8 sm:px-28 sm:py-9 lg:grid-cols-[1fr_auto_1fr]">
            <div className="flex flex-col gap-4">
                <Breadcrumb className="mb-2">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink className="text-xl" href="/">
                                Home
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="[&>svg]:size-5">
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
                <section className="flex flex-col gap-1">
                    <Typography level="Large">Externa länkar</Typography>

                    <ul className="flex flex-col gap-1">
                        <li className="flex items-center justify-between gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm sm:w-fit">
                            <div className="flex items-center gap-2">
                                <Image
                                    width={44}
                                    src={Dataportal}
                                    alt="Dataportal.se logo"
                                />
                                <b className="flex gap-1">
                                    Öppna på
                                    <Link
                                        href={`/dataset/${dataset.slug}`}
                                        className="text-cyan-700 underline"
                                    >
                                        Dataportal.se
                                    </Link>
                                </b>
                            </div>
                            <ExternalLink />
                        </li>
                        <li className="flex items-center justify-between gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm sm:w-fit">
                            <div className="flex items-center gap-2">
                                <Image
                                    width={44}
                                    src={Entryscape}
                                    alt="Dataportal.se logo"
                                />
                                <b className="flex gap-1">
                                    Öppna på
                                    <Link
                                        href={`/dataset/${dataset.slug}`}
                                        className="text-cyan-700 underline"
                                    >
                                        Entryscape.se
                                    </Link>
                                </b>
                            </div>
                            <ExternalLink />
                        </li>
                    </ul>
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
            <Separator orientation="horizontal" />
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
