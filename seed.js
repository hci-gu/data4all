import PocketBase from 'pocketbase'
import fs from 'fs/promises'

const stringWithHyphen = (text) => {
    return text.toLowerCase().replaceAll(' ', '-')
}
const getRandomTag = (tags) => {
    const randomIndex = Math.floor(Math.random() * tags.length)
    return tags[randomIndex].id
}

;(async () => {
    const jsonData = await fs.readFile('seedData.json', 'utf-8')
    const { tags, datasets, users } = JSON.parse(jsonData)

    const pb = new PocketBase('http://localhost:8090')
    await pb.admins.authWithPassword('admin@email.com', 'password123')

    try {
        await deleteExistingData(pb, 'dataset', datasets)
        await deleteExistingData(pb, 'users', users, 'email')
        await deleteExistingData(pb, 'tag', tags, 'name')

        const createdTags = await seedData(pb, 'tag', tags)

        await seedUser(pb, 'users', users)

        await seedDataset(pb, 'dataset', datasets, createdTags)
    } catch (error) {
        console.error('There was an error: ', error)
    }
})()

async function deleteExistingData(
    pb,
    collectionName,
    data,
    identifier = 'title'
) {
    const existingData = await pb.collection(collectionName).getFullList()
    for (const existingItem of existingData) {
        for (const newItem of data) {
            if (existingItem[identifier] === newItem[identifier]) {
                await pb.collection(collectionName).delete(existingItem.id)
                break
            }
        }
    }
}

async function seedData(pb, collectionName, data) {
    const items = []
    for (const itemData of data) {
        const newItem = await pb
            .collection(collectionName)
            .create(itemData, { $autoCancel: false })
        items.push(newItem)
    }
    return items
}

async function seedDataset(pb, collectionName, data, tags) {
    for (const itemData of data) {
        await pb.collection(collectionName).create(
            {
                ...itemData,
                slug: stringWithHyphen(itemData.title),
                tag: [getRandomTag(tags)],
            },
            { $autoCancel: false }
        )
    }
}
async function seedUser(pb, collectionName, data) {
    for (const itemData of data) {
        await pb.collection(collectionName).create(
            {
                ...itemData,
                slug: stringWithHyphen(itemData.name),
            },
            { $autoCancel: false }
        )
    }
}
