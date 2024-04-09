import * as api from '@/adapters/api'
import SearchBar from '@/components/searchBar'
import SearchResults from '@/components/searchResults'
import Typography from '@/components/ui/Typography'
import WelcomeBack from '@/components/welcomeBack'
import { X } from 'lucide-react'
import Link from 'next/link'

export default async function page({
    searchParams,
}: {
    searchParams?: { [key: string]: string | undefined }
}) {
    const searchTerm = searchParams?.searchTerm
    const datasets = await api.getDatasets(searchTerm as string)

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
                <SearchBar initialSearchTerm={searchTerm} />
                <SearchResults records={datasets} />
            </main>
        </>
    )
}
