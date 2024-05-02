import { Separator } from '@/components/ui/separator'
import ProfileDatasetList from '@/components/profileDatasetList'
import { getUser } from '@/adapters/api'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'

async function ProfilePage({
    params: { userName },
}: {
    params: { userName: string }
}) {
    const cookie = cookies().get('PBAuth')
    try {
        if (cookie) {
            await getUser(
                userName.replaceAll('-', ' '),
                cookie.value
            )
        }
    } catch (error) {
        notFound()
    }
    return (
        <main className="grid w-full justify-center gap-9 px-4 pt-8 lg:mx-auto lg:w-fit xl:grid-cols-[1fr_auto_1fr]">
            <div className="flex w-[573.5px] flex-col gap-[10px] max-sm:w-full">
                <h1 className="text-5xl font-extrabold">
                    {decodeURI(userName.replaceAll('-', ' '))}
                </h1>
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
                    <ProfileDatasetList />
                </div>
            </div>
        </main>
    )
}

export default ProfilePage