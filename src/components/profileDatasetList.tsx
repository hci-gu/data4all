'use client'
import DatasetCard from '@/components/datasetCard'
import * as api from '@/adapters/api'

import { useContext, useEffect, useState } from 'react'
import { authContext } from '@/lib/context/authContext'
import { datasetWithRelationsSchema } from '@/types/zod'

export default function ProfileDatasetList() {
    const userContext = useContext(authContext)
    const userId = userContext.auth.id

    const [datasets, setDatasets] = useState<datasetWithRelationsSchema[]>([])

    useEffect(() => {
        async function fetchData() {
            try {
                setDatasets(await api.getDatasetFromUser(userId))
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
        // console.log(datasets);
        
    }, [])

    if (datasets.length > 0) {
        return datasets.map((dataset) => (
            <DatasetCard key={dataset.id} dataset={dataset} />
        ))
    }

    return <p className="text-center">Du har inga relaterade dataset.</p>
}
