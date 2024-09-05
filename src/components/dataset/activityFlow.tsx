import Comment from './comment'
import { CommentInput } from '../slate/commentInput'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { getInitials } from '@/lib/utils'
import { getEventsForDataset } from '@/app/actions/events'
import { getLoggedInUser, getRoles, getUsers } from '@/app/actions/auth'
import { datasetWithRelationsSchema } from '@/types/zod'

export default async function ActivityFlow({
    dataset,
}: {
    dataset: datasetWithRelationsSchema
}) {
    const user = await getLoggedInUser()

    const [events, users, roles] = await Promise.all([
        getEventsForDataset(dataset.id),
        getUsers(),
        getRoles(),
    ])

    return (
        <>
            <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-[0.5625rem]">
                        {getInitials(user?.name)}
                    </AvatarFallback>
                </Avatar>
                <CommentInput
                    users={users}
                    roles={roles}
                    datasetId={dataset.id}
                />
            </div>
            <ul className="flex flex-col gap-4" aria-label="Aktivitets flödet">
                {events.map((event) => {
                    return (
                        <Comment
                            loggedInUser={user}
                            events={events}
                            event={event}
                            dataset={dataset}
                            key={`Event_${event.id}`}
                        />
                    )
                })}
            </ul>
        </>
    )
}
