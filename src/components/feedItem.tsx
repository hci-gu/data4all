import { EventSchema, datasetSchema } from '@/types/zod'
import { Avatar, AvatarFallback } from './ui/avatar'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import { getInitials } from '@/lib/utils'

export default function FeedItem({
    event,
    dataset,
}: {
    event: EventSchema
    dataset?: datasetSchema
}) {
    if (event.types === 'comment') {
        return (
            <li className="flex gap-1">
                <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-[0.5625rem]">
                        {getInitials(event.user.name)}
                    </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1">
                    <div className="flex flex-col items-start">
                        <p className="mt-1 text-xs">
                            <b>{event.user.name}</b> kommenterade i
                            <b> {dataset?.title}</b>
                        </p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="rounded-lg rounded-tl-none border border-slate-200 p-2">
                            <p className="text-xs">{event.content}</p>
                        </div>
                        <time className="text-xs font-bold">
                            {moment(event.created).fromNow()}
                        </time>
                    </div>
                </div>
            </li>
        )
    }

    if (event.types === 'OwnerPublished') {
        return (
            <li className="flex gap-2">
                <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-[0.5625rem]">
                        {getInitials(event.user.name)}
                    </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1">
                    <div className="flex flex-wrap items-center gap-1 text-xs">
                        <b>{event.user.name}</b> publicerade på
                        <div className="flex gap-1 rounded-sm border border-slate-200 p-1">
                            <Image
                                width={16}
                                src={'Dataportal.png'}
                                alt="Dataportal.se logo"
                            />
                            <Link className="text-cyan-700" href="/">
                                Dataportal.se
                            </Link>
                        </div>
                    </div>
                    <time className="text-xs font-bold">
                        {moment(event.created).fromNow()}
                    </time>
                </div>
            </li>
        )
    }

    return (
        <li className="flex gap-2">
            <Avatar className="h-6 w-6">
                <AvatarFallback className="text-[0.5625rem]">
                    {getInitials(event.user.name)}
                </AvatarFallback>
            </Avatar>
            <div className="mt-1 flex flex-col gap-1">
                <div
                    className="text-xs"
                    dangerouslySetInnerHTML={{
                        __html: `${event.content} i <b>${dataset?.title}</b>`,
                    }}
                />
                <time className="text-xs font-bold">
                    {moment(event.created).fromNow()}
                </time>
            </div>
        </li>
    )
}
