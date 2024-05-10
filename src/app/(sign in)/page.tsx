import WelcomeBack from '@/components/welcomeBack'
import Typography from '@/components/ui/Typography'
import SearchBar from '@/components/searchBar'
import { Separator } from '@/components/ui/separator'
import ActivityFeed from '@/components/activityFeed'

export default async function Home() {
    return (
        <main className="flex w-full flex-col items-center">
            <WelcomeBack homePage={true} />
            <div className="grid grid-cols-[1fr_auto_1fr] items-stretch gap-9 px-28 py-9 max-sm:flex max-sm:flex-col">
                <div className="flex flex-col items-center gap-8 max-sm:hidden [&>h2]:border-none">
                    <Typography level="H2">Sök dataset</Typography>
                    <SearchBar />
                </div>
                <Separator orientation="vertical" />
                <ActivityFeed />
            </div>
        </main>
    )
}
