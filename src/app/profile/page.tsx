'use client'
import { pb, removeUser, signOut } from '@/adapters/pocketbase'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function () {
    const router = useRouter()

    const removeAccount = () => {
        const userId = pb.authStore.model?.id
        removeUser(userId)
        router.push('/SkapaKonto')
    }

    return (
        <main className="flex w-full justify-center gap-9 pt-8">
            <div className="flex w-[573.5px] flex-col gap-[10px]">
                <h1 className="text-5xl font-extrabold">Profil</h1>
                {/* form */}
                <div className="h-[2px] w-full bg-slate-200"></div>
                {/* info */}
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
                <div className="h-[2px] w-full bg-slate-200"></div>
                {/* logout and remove acc */}
                <div className="flex justify-start gap-[10px]">
                    <Button
                        variant={'outline'}
                        onClick={() => {
                            signOut()
                            router.push('/LogaIn')
                        }}
                    >
                        Logga ut
                    </Button>
                    <Button
                        variant={'destructive'}
                        onClick={() => removeAccount()}
                    >
                        Ta bort konto
                    </Button>
                </div>
            </div>
            <div className="w-[2px] bg-slate-200"></div>
            <div className="w-[573.5px]"></div>
        </main>
    )
}
