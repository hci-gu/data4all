import { EventSchema } from '@/types/zod'
import { Avatar, AvatarFallback } from '../ui/avatar'
import moment from 'moment'
import Image from 'next/image'
import Dataportal from '../../../public/dataportal.png'
import Link from 'next/link'
import { getInitials } from '@/lib/utils'
import AcceptDatasetOwner from './acceptDatasetOwner'
import SlateComment from '../slate/slateComment'
import User from '../user'

export default function Comment({ event }: { event: EventSchema }) {
    if (event.types === 'comment') {
        return (
            <li className="flex flex-col">
                <User user={event.user} size="small" />
                <div className='ml-8'>
                    <SlateComment event={event} />
                    <time className="text-xs font-bold">
                        {moment(event.created).fromNow()}
                    </time>
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
                                src={Dataportal}
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
            <div className="flex flex-col gap-1">
                <div
                    className="text-xs"
                    dangerouslySetInnerHTML={{
                        __html: event.content,
                    }}
                />
                <AcceptDatasetOwner event={event} />
                <time className="text-xs font-bold">
                    {moment(event.created).fromNow()}
                </time>
            </div>
        </li>
    )
}
