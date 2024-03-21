import Link from 'next/link'
type Tag = {
    id: number
    href: string
    title: string
}

export default function Tags({ Tags }: { Tags: Tag[] }) {
    return (
        <ul className="flex gap-1">
            {Tags.map((tag, index) => (
                <li>
                    <Link
                        key={index}
                        href={tag.href}
                        className="inline-block rounded-full bg-slate-500 px-2 py-1 text-xs text-white hover:bg-slate-600 focus-visible:bg-slate-600 focus-visible:outline-1 focus-visible:outline-offset-4"
                    >
                        {tag.title}
                    </Link>
                </li>
            ))}
        </ul>
    )
}
