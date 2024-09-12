'use client'

import { tagSchema } from '@/types/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function Tags({ Tags }: { Tags: tagSchema[] }) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const onTagClicked = (tag: string) => {
        const params = new URLSearchParams(searchParams.toString())

        if (params.has('tag')) {
            const tags = params.getAll('tag')

            if (tags.includes(tag)) {
                params.delete('tag')
            } else {
                tags.push(tag)
                params.set('tag', tags.join(','))
            }
        } else {
            params.set('tag', tag)
        }
        console.log(params.toString())
        router.push(`/sok?${params.toString()}`)
    }

    return (
        <ul className="flex gap-1">
            {Tags.map((tag, index) => (
                <li key={index}>
                    <button
                        onClick={() => onTagClicked(tag.slug)}
                        className="inline-block rounded-full bg-slate-500 px-2 py-1 text-xs text-white hover:bg-slate-600 focus-visible:bg-slate-600 focus-visible:outline-1 focus-visible:outline-offset-4"
                    >
                        {tag.name}
                    </button>
                </li>
            ))}
        </ul>
    )
}
