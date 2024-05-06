import { Separator } from '@/components/ui/separator'
import ProfileDatasetList from '@/components/profileDatasetList'
import { getUser } from '@/adapters/api'
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
import UpdateFiendUserForm from '@/components/auth/updateFiendUserForm'
import { AuthorizedUserSchema } from '@/types/zod'

async function ProfilePage({
    params: { username },
}: {
    params: { username: string }
}) {
    const cookie = cookies().get('PBAuth')
    let user: AuthorizedUserSchema | undefined
    try {
        if (cookie) {
            user = await getUser(username, cookie.value)
        }
    } catch (error) {
        notFound()
    }
    return (
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
                                href={`/profile/${decodeURI(username.replaceAll('-', ' '))}`}
                            >
                                {decodeURI(username.replaceAll('-', ' '))}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <h1 className="text-5xl font-extrabold">
                    {decodeURI(username.replaceAll('-', ' '))}
                </h1>
                {user && <UpdateFiendUserForm user={user} />}
                <Separator />
                <section aria-labelledby="datasetList">
                    <h2 className="text-3xl font-extrabold" id="datasetList">
                        {decodeURI(username)}s dataset
                    </h2>
                    {user && <ProfileDatasetList username={user.name} />}
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
    )
}

export default ProfilePage
