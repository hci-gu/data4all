'use client'
import DatasetCard from '@/components/datasetCard'
import * as api from '@/adapters/api'

import { useContext, useEffect, useState } from 'react'
import { authContext } from '@/lib/context/authContext'
import { datasetWithRelationsSchema } from '@/types/zod'
import { getUserFromURL } from '@/lib/utils'

export default function ProfileDatasetList() {
    const userURL = getUserFromURL()

    const userContext = useContext(authContext)
    const user = userContext.auth
    const cookie = userContext.cookie

    const [datasets, setDatasets] = useState<datasetWithRelationsSchema[]>([])

    useEffect(() => {
        async function fetchData() {
            try {
                setDatasets(await api.getDatasetFromUser(user.id, cookie))
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
    if (userURL && userURL.toLowerCase() !== user.name.toLowerCase()) {
        return (
            <p className="text-center">
                {userURL} har inga relaterade dataset.
            </p>
        )
    }

    return <p className="text-center">Du har inga relaterade dataset.</p>
}
