'use client'
import { AuthorizedUserSchema } from '@/types/zod'
import { useContext } from 'react'
import { EventForm } from '.'
import Comment from './comment'
import { EventContext } from '@/lib/context/eventContext'

export default function ActivityFlow({
    datasetId,
}: {
    datasetId: string
}) {
    const eventContext = useContext(EventContext)

    if (!eventContext) {
        throw new Error('EventContext is not provided')
    }

    return (
        <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Aktivitet</h2>
            <p className="text-sm">
                Bli den första att skriva något kring det här datasetet.
            </p>

            <EventForm user={user} datasetId={datasetId} />

            <ul className="flex flex-col gap-4" aria-label="Aktivitets flödet">
                {eventContext.events.map((event, index) => (
                    <Comment event={event} key={index} />
                ))}
            </ul>
        </section>
    )
}
