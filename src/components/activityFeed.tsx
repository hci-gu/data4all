'use client'
import { EventSchema } from '@/types/zod'
import Typography from './ui/Typography'
import { useContext, useState } from 'react'
import Comment from './dataset/comment'
import { authContext } from '@/lib/context/authContext'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from './ui/sheet'
import { Button } from './ui/button'
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from './ui/alert-dialog'

export default function ActivityFeed({ events }: { events: EventSchema[] }) {
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
                {/* <Sheet>
                    <SheetTrigger className="absolute right-0 top-0">
                        open
                    </SheetTrigger>
                    having the sheet not at the side makes the open and close animation kind of jank 
                    <SheetContent className="mr-[38%] mt-[15%] flex h-fit min-h-[355px] min-w-[440px] flex-col">
                        <SheetHeader>
                            <SheetTitle>Filtrera flöde</SheetTitle>
                            <SheetClose />
                            <SheetDescription>
                                Flödet sorterar alltid de mest relevanta
                                händelserna för dig längst upp.
                            </SheetDescription>
                        </SheetHeader>
                        <>
                            <div className="flex h-full flex-col gap-2">
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
                            </div>
                        </>
                    </SheetContent>
                </Sheet> */}

                <AlertDialog>
                    <AlertDialogTrigger className="absolute right-0 top-0">
                        open
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader className="relative [&>*]:m-0">
                            <div className="flex justify-center">
                                <AlertDialogTitle>
                                    Filtrera flöde
                                </AlertDialogTitle>
                                <AlertDialogCancel asChild>
                                    <Button
                                        variant="ghost"
                                        className="absolute right-0 top-0 border-none bg-transparent"
                                    >
                                        close
                                    </Button>
                                </AlertDialogCancel>
                            </div>
                            <AlertDialogDescription>
                                Flödet sorterar alltid de mest relevanta
                                händelserna för dig längst upp.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <div className="grid grid-cols-1 grid-rows-3 gap-2">
                            <Button
                                onClick={() => setEventsToDefualt()}
                                variant={
                                    sortHighlight == 0 ? 'secondary' : 'ghost'
                                }
                                className="h-full w-full"
                            >
                                <div className="h-full w-full [&>div]:w-fit">
                                    <Typography level="Large">
                                        Visa allt
                                    </Typography>
                                    <p className="text-wrap text-left text-sm text-slate-500">
                                        Se senaste kommentarer och händelser i
                                        alla dataset
                                    </p>
                                </div>
                            </Button>
                            <Button
                                onClick={() => setEventsToTagged()}
                                variant={
                                    sortHighlight == 1 ? 'secondary' : 'ghost'
                                }
                                className="h-full w-full"
                            >
                                <div className="h-full w-full [&>div]:w-fit">
                                    <Typography level="Large">
                                        Taggningar
                                    </Typography>
                                    <p className="text-wrap text-left text-sm text-slate-500">
                                        Se händelser där du eller din roll är
                                        taggad eller när något hänt i dataset du
                                        kommenterat.
                                    </p>
                                </div>
                            </Button>
                            <Button
                                onClick={() => setEventsToDefualt()}
                                variant={
                                    sortHighlight == 2 ? 'secondary' : 'ghost'
                                }
                                className="h-full w-full"
                            >
                                <div className="h-full w-full [&>div]:w-fit">
                                    <Typography level="Large">
                                        Endast mina dataset
                                    </Typography>
                                    <p className="text-wrap text-left text-sm text-slate-500">
                                        Se bara händelser i dina egna dataset
                                    </p>
                                </div>
                            </Button>
                        </div>
                    </AlertDialogContent>
                </AlertDialog>

                <ul className="flex w-full flex-col gap-4">
                    {eventsDisplay.map((event) => (
                        <Comment event={event} key={event.id} />
                    ))}
                </ul>
            </div>
        </>
    )
}
