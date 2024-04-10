'use client'
import { AuthorizedUserSchema, EventSchema } from '@/types/zod'
import { useState } from 'react'
import { EventForm } from '.'
import Comment from './comment'

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
                    <Comment event={event} key={index} />
                ))}
            </ul>
        </section>
    )
}
