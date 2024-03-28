import * as api from '@/adapters/api'
import { loadAuthorizedUser } from './api/auth/utils'
import { EventAPISchema } from '@/types/zod'
import WelcomeBack from '@/components/welcomeBack'
import Typography from '@/components/ui/Typography'
import SearchBar from '@/components/searchBar'
import { Separator } from '@/components/ui/separator'


export default function Home() {
    const user = loadAuthorizedUser()

    const run = async () => {
        const resDataset = await api.getAllDatasets()
        const resSingleDataset = await api.getDataset(
            'Financial Fraud Detection Dataset'
        )

        if (user) {
            const resDatasetFromUserEvent = await api.getDatasetFromUserEvent(
                user.id
            )
        }

        const resEvent = EventAPISchema.safeParse(
            await api.getEvent('qg80nv4p4728w0j')
        ) // swap out for a working id in your pb

        if (!resEvent.success) {
            console.error('resEvent.error', resEvent.error)
            return
        }
    }
    run()

    return (
        <main className="flex min-h-screen flex-col items-center">
            <WelcomeBack homePage={true} />
            <div className="grid grid-cols-[1fr_auto_1fr] items-stretch gap-9 px-28 py-9">
                <div className="flex flex-col items-center gap-8 [&>h2]:border-none">
                    <Typography level="H2">Sök dataset</Typography>
                    <SearchBar />
                </div>
                <Separator orientation="vertical" />
                <div>Flöde</div>
            </div>
        </main>
    )
}
