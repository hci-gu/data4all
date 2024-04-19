'use client'
import DatasetCard from '@/components/datasetCard'
import * as api from '@/adapters/api'

import { useContext } from 'react'
import { authContext } from '@/lib/context/authContext'

export default async function ProfileDatasetList({
    userId,
}: {
    userId: string
}) {
    // const userContext = useContext(authContext)
    // const user = userContext?.auth
    // if (!user) {
    //     throw new Error('User is not authenticated')
    // }
    const datasets = await api.getDatasetFromUser(userId)

    if (datasets.length > 0) {
        return datasets.map((dataset) => (
            <DatasetCard key={dataset.id} dataset={dataset} />
        ))
    }

    return <p className="text-center">Du har inga relaterade dataset.</p>
}
