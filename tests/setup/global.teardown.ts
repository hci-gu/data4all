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
})
