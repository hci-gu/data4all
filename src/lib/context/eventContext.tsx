'use client'
import { EventSchema } from '@/types/zod'
import { Dispatch, SetStateAction, createContext, useState } from 'react'

type contextSchema = {
    events: EventSchema[]
    setEvents: Dispatch<SetStateAction<EventSchema[]>>
}

export const EventContext = createContext<contextSchema | null>(null)

export const EventProvider = ({
    children,
    event,
}: {
    children: React.ReactNode
    event: EventSchema[]
}) => {
    const [events, setEvents] = useState<EventSchema[]>(event)
    return (
        <EventContext.Provider value={{ events, setEvents }}>
            {children}
        </EventContext.Provider>
    )
}
