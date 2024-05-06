'use client'
import { EventSchema, datasetSchema } from '@/types/zod'
import Typography from './ui/Typography'
import { useContext, useState } from 'react'
import { authContext } from '@/lib/context/authContext'
import { Button } from './ui/button'
import FeedItem from './feedItem'
import { Filter, X } from 'lucide-react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from './ui/dialog'

function getDatasetFromId(id: string, datasets: datasetSchema[]) {
    for (const dataset of datasets) {
        if (dataset.id === id) {
            return dataset
        }
    }
}

export default function ActivityFeed({
    events,
    datasets,
}: {
    events: EventSchema[]
    datasets: datasetSchema[]
}) {
    const user = useContext(authContext)

    const [eventsDisplay, setEventsDisplay] = useState(events)
    const [sortHighlight, setSortHighlight] = useState(0)

    function setEventsToDefualt() {
        setSortHighlight(0)
        setEventsDisplay(events)
    }
    function setEventsToTagged() {
        let newEventArray: EventSchema[] = []

        events.map((event) => {
            if (event.subject?.id == user.auth.id) {
                newEventArray.push(event)
            }
        })
        setSortHighlight(1)
        setEventsDisplay(newEventArray)
    }

    return (
        <>
            <div className="relative flex flex-col items-center gap-8 [&>h2]:border-none">
                <Typography level="H2">Flöde</Typography>
                <Dialog>
                    <DialogTrigger className="absolute right-0 top-0">
                        <Filter />
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader className="relative [&>*]:m-0">
                            <div className="flex justify-center">
                                <DialogTitle>Filtrera flöde</DialogTitle>
                            </div>
                            <DialogDescription>
                                Flödet sorterar alltid de mest relevanta
                                händelserna för dig längst upp.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid grid-cols-1 grid-rows-3 gap-2">
                            <DialogClose asChild>
                                <Button
                                    onClick={() => setEventsToDefualt()}
                                    variant={
                                        sortHighlight == 0
                                            ? 'secondary'
                                            : 'ghost'
                                    }
                                    className="h-full w-full"
                                >
                                    <div className="h-full w-full [&>div]:w-fit">
                                        <Typography level="Large">
                                            Visa allt
                                        </Typography>
                                        <p className="text-wrap text-left text-sm text-slate-500">
                                            Se senaste kommentarer och händelser
                                            i alla dataset
                                        </p>
                                    </div>
                                </Button>
                            </DialogClose>
                            <DialogClose asChild>
                                <Button
                                    onClick={() => setEventsToTagged()}
                                    variant={
                                        sortHighlight == 1
                                            ? 'secondary'
                                            : 'ghost'
                                    }
                                    className="h-full w-full"
                                >
                                    <div className="h-full w-full [&>div]:w-fit">
                                        <Typography level="Large">
                                            Taggningar
                                        </Typography>
                                        <p className="text-wrap text-left text-sm text-slate-500">
                                            Se händelser där du eller din roll
                                            är taggad eller när något hänt i
                                            dataset du kommenterat.
                                        </p>
                                    </div>
                                </Button>
                            </DialogClose>
                            <DialogClose asChild>
                                <Button
                                    onClick={() => setEventsToDefualt()}
                                    variant={
                                        sortHighlight == 2
                                            ? 'secondary'
                                            : 'ghost'
                                    }
                                    className="h-full w-full"
                                >
                                    <div className="h-full w-full [&>div]:w-fit">
                                        <Typography level="Large">
                                            Endast mina dataset
                                        </Typography>
                                        <p className="text-wrap text-left text-sm text-slate-500">
                                            Se bara händelser i dina egna
                                            dataset
                                        </p>
                                    </div>
                                </Button>
                            </DialogClose>
                        </div>
                    </DialogContent>
                </Dialog>

                <ul className="flex w-full flex-col gap-4">
                    {eventsDisplay.map((event) => (
                        <FeedItem
                            event={event}
                            dataset={getDatasetFromId(event.dataset, datasets)}
                            key={event.id}
                        />
                    ))}
                </ul>
            </div>
        </>
    )
}
