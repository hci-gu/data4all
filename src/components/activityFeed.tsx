'use client'
import Typography from './ui/Typography'
import { useContext, useEffect, useState } from 'react'
import { authContext } from '@/lib/context/authContext'
import { Button } from './ui/button'
import FeedItem from './feedItem'
import { ChevronLeft, ChevronRight, Filter, Loader2 } from 'lucide-react'
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
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from './ui/pagination'
import { EventFeedResponse } from '@/types/zod'

const filterFromStorage = () => {
    const filter = localStorage.getItem('activeFilter')
    if (filter) {
        return filter as FeedFilter
    }
    return FeedFilter.Tagged
}

export default function ActivityFeed({ pageNumber }: { pageNumber: number }) {
    const cookie = useContext(authContext).cookie
    const [events, setEvents] = useState<EventFeedResponse>()
    const [loading, setLoading] = useState(true)
    const [activeFilter, setActiveFilter] = useState<FeedFilter>(
        FeedFilter.Tagged
    )

    let nextPage = pageNumber
    let previusPage = pageNumber
    if (!!events) {
        if (events.page !== events.totalPages) {
            nextPage = events?.page + 1
        }
        if (events?.page !== 1) {
            previusPage = events?.page - 1
        }
    }
    useEffect(() => {
        setActiveFilter(filterFromStorage())
    }, [])

    useEffect(() => {
        setLoading(true)
        async function fetchEvents() {
            const events = await api.getFeed(cookie, activeFilter, pageNumber)
            setEvents(events)

            setLoading(false)
        }
        fetchEvents()
    }, [activeFilter, pageNumber, cookie])
    
    console.log(pageNumber, nextPage, previusPage);
    

    return (
        <>
            <div className="relative flex min-h-[1284px] flex-col items-center justify-between gap-8">
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
                <ul className="flex h-full w-full flex-col gap-4">
                    {loading ? (
                        <p className="flex flex-col items-center text-center text-slate-500">
                            <Loader2
                                className="h-12 w-12 animate-spin"
                                color="#cbd5e1"
                            />
                            Laddar händelser...
                        </p>
                    ) : !!events && events.items?.length > 0 ? (
                        events.items.map((event) => (
                            <FeedItem event={event} key={event.id} />
                        ))
                    ) : (
                        <p className="text-center">Hittade inga händelser</p>
                    )}
                </ul>
                {events && events.totalPages > 1 && (
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                {pageNumber == 1 ? (
                                    <div className="font flex h-10 cursor-default items-center gap-1 px-4 py-2 text-sm font-medium opacity-50">
                                        <ChevronLeft
                                            className="h-4 w-4"
                                            color="#cbd5e1"
                                        />
                                        <span>Föregående</span>
                                    </div>
                                ) : (
                                    <PaginationPrevious
                                        href={`/?pageNumber=${previusPage}`}
                                    />
                                )}
                            </PaginationItem>
                            <PaginationItem>
                                {pageNumber == 1 ? (
                                    <div className="font flex h-10 cursor-default items-center gap-1 px-4 py-2 text-sm font-medium opacity-0">
                                        1
                                    </div>
                                ) : (
                                    <PaginationLink href={`/?pageNumber=${1}`}>
                                        {1}
                                    </PaginationLink>
                                )}
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink
                                    isActive={true}
                                    className="cursor-default hover:bg-transparent"
                                >
                                    {pageNumber}
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                {pageNumber >= events.totalPages ? (
                                    <div className="font flex h-10 cursor-default items-center gap-1 px-4 py-2 text-sm font-medium opacity-0">
                                        {events.totalPages}
                                    </div>
                                ) : (
                                    <PaginationLink
                                        href={`/?pageNumber=${events.totalPages}`}
                                    >
                                        {events?.totalPages}
                                    </PaginationLink>
                                )}
                            </PaginationItem>
                            <PaginationItem>
                                {pageNumber >= events.totalPages ? (
                                    <div className="font flex h-10 cursor-default items-center gap-1 px-4 py-2 text-sm font-medium opacity-50">
                                        <span>Nästa</span>
                                        <ChevronRight
                                            className="h-4 w-4"
                                            color="#cbd5e1"
                                        />
                                    </div>
                                ) : (
                                    <PaginationNext
                                        href={`/?pageNumber=${nextPage}`}
                                    />
                                )}
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                )}
            </div>
        </>
    )
}
