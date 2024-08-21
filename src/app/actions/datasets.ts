'use server'

import { datasetWithRelationsSchema } from '@/types/zod'
import { getPocketBase } from './pocketbase'
import { datasetResponseCleanup } from './utils'
import { stringWithHyphen } from '@/lib/utils'

export const getOwnedDatasets = async (username?: string) => {
    const pb = await getPocketBase()
    let userId = ''

    try {
        if (username) {
            const user = await pb
                .collection('users')
                .getFirstListItem(`slug="${stringWithHyphen(username)}"`)
            userId = user.id
        } else {
            userId = pb.authStore.model?.id
        }

        const response = await pb.collection('dataset').getList(1, 25, {
            filter: `dataowner="${userId}"`,
        })

        const cleanDatasets = response.items.map(datasetResponseCleanup)

        return datasetWithRelationsSchema.array().parse(cleanDatasets)
    } catch (_) {
        return []
    }
}

export const getDataset = async (slug: string) => {
    const pb = await getPocketBase()

    const dataset = await pb
        .collection<datasetWithRelationsSchema>('dataset')
        .getFirstListItem(`slug="${slug}"`, {
            expand: 'related_datasets,tag,dataowner,dataowner.role',
        })

    return datasetWithRelationsSchema.parse(datasetResponseCleanup(dataset))
}

export const getDatasets = async (searchTerm: string | undefined) => {
    const pb = await getPocketBase()

    const response = await pb.collection('dataset').getList(1, 25, {
        sort: '-created',
        filter: `title ~ "${decodeURI(searchTerm ?? '')}"`,
        expand: 'tag',
    })
    const cleanDatasets = response.items.map(datasetResponseCleanup)

    return datasetWithRelationsSchema.array().parse(cleanDatasets)
}

export const updateDataset = async (
    datasetId: string,
    dataset: Partial<datasetWithRelationsSchema>
) => {
    const pb = await getPocketBase()

    const record = await pb
        .collection<datasetWithRelationsSchema>('dataset')
        .update(
            datasetId,
            { ...dataset, dataowner: dataset.dataowner?.id },
            {
                expand: 'related_datasets,tag,dataowner,dataowner.role',
            }
        )

    return datasetWithRelationsSchema.parse(datasetResponseCleanup(record))
}
