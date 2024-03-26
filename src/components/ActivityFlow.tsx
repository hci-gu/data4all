"use client"

import { AuthorizedUserSchema, EventAPISchema, EventSchema } from "@/types/zod"
import { useEffect, useState } from "react"
import { Avatar, AvatarFallback } from "./ui/avatar"
import moment from 'moment'
import EventForm from "./EventForm"
import * as api from '@/adapters/api'


const getEvents = async (datasetId: string) => {
    const events = EventAPISchema.parse(
        await api.getEvent(datasetId)
    )
    return events
}

export default function ActivityFlow({ user, datasetId, eventRes }: { user: AuthorizedUserSchema, datasetId: string, eventRes: EventSchema[] }) {
    const [events, setEvents] = useState<EventSchema[]>(eventRes)

    return (
        <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Aktivitet</h2>
            <p className="text-sm">
                Bli den första att skriva något kring det här datasetet.
            </p>

            <EventForm user={user} datasetId={datasetId} setEvents={setEvents} />

            <ul
                className="flex flex-col gap-4"
                aria-label="Aktivitets flödet"
            >
                {events &&
                    events.map((event, index) => (
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