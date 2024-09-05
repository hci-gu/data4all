import Typography from './ui/Typography'
import DatasetCard from './datasetCard'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Settings2 } from 'lucide-react'
import UserCard from './userCard'
import { getDatasets } from '@/app/actions/datasets'
import { getUsers } from '@/app/actions/auth'

function ResultWrapper({
    title,
    numResults,
    children,
}: {
    title: string
    numResults: number
    children: any
}) {
    return (
        <div className="flex flex-col gap-[10px] max-sm:hidden">
            <div className="flex flex-col">
                <Typography level="H3">{title}</Typography>
                <p>{numResults} resultat</p>
            </div>
            {numResults > 0 ? (
                <ul className="flex flex-wrap gap-[10px]">{children}</ul>
            ) : (
                <p>Hittade inga resultat</p>
            )}
        </div>
    )
}

export default async function SearchResults({
    searchTerm,
    searchType,
    tag,
    filter,
    isDataOwner,
}: {
    searchTerm: string | undefined
    searchType: string | undefined
    tag: string | undefined
    filter: string | undefined
    isDataOwner: string | undefined
}) {
    const showDatasets = searchType == 'all' || searchType == 'datasets'
    const showUsers = searchType == 'all' || searchType == 'users'
    const isDataOwnerBool = isDataOwner == 'true'

    const datasets = showDatasets
        ? await getDatasets(searchTerm, tag, filter)
        : []
    const users = showUsers ? await getUsers(searchTerm, isDataOwnerBool) : []

    return (
        <>
            <div
                className={`mt-8 grid w-full max-w-[1220px] gap-8 max-sm:mt-0 max-sm:flex max-sm:flex-col ${searchType == 'all' ? 'grid-cols-2' : 'grid-cols-1'}`}
            >
                {showDatasets && (
                    <ResultWrapper title="Dataset" numResults={datasets.length}>
                        {datasets.map((dataset) => {
                            return (
                                <li key={dataset.id}>
                                    <DatasetCard dataset={dataset} />
                                </li>
                            )
                        })}
                    </ResultWrapper>
                )}
                {showUsers && (
                    <ResultWrapper title="Personer" numResults={users.length}>
                        {users.map((user) => {
                            return (
                                <li key={user.id}>
                                    <UserCard user={user} />
                                </li>
                            )
                        })}
                    </ResultWrapper>
                )}
                <Tabs
                    defaultValue="dataset"
                    className="flex w-full flex-col items-center px-4 sm:hidden"
                >
                    <TabsList className="w-full">
                        <div className="flex w-full items-center pr-1">
                            <TabsTrigger className="w-[50%]" value="dataset">
                                Dataset
                            </TabsTrigger>
                            <TabsTrigger className="w-[50%]" value="personer">
                                personer
                            </TabsTrigger>
                            <Settings2 className="pl-1" />
                        </div>
                    </TabsList>
                    <TabsContent value="dataset">
                        <ul className="flex flex-col gap-[10px]">
                            {datasets.length > 0 ? (
                                datasets.map((dataset) => {
                                    return (
                                        <li key={dataset.id}>
                                            <DatasetCard dataset={dataset} />
                                        </li>
                                    )
                                })
                            ) : (
                                <p>Hittade inga resultat</p>
                            )}
                        </ul>
                    </TabsContent>
                    <TabsContent value="personer">
                        <ul className="flex flex-col gap-[10px]">
                            {users.length > 0 ? (
                                <ul className="flex flex-col gap-[10px]">
                                    {users.map((user) => {
                                        return (
                                            <li key={user.id}>
                                                <UserCard user={user} />
                                            </li>
                                        )
                                    })}
                                </ul>
                            ) : (
                                <p>Hittade inga resultat</p>
                            )}
                        </ul>
                    </TabsContent>
                </Tabs>
            </div>
        </>
    )
}
