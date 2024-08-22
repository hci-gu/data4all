import DatasetCard from '@/components/datasetCard'

import { getOwnedDatasets } from '@/app/actions/datasets'

export default async function ProfileDatasetList({
    username,
}: {
    username?: string
}) {
    const datasets = await getOwnedDatasets(username)

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
