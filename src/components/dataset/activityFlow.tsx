import Comment from './comment'
import { CommentInput } from '../slate/commentInput'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { getInitials } from '@/lib/utils'
import { getEventsForDataset } from '@/app/actions/events'
import { getLoggedInUser } from '@/app/actions/auth'
import { datasetWithRelationsSchema } from '@/types/zod'

export default async function ActivityFlow({
    dataset,
}: {
    dataset: datasetWithRelationsSchema
}) {
    const events = await getEventsForDataset(dataset.id)
    const user = await getLoggedInUser()
    // const { events, setEvents } = useContext(EventContext)
    // const { dataset } = useContext(DatasetContext)
    // const { cookie, auth } = useContext(authContext)

    // const [users, setUsers] = useState<AuthorizedUserSchema[]>([])
    // const [roles, setRoles] = useState<roleSchema[]>([])

    // useEffect(() => {
    //     async function setData() {
    //         setEvents(
    //             (await api.getEvents(dataset.id, cookie)).sort(sortEvents)
    //         )
    //         setRoles(await api.getRoles())
    //         setUsers(await api.getUsers('', cookie))
    //     }
    //     setData()
    // }, [dataset.id, cookie, setEvents])

    return (
        <>
            <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-[0.5625rem]">
                        {getInitials(user?.name)}
                    </AvatarFallback>
                </Avatar>
                <CommentInput users={[]} roles={[]} datasetId={dataset.id} />
            </div>
            <ul className="flex flex-col gap-4" aria-label="Aktivitets flödet">
                {events.map((event) => {
                    return (
                        <Comment
                            loggedInUser={user}
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
