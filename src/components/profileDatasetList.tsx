'use client'
import DatasetCard from '@/components/datasetCard'
import * as api from '@/adapters/api'

import { useContext, useEffect, useState } from 'react'
import { authContext } from '@/lib/context/authContext'
import { datasetWithRelationsSchema } from '@/types/zod'
import { getUserFromURL } from '@/lib/utils'
import { usePathname } from 'next/navigation'

export default function ProfileDatasetList() {
    const userNameURL = getUserFromURL()
    const path = usePathname()

    const userContext = useContext(authContext)
    const user = userContext.auth
    const cookie = userContext.cookie
    const [datasets, setDatasets] = useState<datasetWithRelationsSchema[]>([])

    useEffect(() => {
        async function fetchData() {
            try {
                if (path === `/profile`) {
                    setDatasets(await api.getDatasetFromUser(user.id, cookie))
                }

                if (userNameURL && path.startsWith('/profile/')) {
                    const userURL = await api.getUser(
                        userNameURL,
                        cookie
                    )
                    setDatasets(
                        await api.getDatasetFromUser(userURL.id, cookie)
                    )
                }
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [])

    if (datasets.length > 0) {
        return datasets.map((dataset) => (
            <DatasetCard key={dataset.id} dataset={dataset} />
        ))
    }
    if (path.startsWith('/profile/')) {
        return (
            <p className="text-center">
                {userNameURL} har inga relaterade dataset.
            </p>
        )
    }

    return <p className="text-center">Du har inga relaterade dataset.</p>
}
