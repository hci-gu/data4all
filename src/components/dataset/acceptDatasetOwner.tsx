import {
    AuthorizedUserSchema,
    EventSchema,
    datasetWithRelationsSchema,
} from '@/types/zod'
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
            />
        )
    }
}
