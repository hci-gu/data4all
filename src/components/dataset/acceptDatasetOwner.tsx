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

export default async function AcceptDatasetOwner({
    event,
    dataset,
    loggedInUser,
}: {
    event: EventSchema
    dataset: datasetWithRelationsSchema
    loggedInUser: AuthorizedUserSchema
}) {
    if (!loggedInUser) return

    const updateEvent = async (
        types: eventTypeSchema,
        content: eventContentSchema
    ) => {
        const subject = event.subject
        if (subject) {
            await createEvent({
                types,
                content,
                subject: subject,
                dataset: dataset.id,
                mentions: [],
            })
        }
    }

    const accept = async () => {
        const subject = event.subject

        if (subject) {
            await updateDataset(dataset.id, {
                dataowner: subject[0],
            })

            await updateEvent(
                'ownerAccept',
                ownerAcceptDataset(loggedInUser, subject[0])
            )
        }
    }
    const decline = async () => {
        const subject = event.subject
        if (subject) {
            await updateEvent(
                'ownerDecline',
                ownerDeclineDataset(loggedInUser, subject[0])
            )
        }
    }

    // const allEventFromSubjectUser = eventContext.events.filter(
    //     (e) =>
    //         e.subject?.[0].id === event.subject?.[0].id && e.types !== 'comment'
    // )

    // if (allEventFromSubjectUser[0].id !== event.id) {
    //     return
    // }

    if (event.types === 'ownerReq' && loggedInUser.is_admin) {
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
}
