'use server'

import { getPocketBase } from './pocketbase'

export const getStats = async () => {
    const pb = await getPocketBase()
    const datasetResponse = await pb.collection('dataset').getList(1, 1)
    const users = await pb.collection('users').getFullList()
    const datasetsWithOwners = await pb.collection('dataset').getFullList({
        filter: 'dataowner != ""',
    })
    const uniqueOwners = new Set(datasetsWithOwners.map((d) => d.dataowner))

    return {
        datasets: datasetResponse.totalItems,
        datasetsWithOwners: datasetsWithOwners.length,
        users: users.length,
        dataOwners: uniqueOwners.size,
    }
}
