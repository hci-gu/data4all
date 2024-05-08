'use client'
import Typography from './ui/Typography'
import { useContext, useEffect, useState } from 'react'
import { authContext } from '@/lib/context/authContext'
import { Button } from './ui/button'
import FeedItem from './feedItem'
import { Filter } from 'lucide-react'
import * as api from '@/adapters/api'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from './ui/dialog'

type feedEvent = {
    id: string
    userName: string
    subject: string
    datasetTitle: string
    content: any
    created: string
    types: string
}

export default function ActivityFeed() {
    const cookie = useContext(authContext).cookie

    const [eventsDisplay, setEventsDisplay] = useState<feedEvent[]>([])
    const [filterHighlight, setFilterHighlight] = useState(0)
    const fliterArray = [
        'När jag blivit taggad',
        'Mina dataset',
        'Alla händelser',
    ]
    async function setEventsToShowAll() {
        setFilterHighlight(2)
        setEventsDisplay(await api.getAllEvents(cookie))
        localStorage.setItem('currentFilter', '2')
    }
    async function setEventsToTagged() {
        setFilterHighlight(0)
        setEventsDisplay(await api.taggedEvents(cookie))
        localStorage.setItem('currentFilter', '0')
    }
    async function setEventsToMyDatasets() {
        setFilterHighlight(1)
        setEventsDisplay(await api.getMyDatasetsEvents(cookie))
        localStorage.setItem('currentFilter', '1')
    }

    useEffect(() => {
        const value: any = localStorage.getItem('currentFilter') || '0'

        setFilterHighlight(value as number)
        if ((value as number) == 0) {
            setEventsToTagged()
        }
        if ((value as number) == 1) {
            setEventsToMyDatasets()
        }
        if ((value as number) == 2) {
            setEventsToShowAll()
        }
    }, [])

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
                                    onClick={() => setEventsToTagged()}
                                    variant={
                                        filterHighlight == 0
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
                                    onClick={() => setEventsToMyDatasets()}
                                    variant={
                                        filterHighlight == 1
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
                            <DialogClose asChild>
                                <Button
                                    onClick={() => setEventsToShowAll()}
                                    variant={
                                        filterHighlight == 2
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
                        </div>
                    </DialogContent>
                </Dialog>

                <ul className="flex w-full flex-col gap-4">
                    {eventsDisplay && eventsDisplay.length > 0 ? (
                        eventsDisplay.map((event) => (
                            <FeedItem
                            event={event}
                            key={event.id}
                            />
                        )
                        ))
                     : (
                        <p className="text-center">Hittade inga händelser</p>
                    )}
                </ul>
            </div>
        </>
    )
}
