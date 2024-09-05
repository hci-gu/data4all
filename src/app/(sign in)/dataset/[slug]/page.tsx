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
import { getSlug } from '@/lib/utils'

import Image from 'next/image'
import Link from 'next/link'
import { getDataset } from '@/app/actions/datasets'
import { getLoggedInUser } from '@/app/actions/auth'
import EditLinks from '@/components/dataset/editLinks'

export default async function Page({
    params: { slug },
}: {
    params: { slug: string }
}) {
    const dataset = await getDataset(getSlug(decodeURI(slug)))
    const loggedInUser = await getLoggedInUser()

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
                                href={`/dataset/${getSlug(dataset.title)}`}
                            >
                                {dataset.title}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <Typography level="H1">{dataset.title}</Typography>
                <p className="max-w-prose text-sm">{dataset.description}</p>
                <section aria-labelledby="DataOwner">
                    <DataOwner dataset={dataset} loggedInUser={loggedInUser} />
                </section>
                <section className="flex flex-col gap-1">
                    <Typography level="Large">Taggar</Typography>
                    {<Tags Tags={dataset.tags} />}
                </section>
                <section className="flex flex-col gap-1">
                    <Typography level="Large">Externa länkar</Typography>

                    <EditLinks dataset={dataset} loggedInUser={loggedInUser} />
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
            <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold">Aktivitet</h2>
                <ActivityFlow dataset={dataset} />
            </div>
        </main>
    )
}
