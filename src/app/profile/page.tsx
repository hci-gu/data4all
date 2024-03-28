import LogoutButton from '@/components/logoutButton'
import RemoveAccountButton from '@/components/removeAccountButton'
import { Separator } from '@/components/ui/separator'
import UpdateUserForm from '@/components/updateUserForm'
import { loadAuthorizedUser } from '../api/auth/utils'
import * as api from '@/adapters/api'
import DatasetCard from '@/components/datasetCard'
import { AuthorizedUserSchema } from '@/types/zod'

async function ProfilePage() {
    const user = AuthorizedUserSchema.parse(loadAuthorizedUser())

    const datasets = await api.getDatasetFromUserEvent(user?.id as string)

    return (
        <main className="flex h-[96vh] w-full justify-center gap-9 pt-8">
            <div className="flex w-[573.5px] flex-col gap-[10px]">
                <h1 className="text-5xl font-extrabold">Profil</h1>
                <UpdateUserForm user={user} />
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
                <div className="flex justify-start gap-[10px]">
                    <LogoutButton />
                    <RemoveAccountButton userId={user.id} />
                </div>
            </div>
            <Separator orientation="vertical" />
            <div className="w-[573.5px] flex-col gap-[10px]">
                <h2 className="text-center text-3xl font-semibold">
                    Dina dataset
                </h2>
                <div className="mt-[10px] flex flex-col gap-2">
                    {datasets.records.length > 0 ? (
                        datasets.records.map((dataset: any) => {
                            return (
                                <DatasetCard
                                    key={dataset.id}
                                    dataset={dataset}
                                />
                            )
                        })
                    ) : (
                        <>
                            <p className="text-center">
                                Du har inga relaterade dataset.
                            </p>
                        </>
                    )}
                </div>
            </div>
        </main>
    )
}

export default ProfilePage
