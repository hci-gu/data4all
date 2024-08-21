'use client'
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
import {
    AuthorizedUserSchema,
    datasetWithRelationsSchema,
    EventCreateSchema,
} from '@/types/zod'
import {
    SuggestSelfAsDataOwner,
    SuggestSomeOneElseAsDataOwner,
} from '@/lib/slateUtilits'
import { createEvent } from '@/app/actions/events'

export default function SuggestDataOwner({
    dataset,
    loggedInUser,
    user,
}: {
    dataset: datasetWithRelationsSchema
    loggedInUser: AuthorizedUserSchema
    user: AuthorizedUserSchema | null
}) {
    if (!user) return

    const onSubmit = async () => {
        const content =
            loggedInUser.id === user.id
                ? SuggestSelfAsDataOwner(loggedInUser)
                : SuggestSomeOneElseAsDataOwner(loggedInUser, user)

        const data: EventCreateSchema = {
            content,
            dataset: dataset.id,
            types: 'ownerReq',
            subject: [user],
            mentions: [],
        }

        await createEvent(data)
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
