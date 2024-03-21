import { pb } from '@/adapters/api'

async function datasetsForIds(datasetIds: string[]): Promise<any[]> {
    const records = await pb.collection('mocDataset').getFullList({
        filter: datasetIds.map((id) => `id="${id}"`).join('||'),
    })

    return records
}

export async function datasetForTitle(datasetTitle: string) {
    const records = await pb
        .collection('mocDataset')
        .getFirstListItem(`title="${datasetTitle}"`)

    return records
}
export async function datasetsForUserId(userId: string) {
    const userEvents = await pb.collection('events').getList(1, 50, {
        filter: `user="${userId}"`,
    })

    if (userEvents.items.length < 1) {
        return []
    }

    const datasetIds = Array.from(
        new Set(
            userEvents.items.map((e) => {
                return e.dataset
            })
        )
    )

    return await datasetsForIds(datasetIds as string[])
}
