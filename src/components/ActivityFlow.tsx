'use client'
import { AuthorizedUserSchema, EventSchema } from '@/types/zod'
import { Avatar, AvatarFallback } from './ui/avatar'
import moment from 'moment'
import EventForm from './EventForm'
import { useState } from 'react'

export default function ActivityFlow({
    user,
    datasetId,
    eventData,
}: {
    user: AuthorizedUserSchema
    datasetId: string
    eventData: EventSchema[]
}) {
    const [events, setEvents] = useState<EventSchema[]>(eventData)

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
