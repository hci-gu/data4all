import Link from 'next/link'
import Typography from './ui/Typography'
import { Separator } from './ui/separator'
import { getStats } from '@/app/actions/stats'

export default async function WelcomeBack({
    homePage,
}: {
    homePage?: boolean
}) {
    const stats = await getStats()

    return (
        <>
            <div className="my-9 flex w-full flex-col items-start gap-9 max-sm:my-1 sm:max-w-[1220px]">
                <div className="flex flex-col justify-start gap-4 max-sm:hidden">
                    <Typography level="H1">Välkommen tillbaka</Typography>
                    <Typography level="Smal">
                        Nedan kan du se en kort sammanfattning om vad som hänt
                        senaste veckan
                    </Typography>
                </div>
                <div className="flex w-full justify-between max-sm:grid max-sm:grid-cols-2 max-sm:gap-7 max-sm:px-4">
                    <>
                        <Link
                            className="flex flex-col items-center [&>*]:w-fit"
                            href="/sok?type=datasets"
                        >
                            <Typography level="Large">Dataset</Typography>
                            <p className="text-[64px] font-black leading-[48px] max-sm:text-[48px]">
                                {stats.datasets}
                            </p>
                        </Link>
                        <Link
                            className="flex flex-col items-center [&>*]:w-fit"
                            href="/sok?type=users"
                        >
                            <Typography level="Large">Användare</Typography>
                            <p className="text-[64px] font-black leading-[48px] max-sm:text-[48px]">
                                {stats.users}
                            </p>
                        </Link>
                        <Link
                            className="flex flex-col items-center [&>*]:w-fit"
                            href="/sok?type=datasets&filter=%26%26%20dataowner%21%3D%22%22"
                        >
                            <Typography level="Large">
                                Dataset med ägare
                            </Typography>
                            <p className="text-[64px] font-black leading-[48px] max-sm:text-[48px]">
                                {stats.datasetsWithOwners}
                            </p>
                        </Link>
                        <Link
                            className="flex flex-col items-center [&>*]:w-fit"
                            href="/sok?type=users&isDataOwner=true"
                        >
                            <Typography level="Large">Dataägare</Typography>
                            <p className="text-[64px] font-black leading-[48px] max-sm:text-[48px]">
                                {stats.dataOwners}
                            </p>
                        </Link>
                    </>
                </div>
                {homePage !== true ? (
                    <Separator className="max-sm:hidden" />
                ) : (
                    <Separator />
                )}
            </div>
        </>
    )
}
