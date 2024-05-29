'use client'
import { useContext, useEffect, useState } from 'react'
import Comment from './comment'
import { EventContext } from '@/lib/context/eventContext'
import { AuthorizedUserSchema, EventSchema, roleSchema } from '@/types/zod'
import * as api from '@/adapters/api'
import { authContext } from '@/lib/context/authContext'
import { DatasetContext } from '@/lib/context/datasetContext'
import { CommentInput } from '../slate/commentInput'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { getInitials } from '@/lib/utils'

export default function ActivityFlow() {
    const { events, setEvents } = useContext(EventContext)
    const { dataset } = useContext(DatasetContext)
    const { cookie, auth } = useContext(authContext)

    const [users, setUsers] = useState<AuthorizedUserSchema[]>([])
    const [roles, setRoles] = useState<roleSchema[]>([])

    const sortEvents = (a: EventSchema, b: EventSchema) => {
        if (!a.created || !b.created) return 0

        const aDate = new Date(a.created)
        const bDate = new Date(b.created)

        if (aDate === bDate) return 0
        return aDate < bDate ? 1 : -1
    }
    useEffect(() => {
        console.log('ActivityFlow useEffect', dataset.id, cookie)
        async function setData() {
            setEvents(
                (await api.getEvents(dataset.id, cookie)).sort(sortEvents)
            )
            setRoles(await api.getRoles())
            setUsers(await api.getUsers('', cookie))
        }
        setData()
    }, [dataset.id, cookie, setEvents])

    return (
        <>
            <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-[0.5625rem]">
                        {getInitials(auth.name)}
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
                    return <Comment event={event} key={event.id} />
                })}
            </ul>
        </>
    )
}
