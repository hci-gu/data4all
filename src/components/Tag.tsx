import Link from "next/link";
type Tag = { id: number, href: string, title: string }

export default function Tags({ Tags }: { Tags: Tag[] }) {
    return (
        <ul className="flex gap-1">
            {Tags.map((tag) => (
                <li>
                    <Link key={tag.id} href={tag.href} className="inline-block text-xs bg-slate-500 text-white py-1 px-2 rounded-full hover:bg-slate-600 focus-visible:bg-slate-600 focus-visible:outline-1 focus-visible:outline-offset-4">{tag.title}</Link>
                </li>
            ))}
        </ul>
    )
}