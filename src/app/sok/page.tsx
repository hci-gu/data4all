import * as api from '@/adapters/api'
import SearchBar from '@/components/searchBar'
import SearchResults from '@/components/searchResults'
import Typography from '@/components/ui/Typography'
import WelcomeBack from '@/components/welcomeBack'
import { X } from 'lucide-react'
import { cookies } from 'next/headers'
import Link from 'next/link'

export default async function page({
    searchParams,
}: {
    searchParams?: { [key: string]: string | undefined }
}) {
    const authCookie = cookies().get('PBAuth')?.value
    const searchTerm = searchParams?.searchTerm
    api.pb.authStore.loadFromCookie(authCookie as string)

    const datasets = await api.getDatasets(
        searchTerm as string,
        authCookie as string
    )

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
                <SearchBar
                    initialSearchTerm={searchTerm}
                    authCookie={authCookie}
                />
                <SearchResults records={datasets} />
            </main>
        </>
    )
}
