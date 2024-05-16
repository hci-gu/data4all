'use client'
import { authContext } from '@/lib/context/authContext'
import { EventSchema, eventTypeSchema } from '@/types/zod'
import { useContext } from 'react'
import { Button } from '../ui/button'
import { updateDataset, createEvent } from '@/adapters/api'
import { EventContext } from '@/lib/context/eventContext'
import { DatasetContext } from '@/lib/context/datasetContext'

export default function AcceptDatasetOwner({ event }: { event: EventSchema }) {
    const { auth, cookie } = useContext(authContext)
    const { dataset, setDataset } = useContext(DatasetContext)

    const eventContext = useContext(EventContext)

    const updateEvent = async (types: eventTypeSchema, content: string) => {
        await createEvent(
            {
                content,
                types,
                user: auth.id,
                subject: event.user,
                dataset: dataset.id,
            },
            cookie
        )
        eventContext.setEvents((prev) => [
            {
                types,
                content,
                user: auth,
                subject: event.user,
                dataset: dataset.id,
            },
            ...prev,
        ])
    }

    const accept = async () => {
        setDataset(
            await updateDataset(
                dataset.id,
                {
                    dataowner: event.user,
                },
                cookie
            )
        )

        await updateEvent(
            'ownerAccept',
            `<b>${auth.name}</b> godkände <b>${event.user.name}</b> som dataägare`
        )
    }
    const decline = async () => {
        await updateEvent(
            'ownerDecline',
            `<b>${auth.name}</b> godkände inte <b>${event.user.name}</b> som dataägare`
        )
    }

    const lastUserEvent = eventContext.events.find(
        (e) => e.subject?.id === event.subject?.id
    )

    if (dataset.dataowner) {
        return null
    }

    if (auth.role !== 'Admin') {
        return null
    }

    if (lastUserEvent && lastUserEvent.id !== event.id) {
        return null
    }

    if (event.types === 'ownerReq') {
        return (
            <div className="flex gap-2">
                <Button
                    type="submit"
                    onClick={accept}
                    className="bg-slate-500 hover:bg-slate-600"
                >
                    Godkänn
                </Button>
                <Button type="submit" onClick={decline} variant="outline">
                    Avböj
                </Button>
            </div>
        )
    }
}
