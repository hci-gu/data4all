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
                types,
                content,
                user: auth.id,
                subject: [event.user],
                dataset: dataset.id,
                mentions: [],
            },
            cookie
        )
        eventContext.setEvents((prev) => [
            {
                types,
                content,
                user: auth,
                subject: [event.user],
                dataset: dataset.id,
                Subject_role: [''],
            },
            ...prev,
        ])
    }

    const accept = async () => {
        const subject = event.subject

        console.log('acceptDatasetOwner', { subject })
        
        if (subject) {
            const updateResponse = await updateDataset(
                dataset.id,
                { dataowner: subject[0] },
                cookie
            )
            console.log('updateResponse', { updateResponse });
            
            setDataset(
                updateResponse
            )

            await updateEvent(
                'ownerAccept',
                `<b>${auth.name}</b> godkände <b>${subject[0].name}</b> som dataägare`
            )
        }
    }
    const decline = async () => {
        await updateEvent(
            'ownerDecline',
            `<b>${auth.name}</b> godkände inte <b>${event.user.name}</b> som dataägare`
        )
    }

    const lastUserEvent = eventContext.events.find((e) => {
        if (!e.subject || !event.subject) {
            return false
        }
        return e.subject[0].id === event.subject[0].id
    })

    if (
        (lastUserEvent && lastUserEvent.id !== event.id) ||
        !auth.is_admin ||
        dataset.dataowner
    ) {
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
