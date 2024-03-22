import { pb } from '@/adapters/api'
import { datasetSchema } from '@/types/zod'

async function datasetsForIds(datasetIds: string[]): Promise<any[]> {
    const records = await pb.collection('mocDataset').getFullList({
        filter: datasetIds.map((id) => `id="${id}"`).join('||'),
    })

    return records
}

export async function datasetForTitle(datasetTitle: string) {
    const records = await pb
        .collection<datasetSchema>('mocDataset')
        .getFirstListItem(`title="${datasetTitle}"`, { expand: 'tag' })

    return records
}
export async function datasetsForUserId(userId: string) {
    const userEvents = await pb.collection('events').getList(1, 50, {
        filter: `user = "${userId}"`,
    })

    const datasetIds = Array.from(
        new Set(
            userEvents.items.map((e) => {
                return e.dataset
            })
        )
    )

    return await datasetsForIds(datasetIds as string[])
}
