'use client'
import DatasetCard from '@/components/datasetCard'
import * as api from '@/adapters/api'

import { useContext, useEffect, useState } from 'react'
import { authContext } from '@/lib/context/authContext'
import { datasetWithRelationsSchema } from '@/types/zod'

export default function ProfileDatasetList() {
    const userContext = useContext(authContext)
    const user = userContext?.auth?.id

    const [datasets, setDatasets] = useState<datasetWithRelationsSchema[]>([])

    useEffect(() => {
        async function fetchData() {
            if (!user) {
                throw new Error('Användaren är inte inloggad.')
            }
            try {
                setDatasets(await api.getDatasetFromUser(user))
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

    return <p className="text-center">Du har inga relaterade dataset.</p>
}
