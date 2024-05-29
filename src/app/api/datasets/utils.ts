import PocketBase from 'pocketbase'
import { stringWithHyphen } from '@/lib/utils'
import {
    EventSchema,
    datasetSchema,
    datasetWithRelationsSchema,
} from '@/types/zod'

async function datasetsForIds(datasetIds: string[], pb: PocketBase) {
    const records = datasetSchema.array().parse(
        await pb.collection('dataset').getFullList({
            filter: datasetIds.map((id) => `id="${id}"`).join('||'),
        })
    )

    return records
}

export async function datasetForTitle(datasetTitle: string, pb: PocketBase) {
    const records = await pb
        .collection<datasetSchema>('dataset')
        .getFirstListItem(`title="${datasetTitle}"`, {
            expand: 'related_datasets,tag',
        })

    return records
}
export async function datasetForSlug(datasetSlug: string, pb: PocketBase) {
    datasetSlug = stringWithHyphen(datasetSlug)

    const records = await pb
        .collection<datasetWithRelationsSchema>('dataset')
        .getFirstListItem(`slug="${datasetSlug}"`, {
            expand: 'related_datasets,tag,dataowner,dataowner.role',
        })

    return records
}
export async function datasetsForUserId(userId: string, pb: PocketBase) {
    const datasets = await pb.collection('dataset').getList(1, 25, {
        filter: `dataowner="${userId}"`,
    })

    return datasets.items
}
