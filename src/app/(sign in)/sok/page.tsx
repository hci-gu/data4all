import SearchBar from '@/components/searchBar'
import SearchResults from '@/components/searchResults'
import SearchTag from '@/components/sok/searchTag'
import SearchType from '@/components/sok/searchType'
import SearchFilters from '@/components/sok/searchFilters'
import Typography from '@/components/ui/Typography'
import { X } from 'lucide-react'
import Link from 'next/link'

export default async function page({
    searchParams,
}: {
    searchParams?: { [key: string]: string | undefined }
}) {
    const searchTerm = searchParams?.searchTerm
    const searchType = searchParams?.type
    const filter = searchParams?.filter
    const isDataOwner = searchParams?.isDataOwner

    const tag = searchParams?.tag

    return (
        <>
            <main className="flex w-full flex-col items-center">
                <div className="mb-8 mt-8 grid w-full max-w-[1220px] grid-cols-3 max-sm:hidden [&>button]:w-fit [&>h2]:border-none [&>h2]:text-center">
                    <Link href={'/'} className="flex items-center">
                        <X /> Stäng
                    </Link>
                    <Typography level="H2">Sök dataset</Typography>
                </div>

                <div className="max-sm:hidden">
                    <SearchBar initialSearchTerm={searchTerm} />
                    {tag && <SearchTag title={tag} />}
                </div>
                <SearchType />
                <SearchFilters />

                <SearchResults
                    searchTerm={searchTerm}
                    searchType={searchType ?? 'all'}
                    filter={filter}
                    isDataOwner={isDataOwner}
                    tag={tag}
                />
            </main>
        </>
    )
}
