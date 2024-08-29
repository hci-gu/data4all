import {
    AuthorizedUserSchema,
    EventSchema,
    datasetWithRelationsSchema,
    eventContentSchema,
    eventTypeSchema,
} from '@/types/zod'
import { createEvent } from '@/app/actions/events'
import DataOwnerActions from './dataOwnerActions'

export default async function AcceptDatasetOwner({
    event,
    events,
    dataset,
    loggedInUser,
}: {
    event: EventSchema
    events: EventSchema[]
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

    const eventsAfterThis = events.filter((e) => e.created > event.created)
    const hasBeenAcceptedOrRejected = eventsAfterThis.some(
        (e) => e.types === 'ownerAccept' || e.types === 'ownerDecline'
    )

    if (
        event.types === 'ownerReq' &&
        loggedInUser.is_admin &&
        !hasBeenAcceptedOrRejected
    ) {
        return (
            <DataOwnerActions
                user={loggedInUser}
                dataset={dataset}
                event={event}
                updateEvent={updateEvent}
            />
        )
    }
}
