import PocketBase from 'pocketbase'
import fs from 'fs/promises'
import { SeedData } from './types/types'
import {
    AuthorizedUserSchema,
    EventSchema,
    collectionNameSchema,
    datasetSchema,
    roleSchema,
    tagSchema,
} from '@/types/zod'

const stringWithHyphen = (text: string) => {
    return text.toLowerCase().replaceAll(' ', '-')
}
const getRandomTag = (tags: tagSchema[]) => {
    const randomIndex = Math.floor(Math.random() * tags.length)
    return tags[randomIndex].id
}

;(async () => {
    const jsonData = await fs.readFile('seed/seedData.json', 'utf-8')
    const { tags, datasets, users, events, roles }: SeedData =
        JSON.parse(jsonData)

    const pb = new PocketBase('http://localhost:8090')
    await pb.admins.authWithPassword('admin@email.com', 'password123')

    try {
        await deleteExistingData(pb, 'events', events, 'content')
        await deleteExistingData(pb, 'dataset', datasets)
        await deleteExistingData(pb, 'users', users, 'email')
        await deleteExistingData(pb, 'roles', roles, 'name')
        await deleteExistingData(pb, 'tag', tags, 'name')

        const createdTags = await seedTag(pb, tags)

        const createdRoles = await seedRole(pb, roles)

        const createdUsers = await seedUser(pb, users)

        const createdDataset = await seedDataset(pb, datasets, createdTags)

        const createdEvent = await seedEvents(
            pb,
            events,
            createdUsers,
            createdDataset
        )
    } catch (error) {
        console.error('There was an error: ', JSON.stringify(error, null, 2))
    }
})()

async function deleteExistingData(
    pb: PocketBase,
    collectionName: collectionNameSchema,
    data: any[],
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

async function seedTag(pb: PocketBase, data: tagSchema[]) {
    const items = []
    for (const itemData of data) {
        const newItem = await pb
            .collection<tagSchema>('tag')
            .create(itemData, { $autoCancel: false })
        items.push(newItem)
    }
    return items
}
async function seedRole(pb: PocketBase, data: roleSchema[]) {
    const items = []
    for (const itemData of data) {
        const newItem = await pb
            .collection<roleSchema>('roles')
            .create(itemData, { $autoCancel: false })
        items.push(newItem)
    }
    return items
}

async function seedUser(pb: PocketBase, data: AuthorizedUserSchema[]) {
    const roles = await pb.collection('roles').getFullList()
    const items = []

    for (const itemData of data) {
        const newItem = await pb
            .collection<AuthorizedUserSchema>('users')
            .create(
                {
                    ...itemData,
                    role: roles[1].id,
                    slug: stringWithHyphen(itemData.name),
                },
                { expand: 'roles', $autoCancel: false }
            )
        items.push(newItem)
    }
    return items
}
async function seedDataset(
    pb: PocketBase,
    data: datasetSchema[],
    tags: tagSchema[]
) {
    const items = []
    for (const itemData of data) {
        const newItem = await pb.collection<datasetSchema>('dataset').create(
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

async function seedEvents(
    pb: PocketBase,
    data: EventSchema[],
    users: AuthorizedUserSchema[],
    dataset: datasetSchema[]
) {
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

                const newItem = await pb.collection('events').create(
                    {
                        ...data[j],
                        dataset: dataset[j].id,
                        user: users[j].id,
                        subject: subjectUserId,
                        content: newContent,
                    },
                    { expand: 'user,subject', $autoCancel: false }
                )
                items.push(newItem)
            } else {
                const newItem = await pb.collection('events').create(
                    {
                        ...data[j],
                        dataset: dataset[j].id,
                        user: users[j].id,
                    },
                    { expand: 'user,subject', $autoCancel: false }
                )
                items.push(newItem)
            }
        }
    }
}