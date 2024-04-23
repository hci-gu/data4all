import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from '@/components/ui/dialog'
import User from '../user'
import { AuthorizedUserSchema, EventSchema, datasetSchema } from '@/types/zod'
import { createEvent } from '@/adapters/api'
import { useContext } from 'react'
import { EventContext } from '@/lib/context/eventContext'
import { cookies } from 'next/headers'
export default function SuggestDataOwner({
    user,
    dataset,
    signInUser,
    authCookie,
}: {
    user: AuthorizedUserSchema | null
    signInUser: AuthorizedUserSchema
    authCookie: string
    dataset: datasetSchema
}) {
    if (!user) return

    const eventContext = useContext(EventContext)

    if (!eventContext) {
        throw new Error('EventContext is not provided')
    }

    const onSubmit = async () => {
        const content =
            signInUser?.id === user.id
                ? `<b>${signInUser.name}</b> föreslog sig själv som dataägare`
                : `<b>${signInUser.name}</b> föreslog <b>${user.name}</b> som dataägare`

        const data: EventSchema = {
            content,
            dataset: dataset.id,
            user: signInUser,
            types: 'ownerReq',
            subject: user,
        }

        const respond = await createEvent(
            { ...data, user: data.user.id },
            authCookie
        )
        eventContext.setEvents((prev) => [respond, ...prev])
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="p-2">
                    <User user={user} />
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Godkänn dataägare</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Genom att fortsätta sätter du <b>{user.name}</b> som
                    dataägare för <b>{dataset.title}</b>. Den nya dataägaren får
                    då rättigheter till att redigera datasetet.
                </DialogDescription>
                <DialogFooter>
                    <DialogClose
                        onClick={onSubmit}
                        className="inline-flex h-10 w-full items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                    >
                        Godkänn
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
