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
    const { tags, datasets, users, events } = JSON.parse(jsonData)

    const pb = new PocketBase('http://localhost:8090')
    await pb.admins.authWithPassword('admin@email.com', 'password123')

    try {
        await deleteExistingData(pb, 'events', events, 'content')
        await deleteExistingData(pb, 'dataset', datasets)
        await deleteExistingData(pb, 'tag', tags, 'name')
        await deleteExistingData(pb, 'users', users, 'email')

        const createdTags = await seedData(pb, 'tag', tags)

        const createdUsers = await seedUser(pb, users)

        const createdDataset = await seedDataset(
            pb,
            'dataset',
            datasets,
            createdTags
        )

        const createdEvent = await seedEvents(
            pb,
            'events',
            events,
            createdUsers,
            createdDataset
        )
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
            if (existingItem[identifier].includes(newItem[identifier])) {
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

async function seedUser(pb, data) {
    const roles = await pb.collection('roles').getFullList()
    const items = []
    for (const itemData of data) {
        const newItem = await pb.collection('users').create(
            {
                ...itemData,
                role: roles[1].id,
                slug: stringWithHyphen(itemData.name),
            },
            { expand: 'roles' },
            { $autoCancel: false }
        )
        items.push(newItem)
    }
    return items
}
async function seedDataset(pb, collectionName, data, tags) {
    const items = []
    for (const itemData of data) {
        const newItem = await pb.collection(collectionName).create(
            {
                ...itemData,
                slug: stringWithHyphen(itemData.title),
                tag: [getRandomTag(tags)],
            },
            { $autoCancel: false }
        )
        items.push(newItem)
    }
    return items
}

async function seedEvents(pb, collectionName, data, users, dataset) {
    const items = []

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < data.length; j++) {
            if (data[j].types == 'ownerReq' || data[j].types == 'ownerAccept') {
                const randomIndex = Math.floor(Math.random() * users.length)
                let newContent = `<b>${users[randomIndex].name}</b>`
                let subjectUserId = ``
                if (data[j].content.length > 8) {
                    newContent = `${newContent} ${data[j].content}`
                    subjectUserId = users[randomIndex].id
                } else {
                    const randomSubjectIndex = Math.floor(
                        Math.random() * users.length
                    )
                    newContent = `${newContent} ${data[j].content} <b>${users[randomSubjectIndex].name}</b> som dataägare`
                    subjectUserId = users[randomSubjectIndex].id
                }

                const newItem = await pb.collection(collectionName).create(
                    {
                        ...data[j],
                        dataset: dataset[j].id,
                        user: users[j].id,
                        subject: subjectUserId,
                        content: newContent,
                    },
                    { expand: 'user,subject' },
                    { $autoCancel: false }
                )
                items.push(newItem)
            } else {
                const newItem = await pb.collection(collectionName).create(
                    {
                        ...data[j],
                        dataset: dataset[j].id,
                        user: users[j].id,
                    },
                    { expand: 'user,subject' },
                    { $autoCancel: false }
                )
                items.push(newItem)
            }
        }
    }
}
