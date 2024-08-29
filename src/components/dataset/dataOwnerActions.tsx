'use client'
import {
    AuthorizedUserSchema,
    EventSchema,
    datasetWithRelationsSchema,
    eventContentSchema,
    eventTypeSchema,
} from '@/types/zod'
import { Button } from '../ui/button'
import { ownerAcceptDataset, ownerDeclineDataset } from '@/lib/slateUtilits'
import { createEvent } from '@/app/actions/events'
import { updateDataset } from '@/app/actions/datasets'

export default async function DataOwnerActions({
    user,
    dataset,
    event,
    updateEvent,
}: {
    user: AuthorizedUserSchema
    dataset: datasetWithRelationsSchema
    event: EventSchema
    updateEvent: (
        types: eventTypeSchema,
        content: eventContentSchema
    ) => Promise<void>
}) {
    const accept = async () => {
        const subject = event.subject

        if (subject) {
            await updateDataset(dataset.id, {
                dataowner: subject[0],
            })

            await updateEvent(
                'ownerAccept',
                ownerAcceptDataset(user, subject[0])
            )
        }
    }
    const decline = async () => {
        const subject = event.subject
        if (subject) {
            await updateEvent(
                'ownerDecline',
                ownerDeclineDataset(user, subject[0])
            )
        }
    }

    return (
        <div className="flex gap-2">
            <Button
                type="submit"
                onClick={accept}
                className="bg-slate-500 hover:bg-slate-600"
            >
                Godkänn
            </Button>
            <Button type="submit" onClick={decline} variant="outline">
                Avböj
            </Button>
        </div>
    )
}
