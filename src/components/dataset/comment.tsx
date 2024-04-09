import { EventSchema } from '@/types/zod'
import { Avatar, AvatarFallback } from '../ui/avatar'
import moment from 'moment'
import User from '../user'

export default function Comment({ event }: { event: EventSchema }) {
    if (event.types === 'ownerReq') {
        return (
            <li className="flex gap-2">
                <Avatar>
                    <AvatarFallback>e</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1">
                    <div
                        className="text-xs"
                        dangerouslySetInnerHTML={{
                            __html: event.content,
                        }}
                    />
                    <time className="text-xs font-bold">
                        {moment(event.created).fromNow()}
                    </time>
                </div>
            </li>
        )
    }
    return (
        <li className="flex flex-col gap-1">
            <User user={{ name: 'Josef Forkman', role: 'User' }} size='small' />
            <div className="ml-14 flex flex-col gap-1">
                <div className='border border-slate-200 p-2 rounded-lg rounded-tl-none'>
                    <p className="text-xs">{event.content}</p>
                </div>
                <time className="text-xs font-bold">
                    {moment(event.created).fromNow()}
                </time>
            </div>
        </li>
    )
}
