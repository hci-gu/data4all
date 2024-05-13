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
import { FeedFilter, descriptionForFeedFilter } from '@/types/constants'

type feedEvent = {
    id: string
    userName: string
    subject: string
    datasetTitle: string
    content: any
    created: string
    types: string
}

const filterFromStorage = () => {
    const filter = localStorage.getItem('activeFilter')
    if (filter) {
        return filter as FeedFilter
    }
    return FeedFilter.Tagged
}

export default function ActivityFeed({ pageNumber }: { pageNumber?: number }) {
    const cookie = useContext(authContext).cookie
    const [events, setEvents] = useState<feedEvent[]>([])
    const [loading, setLoading] = useState(true)
    const [activeFilter, setActiveFilter] = useState<FeedFilter>(
        FeedFilter.Tagged
    )
    const [anotherPage, setAnotherPage] = useState(false)
    useEffect(() => {
        setActiveFilter(filterFromStorage())
    }, [])

    useEffect(() => {
        setLoading(true)
        async function fetchEvents() {
            const events = await api.getFeed(cookie, activeFilter, pageNumber)
            if (events.length > 15) {
                setAnotherPage(true)
                const shortendEvents = events.slice(0, -1)
                setEvents(shortendEvents)
            } else {
                setEvents(events)
            }
            setLoading(false)
        }
        fetchEvents()
    }, [activeFilter])

    return (
        <>
            <div className="relative flex flex-col items-center gap-8">
                <div className="text-center [&>h2]:border-none [&>h2]:pb-0">
                    <Typography level="H2">Flöde</Typography>
                    <p className="text-xs text-slate-500">{activeFilter}</p>
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
                            {Object.values(FeedFilter).map((filter) => (
                                <DialogClose
                                    asChild
                                    key={`FeedFilter_${filter}`}
                                >
                                    <Button
                                        onClick={() => {
                                            localStorage.setItem(
                                                'activeFilter',
                                                filter
                                            )
                                            setActiveFilter(filter)
                                        }}
                                        variant={
                                            filter == activeFilter
                                                ? 'secondary'
                                                : 'ghost'
                                        }
                                        className="h-full w-full"
                                    >
                                        <div className="h-full w-full [&>div]:w-fit">
                                            <Typography level="Large">
                                                {filter}
                                            </Typography>
                                            <p className="text-wrap text-left text-sm text-slate-500">
                                                {descriptionForFeedFilter(
                                                    filter
                                                )}
                                            </p>
                                        </div>
                                    </Button>
                                </DialogClose>
                            ))}
                        </div>
                    </DialogContent>
                </Dialog>
                <ul className="flex w-full flex-col gap-4">
                    {loading ? (
                        <p className="text-center">Laddar händelser...</p>
                    ) : events.length > 0 ? (
                        events.map((event) => (
                            <FeedItem event={event} key={event.id} />
                        ))
                    ) : (
                        <p className="text-center">Hittade inga händelser</p>
                    )}
                </ul>
            </div>
        </>
    )
}
