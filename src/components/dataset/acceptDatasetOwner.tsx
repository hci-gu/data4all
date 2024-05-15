'use client'
import { authContext } from '@/lib/context/authContext'
import { EventSchema } from '@/types/zod'
import { useContext } from 'react'
import { Button } from '../ui/button'
import { updateDataset } from '@/adapters/api'

export default function AcceptDatasetOwner({
    event,
    datasetId,
}: {
    event: EventSchema
    datasetId: string
}) {
    const userContext = useContext(authContext)
    const user = userContext.auth
    const cookie = userContext.cookie

    const accept = async () => {
        console.log('Accept', datasetId)

        await updateDataset(
            datasetId,
            {
                dataowner: event.user.id,
                slug: 'air-quality-index',
                title: 'Air Quality Index',
            },
            cookie
        )
        console.log('Accept', datasetId)
    }
    const decline = async () => {
        console.log('Decline', datasetId)
    }

    if (user.role === 'Admin') {
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
