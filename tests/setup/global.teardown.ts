import { test as setup } from '@playwright/test'
import PocketBase from 'pocketbase'
const pb = new PocketBase('http://localhost:8090')

setup('setup', async () => {
    const datasets = await pb.collection('dataset').getFullList()
    await pb.admins.authWithPassword('admin@email.com', 'password123')
    const events = await pb.collection('events').getFullList()

    const users = await pb.collection('users').getFullList()

    const datasetWithRelations = datasets.filter(
        (dataset) => dataset.related_datasets.length > 0
    )

    for (const dataset of datasetWithRelations) {
        if (dataset.title.includes('test')) {
            await pb.collection('dataset').delete(dataset.id)
            datasets.splice(datasets.indexOf(dataset), 1)
        }
    }

    for (const dataset of datasets) {
        if (dataset.title.includes('test')) {
            await pb.collection('dataset').delete(dataset.id)
        }
    }

    for (const event of events) {
        if (event.content === 'test' || event.content.includes('tester')) {
            await pb.collection('events').delete(event.id)
        }
    }

    for (const user of users) {
        if (user.name.includes('tester')) {
            await pb.collection('users').delete(user.id)
        }
    }
})
