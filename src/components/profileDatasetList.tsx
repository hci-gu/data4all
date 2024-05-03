'use client'
import DatasetCard from '@/components/datasetCard'
import * as api from '@/adapters/api'

import { useContext, useEffect, useState } from 'react'
import { authContext } from '@/lib/context/authContext'
import { datasetWithRelationsSchema } from '@/types/zod'

export default function ProfileDatasetList({
    username,
    userId,
}: {
    username?: string
    userId?: string
}) {
    const userContext = useContext(authContext)
    const user = userContext.auth
    const cookie = userContext.cookie
    
    const [datasets, setDatasets] = useState<datasetWithRelationsSchema[]>([])

    useEffect(() => {
        async function fetchData() {
            try {
                if (!username) {
                    setDatasets(await api.getDatasetFromUser(user.id, cookie))
                }
                if (userId) {
                    setDatasets(await api.getDatasetFromUser(userId, cookie))
                }
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [])

    if (datasets.length > 0) {
        return (
            <ul>
                {datasets.map((dataset) => (
                    <li key={dataset.id}>
                        <DatasetCard dataset={dataset} />
                    </li>
                ))}
            </ul>
        )
    }
    if (username) {
        return (
            <p>
                {username} har inga dataset ännu, när {username} är dataägare
                dyker det upp här.
            </p>
        )
    }

    return (
        <p>Du har inga dataset ännu, när du är dataägare dyker det upp här.</p>
    )
}
