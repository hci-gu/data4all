'use server'

import { EventCreateSchema, EventFeedResponse, EventSchema } from '@/types/zod'
import { getPocketBase } from './pocketbase'
import { eventResponseCleanup, feedResponseCleanup } from './utils'
import { revalidatePath } from 'next/cache'
import { FeedFilter } from '@/types/constants'

export const getEventsForDataset = async (datasetId: string) => {
    const pb = await getPocketBase()
    const response = await pb.collection<EventSchema>('events').getList(1, 50, {
        filter: `dataset="${datasetId}"`,
        expand: 'user,user.role,subject,subject.role,subjectRole',
        sort: '-created',
    })

    const events = EventSchema.array().parse(
        response.items.map(eventResponseCleanup)
    )
    return events
}

export const createEvent = async (event: EventCreateSchema) => {
    const pb = await getPocketBase()

    const record = await pb.collection('events').create(
        {
            ...event,
            user: pb.authStore.model?.id,
            subject: event.subject?.map((s) => s.id),
            subjectRole: event.subjectRole?.map((r) => r.id),
        },
        { expand: 'user.role,subject' }
    )
    record.user = pb.authStore.model

    revalidatePath(`/dataset`)
    const parsed = EventSchema.parse(eventResponseCleanup(record))
    return parsed
}

export const getFeed = async (filter: FeedFilter, page: number) => {
    const pb = await getPocketBase()
    let records = []
    switch (filter) {
        case FeedFilter.Tagged:
            //@ts-ignore
            records = await pb
                .collection('events')
                //@ts-ignore
                .getList(page, 15, {
                    sort: '-created',
                    filter: `subject ~ "${pb.authStore.model?.id}"`,
                    expand: 'user,subject,dataset',
                })

            break
        case FeedFilter.MyDatasets:
            const ownedDatasets = await pb.collection('dataset').getFullList({
                filter: `dataowner="${pb.authStore.model?.id}"`,
            })

            if (ownedDatasets.length > 0) {
                //@ts-ignore
                records = await pb
                    .collection('events')
                    //@ts-ignore
                    .getList(page, 15, {
                        sort: '-created',
                        filter: ownedDatasets
                            .map((dataset) => `dataset="${dataset.id}"`)
                            .join('||'),
                        expand: 'user,subject,dataset',
                    })
            } else {
                records = {
                    //@ts-ignore
                    page: 1,
                    perPage: 15,
                    totalItems: 0,
                    totalPages: 1,
                    items: [],
                }
            }
            break
        case FeedFilter.All:
            //@ts-ignore
            records = await pb
                .collection('events')
                //@ts-ignore
                .getList(page, 15, {
                    sort: '-created',
                    expand: 'user,subject,dataset',
                })
            break
    }

    return EventFeedResponse.parse(feedResponseCleanup(records))
}
