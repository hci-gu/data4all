'use client'
import DatasetCard from '@/components/datasetCard'
import { authContext } from '@/lib/context/authContext'

import { datasetWithRelationsSchema } from '@/types/zod'
import { useContext, useEffect, useState } from 'react'
import * as api from '@/adapters/api'

export default function ProfileDatasetList({
    username,
}: {
    username?: string
}) {
    const userContext = useContext(authContext)
    const user = userContext.auth
    const cookie = userContext.cookie

    const [datasets, setDatasets] = useState<datasetWithRelationsSchema[]>([])

    async function fetchData() {
        try {
            if (username) {
                const userId = (await api.getUser(username, cookie)).id
                setDatasets(await api.getDatasetFromUser(userId, cookie))
            }
            if (!username) {
                setDatasets(await api.getDatasetFromUser(user.id, cookie))
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    if (datasets.length > 0) {
        return (
            <ul className="space-y-3">
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
