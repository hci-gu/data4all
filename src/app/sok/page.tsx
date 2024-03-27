import * as api from '@/adapters/api'
import DatasetCard from '@/components/datasetCard'
import SearchBar from '@/components/searchBar'
import SearchResults from '@/components/searchResults'
import Typography from '@/components/ui/Typography'
import { Button } from '@/components/ui/button'
import { datasetSchema } from '@/types/zod'
import { X } from 'lucide-react'
import Link from 'next/link'
import { z } from 'zod'

export default async function page({
    searchParams,
}: {
    searchParams?: { [key: string]: string | undefined }
}) {
    const searchTerm = searchParams?.searchTerm

    const request = await api.getDatasets(searchTerm as string)
    const parsedRequest = z
        .array(datasetSchema)
        .safeParse(request.records.items)
    if (!parsedRequest.success) {
        return
    }
    const datasets = parsedRequest.data

    return (
        <>
            <main className="flex w-full flex-col items-center">
                {/* welcome back comp */}
                {/* search comp */}
                <div className="mb-8 grid w-full max-w-[1220px] grid-cols-3 [&>button]:w-fit [&>h2]:border-none [&>h2]:text-center">
                    {/* header */}
                    <Link href={'/'} className="flex items-center">
                        <X /> Stäng
                    </Link>
                    <Typography level="H2">Sök dataset</Typography>
                </div>
                {/* search box */}
                <SearchBar prevSearch={searchTerm} />
                <SearchResults records={datasets} />
            </main>
        </>
    )
}
