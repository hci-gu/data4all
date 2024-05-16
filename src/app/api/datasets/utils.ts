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
            expand: 'related_datasets,tag,dataowner',
        })

    return records
}
export async function datasetsForUserId(userId: string, pb: PocketBase) {
    const userEvents = await pb
        .collection<EventSchema>('events')
        .getList(1, 50, {
            filter: `user = "${userId}"`,
        })

    if (userEvents.items.length === 0) {
        return []
    }

    const datasetIds = Array.from(
        new Set(userEvents.items.map((e) => e.dataset))
    )

    const datasets = await datasetsForIds(datasetIds, pb)

    await Promise.all(datasets)

    return datasets
}
