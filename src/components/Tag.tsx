import Link from "next/link";
type Tag = { id: number, href: string, title: string }

export default function Tags({ Tags }: { Tags: Tag[] }) {
    return (
        <div className="flex gap-2">
            {Tags.map((tag) => (
                <Link key={tag.id} href={tag.href} className="bg-slate-500 text-white py-2 px-4 rounded-full hover:bg-slate-600 focus-visible:bg-slate-600 focus-visible:outline-1 focus-visible:outline-offset-4">{tag.title}</Link>
            ))}
        </div>
    )
}