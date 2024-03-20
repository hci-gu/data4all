import { pb } from '@/adapters/api'

export async function singleDataset(datasetTitle: string) {
    const records = await pb
        .collection('mocDataset')
        .getFirstListItem(`title="${datasetTitle}"`)
    return records
}
export async function datasetFromUser(userId: string) {
    async function getDatasetArray(datasetIds: string[]): Promise<any[]> {
        // pb.collection('mocDataset').getList(1, 50, {
        //     filter: ``
        // })
        const datasetPromises = datasetIds.map((id) => {
            const record = pb
                .collection('mocDataset')
                .getFirstListItem(`id="${id}"`)
            return record
        })
        const records = await Promise.all(datasetPromises)

        return records
    }

    const userEvents = await pb.collection('events').getList(1, 50, {
        filter: `user="${userId}"`,
    })

    const datasetIds = Array.from(
        new Set(
            userEvents.items.map((e) => {
                return e.dataset
            })
        )
    )

    return await getDatasetArray(datasetIds as string[])
}