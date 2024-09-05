'use client'

import {
    AuthorizedUserSchema,
    EventSchema,
    datasetWithRelationsSchema,
} from '@/types/zod'
import { Button } from '../ui/button'
import { acceptDataOwner, declineDataOwner } from '@/app/actions/events'

export default async function DataOwnerActions({
    dataset,
    event,
}: {
    user: AuthorizedUserSchema
    dataset: datasetWithRelationsSchema
    event: EventSchema
}) {
    return (
        <div className="flex gap-2">
            <Button
                type="submit"
                onClick={() => {
                    if (event.subject != undefined) {
                        acceptDataOwner(dataset.id, event.subject[0])
                    }
                }}
                className="bg-slate-500 hover:bg-slate-600"
            >
                Godkänn
            </Button>
            <Button
                type="submit"
                onClick={() => {
                    if (event.subject != undefined) {
                        declineDataOwner(dataset.id, event.subject[0])
                    }
                }}
                variant="outline"
            >
                Avböj
            </Button>
        </div>
    )
}
