'use client'
import { useContext, useEffect } from 'react'
import { EventForm } from '.'
import Comment from './comment'
import { EventContext } from '@/lib/context/eventContext'
import { EventSchema } from '@/types/zod'
import * as api from '@/adapters/api'
import { stringWithHyphen } from '@/lib/utils'
import { authContext } from '@/lib/context/authContext'
import { DatasetContext } from '@/lib/context/datasetContext'

export default function ActivityFlow() {
    const events = useContext(EventContext)
    const { dataset } = useContext(DatasetContext)
    const user = useContext(authContext)

    const sortEvents = (a: EventSchema, b: EventSchema) => {
        if (!a.created || !b.created) return 0

        const aDate = new Date(a.created)
        const bDate = new Date(b.created)

        if (aDate === bDate) return 0
        return aDate < bDate ? 1 : -1
    }
    useEffect(() => {
        async function setData() {
            events.setEvents(
                (await api.getEvents(dataset.id, user.cookie)).sort(sortEvents)
            )
        }
        setData()
    }, [])


    return (
        <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Aktivitet</h2>
            <p className="text-sm">
                Bli den första att skriva något kring det här datasetet.
            </p>

            <EventForm datasetId={dataset.id} />

            <ul className="flex flex-col gap-4" aria-label="Aktivitets flödet">
                {events.events.map((event, index) => (
                    <Comment event={event} key={index} />
                ))}
            </ul>
        </section>
    )
}
