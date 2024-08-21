'use server'

import { getPocketBase } from './pocketbase'

export const getStats = async () => {
    const pb = await getPocketBase()
    const datasetResponse = await pb.collection('dataset').getList(1, 1)
    const users = await pb.collection('users').getFullList()

    return {
        datasets: datasetResponse.totalItems,
        users: users.length,
    }
}
