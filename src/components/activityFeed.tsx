'use client'
import { EventSchema } from '@/types/zod'
import Typography from './ui/Typography'
import { useState } from 'react'
import Comment from './dataset/comment'

export default function ActivityFeed({ events }: { events: EventSchema[] }) {
    const [eventsDisplay, setEventsDisplay] = useState(events)

    return (
        <>
            <div className="relative flex flex-col items-center [&>h2]:border-none gap-8">
                <Typography level="H2">Flöde</Typography>
                <ul className="flex w-full flex-col gap-4">
                    {eventsDisplay.map((event) => (
                        <Comment event={event} key={event.id} />
                    ))}
                </ul>
            </div>
        </>
    )
}
