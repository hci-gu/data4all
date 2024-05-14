import { Separator } from '@/components/ui/separator'
import ProfileDatasetList from '@/components/profileDatasetList'
import * as api from '@/adapters/api'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { ChevronRight } from 'lucide-react'
import { OtherUserFields } from '@/components/auth'
import { AuthorizedUserSchema } from '@/types/zod'
import CheckIfNotUserProfile from '@/components/CheckIfNotUserProfile'

async function ProfilePage({
    params: { username },
}: {
    params: { username: string }
}) {
    const cookie = cookies().get('PBAuth')
    let user: AuthorizedUserSchema | undefined
    try {
        if (cookie) {
            user = await api.getUser(username, cookie.value)
        }
    } catch (error) {
        notFound()
    }
    if (!user) {
        notFound()
    }
    return (
        <>
            <CheckIfNotUserProfile name={user.name} />
            <main className="grid w-full justify-center gap-8 px-4 pt-8 lg:mx-auto lg:w-fit xl:grid-cols-[1fr_auto_1fr]">
                <div className="flex w-[573.5px] flex-col gap-5 max-sm:w-full">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink className="text-xl" href="/">
                                    Personer
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="[&>svg]:size-5">
                                <ChevronRight />
                            </BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbLink
                                    className="text-xl"
                                    href={`/profile/${user.name}`}
                                >
                                    {user.name}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <h1 className="text-5xl font-extrabold">{user.name}</h1>
                    <OtherUserFields user={user} />
                    <Separator />
                    <section aria-labelledby="datasetList">
                        <h2
                            className="mb-3 text-3xl font-extrabold"
                            id="datasetList"
                        >
                            {user.name}s dataset
                        </h2>
                        <ProfileDatasetList username={user.name} />
                    </section>
                </div>
                <Separator
                    orientation="vertical"
                    className="max-sm:hidden sm:visible"
                />
                <div className="w-[573.5px] flex-col gap-[10px] pb-12 max-sm:w-full">
                    <h2 className="text-3xl font-semibold">Aktivitet</h2>
                    <div className="mt-[10px] flex flex-col gap-2"></div>
                </div>
            </main>
        </>
    )
}

export default ProfilePage
