import WelcomeBack from '@/components/welcomeBack'
import Typography from '@/components/ui/Typography'
import SearchBar from '@/components/searchBar'
import { Separator } from '@/components/ui/separator'
import { cookies } from 'next/headers'

export default function Home() {
    const authCookie = cookies().get('PBAuth')?.value
    return (
        <main className="flex min-h-screen flex-col items-center">
            <WelcomeBack homePage={true} />
            <div className="grid grid-cols-[1fr_auto_1fr] items-stretch gap-9 px-28 py-9">
                <div className="flex flex-col items-center gap-8 [&>h2]:border-none">
                    <Typography level="H2">Sök dataset</Typography>
                    <SearchBar authCookie={authCookie} />
                </div>
                <Separator orientation="vertical" />
                <div>Flöde</div>
            </div>
        </main>
    )
}
