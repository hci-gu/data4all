'use client'
import { LogoutButton } from '@/components/auth'
import RemoveAccountButton from '@/components/removeAccountButton'
import { Separator } from '@/components/ui/separator'
import { UpdateUserForm } from '@/components/auth'
import * as api from '@/adapters/api'
import DatasetCard from '@/components/datasetCard'
import { useContext } from 'react'
import { authContext } from '@/lib/context/authContext'

async function ProfilePage() {
    const userContext = useContext(authContext)
    const user = userContext?.auth
    if (!user) {
        throw new Error('User is not authenticated')
    }

    const datasets = await api.getDatasetFromUser(user.id)

    return (
        <main className="flex h-[96vh] w-full justify-center gap-9 px-4 pt-8 max-sm:flex-col max-sm:items-center max-sm:justify-start">
            <div className="flex w-[573.5px] flex-col gap-[10px] max-sm:w-full">
                <h1 className="text-5xl font-extrabold">Profil</h1>
                <UpdateUserForm />
                <Separator />
                <h2 className="text-3xl font-semibold">
                    Om Kungsbacka dataportal
                </h2>
                <p className="text-base">
                    Kungsbacka Dataportal är en innovativ digital plattform som
                    syftar till att öka öppenheten och tillgängligheten av data
                    inom Kungsbacka kommun. Genom att ge invånare, företagare,
                    forskare och andra intressenter tillgång till kvalitativ och
                    uppdaterad information, strävar portalen efter att stimulera
                    till innovation, förbättrad kommunikation och ökat
                    engagemang.
                </p>

                <Separator />
                <div className="flex justify-start gap-[10px] max-sm:flex-col">
                    <LogoutButton />
                    <RemoveAccountButton />
                </div>
            </div>
            <Separator
                orientation="vertical"
                className="max-sm:hidden sm:visible"
            />
            <Separator orientation="horizontal" className="sm:hidden" />
            <div className="w-[573.5px] flex-col gap-[10px] pb-12 max-sm:w-full">
                <h2 className="text-center text-3xl font-semibold">
                    Dina dataset
                </h2>
                <div className="mt-[10px] flex flex-col gap-2">
                    {datasets.length > 0 ? (
                        datasets.map((dataset) => (
                            <DatasetCard key={dataset.id} dataset={dataset} />
                        ))
                    ) : (
                        <p className="text-center">
                            Du har inga relaterade dataset.
                        </p>
                    )}
                </div>
            </div>
        </main>
    )
}

export default ProfilePage
