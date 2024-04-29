'use client'
import Typography from './ui/Typography'
import DatasetCard from './datasetCard'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Settings2 } from 'lucide-react'
import { useContext, useEffect, useState } from 'react'
import { authContext } from '@/lib/context/authContext'
import * as api from '@/adapters/api'
import { AuthorizedUserSchema, datasetWithRelationsSchema } from '@/types/zod'
import UserCard from './userCard'

export default function SearchResults({
    searchTerm,
}: {
    searchTerm: string | undefined
}) {
    const userContext = useContext(authContext)
    const authCookie = userContext.cookie

    const [datasets, setDatasets] = useState<datasetWithRelationsSchema[]>([])
    const [users, setUsers] = useState<AuthorizedUserSchema[]>([])

    useEffect(() => {
        async function fetchData() {
            if (!searchTerm) {
                return
            }
            setDatasets(await api.getDatasets(searchTerm, authCookie))
            setUsers(await api.getUsers(searchTerm, authCookie))
        }
        fetchData()
    }, [])

    return (
        <>
            <div className="mt-8 grid w-full max-w-[1220px] grid-cols-2 gap-8 max-sm:mt-0 max-sm:flex max-sm:flex-col">
                <div className="flex flex-col gap-[10px] max-sm:hidden">
                    <div className="flex flex-col">
                        <Typography level="H3">Dataset</Typography>
                        <p>resultat</p>
                    </div>
                    {datasets.length > 0 ? (
                        <ul className="flex flex-col gap-[10px]">
                            {datasets.map((dataset) => {
                                return (
                                    <li key={dataset.id}>
                                        <DatasetCard dataset={dataset} />
                                    </li>
                                )
                            })}
                        </ul>
                    ) : (
                        <p>Hittade inga resultat</p>
                    )}
                </div>
                <div className="flex flex-col gap-[10px] max-sm:hidden">
                    <div className="flex flex-col">
                        <Typography level="H3">Personer</Typography>
                        <p>resultat</p>
                    </div>
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
                </div>
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
