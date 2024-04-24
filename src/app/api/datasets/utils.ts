import { pb } from '@/adapters/api'
import { stringWithHyphen } from '@/lib/utils'
import { datasetSchema, datasetWithRelationsSchema } from '@/types/zod'

async function datasetsForIds(datasetIds: string[]) {
    const records = datasetSchema.array().parse(
        await pb.collection('dataset').getFullList({
            filter: datasetIds.map((id) => `id="${id}"`).join('||'),
        })
    )

    return records
}

export async function datasetForTitle(
    datasetTitle: string,
    authCookie: string
) {
    pb.authStore.loadFromCookie(authCookie)
    const records = await pb
        .collection<datasetSchema>('dataset')
        .getFirstListItem(`title="${datasetTitle}"`, {
            expand: 'related_datasets,tag',
        })

    return records
}
export async function datasetForSlug(datasetSlug: string, authCookie: string) {
    pb.authStore.loadFromCookie(authCookie)
    datasetSlug = stringWithHyphen(datasetSlug)

    const records = await pb
        .collection<datasetWithRelationsSchema>('dataset')
        .getFirstListItem(`slug="${datasetSlug}"`, {
            expand: 'related_datasets,tag',
        })

    return records
}
export async function datasetsForUserId(userId: string, authCookie: string) {
    pb.authStore.loadFromCookie(authCookie)
    const userEvents = await pb.collection('events').getList(1, 50, {
        filter: `user = "${userId}"`,
    })

    if (userEvents.items.length === 0) {
        return []
    }

    const datasetIds = Array.from(
        new Set(
            userEvents.items.map((e) => {
                return e.dataset
            })
        )
    )

    const datasets = await datasetsForIds(datasetIds)

    await Promise.all(datasets)

    return datasets
}
