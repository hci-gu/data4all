'use client'
import { AuthorizedUserSchema, EventSchema } from '@/types/zod'
import moment from 'moment'
import { useState } from 'react'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { EventForm } from '.'

export default function ActivityFlow({
    user,
    datasetId,
    initialEvents,
}: {
    user: AuthorizedUserSchema
    datasetId: string
    initialEvents: EventSchema[]
}) {
    const [events, setEvents] = useState(initialEvents)

    return (
        <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Aktivitet</h2>
            <p className="text-sm">
                Bli den första att skriva något kring det här datasetet.
            </p>

            <EventForm
                user={user}
                datasetId={datasetId}
                setEvents={setEvents}
            />

            <ul className="flex flex-col gap-4" aria-label="Aktivitets flödet">
                {events.map((event, index) => (
                    <li className="flex gap-2" key={index}>
                        <Avatar>
                            <AvatarFallback>e</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-1">
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: event.content,
                                }}
                            />
                            <b className="text-xs">
                                {moment(event.created).fromNow()}
                            </b>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    )
}
