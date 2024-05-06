'use client'
import { EventSchema, datasetSchema } from '@/types/zod'
import Typography from './ui/Typography'
import { useContext, useEffect, useState } from 'react'
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
    const [filterHighlight, setFilterHighlight] = useState(0)
    const fliterArray = ['Alla händelser', 'När jag blivit taggad', 'Mina dataset']

    function setEventsToDefualt() {
        setFilterHighlight(0)
        setEventsDisplay(events)
        localStorage.setItem('currentFilter', '0')
    }
    function setEventsToTagged() {
        let newEventArray: EventSchema[] = []

        events.map((event) => {
            if (event.subject?.id == user.auth.id) {
                newEventArray.push(event)
            }
        })
        setFilterHighlight(1)
        setEventsDisplay(newEventArray)
        localStorage.setItem('currentFilter', '1')
    }

    useEffect(() => {
        const value: any = localStorage.getItem('currentFilter') || '0'

        setFilterHighlight(value as number)
        if ((value as number) == 0) {
            setEventsToDefualt()
        }
        if ((value as number) == 1) {
            setEventsToTagged()
        }
    }, [localStorage.getItem('currentFilter')])

    return (
        <>
            <div className="relative flex flex-col items-center gap-8">
                <div className="text-center [&>h2]:border-none [&>h2]:pb-0">
                    <Typography level="H2">Flöde</Typography>
                    <p className="text-xs text-slate-500">
                        {fliterArray[filterHighlight]}
                    </p>
                </div>
                <Dialog>
                    <DialogTrigger className="absolute right-0 top-1">
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
                                        filterHighlight == 0
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
                                        filterHighlight == 1
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
                                        filterHighlight == 2
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
