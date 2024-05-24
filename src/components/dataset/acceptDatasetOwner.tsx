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
        const subject = event.subject
        if (subject) {
            const newEvent = await createEvent(
                {
                    types,
                    content,
                    user: auth.id,
                    subject: subject,
                    dataset: dataset.id,
                    mentions: [],
                },
                cookie
            )
            eventContext.setEvents((prev) => [newEvent, ...prev])
        }
    }

    const accept = async () => {
        const subject = event.subject

        if (subject) {
            const updateResponse = await updateDataset(
                dataset.id,
                { dataowner: subject[0] },
                cookie
            )

            setDataset(updateResponse)

            await updateEvent(
                'ownerAccept',
                `<b>${auth.name}</b> godkände <b>${subject[0].name}</b> som dataägare`
            )
        }
    }
    const decline = async () => {
        const subject = event.subject
        if (subject) {
            await updateEvent(
                'ownerDecline',
                `<b>${auth.name}</b> godkände inte <b>${subject[0].name}</b> som dataägare`
            )
        }
    }

    const allEventFromSubjectUser = eventContext.events.filter(
        (e) =>
            e.subject?.[0].id === event.subject?.[0].id && e.types !== 'comment'
    )

    if (allEventFromSubjectUser[0].id !== event.id) {
        return
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
