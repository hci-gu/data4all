import * as api from '@/adapters/api'
import SearchBar from '@/components/searchBar'
import SearchResults from '@/components/searchResults'
import Typography from '@/components/ui/Typography'
import WelcomeBack from '@/components/welcomeBack'
import { datasetsSchema } from '@/types/zod'
import { X } from 'lucide-react'
import Link from 'next/link'

export default async function page({
    searchParams,
}: {
    searchParams?: { [key: string]: string | undefined }
}) {
    const searchTerm = searchParams?.searchTerm
    const request = await api.getDatasets(searchTerm as string)
    const parssedRequest = datasetsSchema.safeParse(request)

    if (!parssedRequest.success) {
        return
    }
    const datasets = parssedRequest.data

    return (
        <>
            <main className="flex w-full flex-col items-center">
                {/* Welcome back is static for now */}
                <WelcomeBack />
                <div className="mb-8 grid w-full max-w-[1220px] grid-cols-3 [&>button]:w-fit [&>h2]:border-none [&>h2]:text-center">
                    <Link href={'/'} className="flex items-center">
                        <X /> Stäng
                    </Link>
                    <Typography level="H2">Sök dataset</Typography>
                </div>
                <SearchBar prevSearch={searchTerm} />
                <SearchResults records={datasets.records.items} />
            </main>
        </>
    )
}
