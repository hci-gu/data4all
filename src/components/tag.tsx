import { tagSchema } from '@/types/zod'
import Link from 'next/link'

export default function Tags({ Tags }: { Tags: tagSchema[] }) {
    return (
        <ul className="flex gap-1">
            {Tags.map((tag, index) => (
                <li key={index}>
                    <Link
                        href={`/sok?tag=${tag.name}`}
                        className="inline-block rounded-full bg-slate-500 px-2 py-1 text-xs text-white hover:bg-slate-600 focus-visible:bg-slate-600 focus-visible:outline-1 focus-visible:outline-offset-4"
                    >
                        {tag.name}
                    </Link>
                </li>
            ))}
        </ul>
    )
}
