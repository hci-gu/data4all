'use client'
import { EventSchema } from '@/types/zod'
import { Dispatch, SetStateAction, createContext, useState } from 'react'

type contextSchema = {
    events: EventSchema[] | undefined
    setEvents: Dispatch<SetStateAction<EventSchema[] | undefined>>
}

export const EventContext = createContext<contextSchema | null>(null)

export const EventProvider = ({
    children,
    event,
}: {
    children: React.ReactNode
    event: EventSchema[] | undefined
}) => {
    const [events, setEvents] = useState<EventSchema[] | undefined>(event)
    return (
        <EventContext.Provider value={{ events, setEvents }}>
            {children}
        </EventContext.Provider>
    )
}
