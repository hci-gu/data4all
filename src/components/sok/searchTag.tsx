'use client'

import { Cross1Icon } from '@radix-ui/react-icons'

export default function SearchTag({ title }: { title: string }) {
    return (
        <div
            className="inline-block flex w-fit gap-2 rounded-full bg-slate-500 px-2 py-1 text-xs text-white hover:bg-slate-600 focus-visible:bg-slate-600 focus-visible:outline-1 focus-visible:outline-offset-4"
            onClick={() => {
                // remove tag= from url
                window.location.href = window.location.href.replace(
                    /&?tag=[^&]+/,
                    ''
                )
            }}
        >
            <Cross1Icon />
            {title}
        </div>
    )
}
