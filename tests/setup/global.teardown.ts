import { expect, test as setup } from '@playwright/test'
import PocketBase from 'pocketbase'
const pb = new PocketBase('http://localhost:8090')

setup('setup', async ({ page, request, context }) => {
    const users = await pb.collection('users').getFullList()

    for (const user of users) {
        if (user.name === 'tester') {
            await pb.collection('users').delete(user.id)
        }
    }

    const datasets = await pb.collection('dataset').getFullList()

    for (const dataset of datasets) {
        if (dataset.title === 'test title') {
            await pb.collection('dataset').delete(dataset.id)
        }
    }

    const events = await pb.collection('events').getFullList()

    for (const event of events) {
        if (event.content === 'test')
            await pb.collection('events').delete(event.id)
    }
})
