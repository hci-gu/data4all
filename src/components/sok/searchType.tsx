'use client'

import React, { useEffect } from 'react'
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs'
import { useRouter, useSearchParams } from 'next/navigation'

export default function SearchType() {
    const searchParams = useSearchParams()
    const [activeTab, setActiveTab] = React.useState(
        searchParams.get('type') ?? 'all'
    )
    const router = useRouter()

    useEffect(() => {
        const type = searchParams.get('type')

        if (type) {
            setActiveTab(type)
        }
    }, [searchParams])

    return (
        <Tabs
            defaultValue="all"
            value={activeTab}
            className="mt-2 flex w-1/3 flex-col items-center px-4"
            onValueChange={(value) => {
                // update search type
                const params = new URLSearchParams(searchParams.toString())

                // Update the searchTerm in the query params
                params.set('type', value)

                // Replace the current URL with the updated query params
                router.replace(`/sok?${params.toString()}`)
            }}
        >
            <TabsList className="w-full">
                <div className="flex w-full items-center pr-1">
                    <TabsTrigger className="w-[50%]" value="all">
                        Allt
                    </TabsTrigger>
                    <TabsTrigger className="w-[50%]" value="datasets">
                        Dataset
                    </TabsTrigger>
                    <TabsTrigger className="w-[50%]" value="users">
                        Personer
                    </TabsTrigger>
                </div>
            </TabsList>
        </Tabs>
    )
}
