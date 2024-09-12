'use client'

import { Cross1Icon } from '@radix-ui/react-icons'
import { useSearchParams, useRouter } from 'next/navigation'

export default function SearchTag({ title }: { title: string }) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const tags = title.split(',').filter((tag) => tag)

    return (
        <div className="flex gap-2">
            {tags.map((tag, index) => (
                <div
                    className="inline-block flex w-fit gap-2 rounded-full bg-slate-500 px-2 py-1 text-xs text-white hover:bg-slate-600 focus-visible:bg-slate-600 focus-visible:outline-1 focus-visible:outline-offset-4"
                    onClick={() => {
                        const params = new URLSearchParams(
                            searchParams.toString()
                        )

                        if (params.has('tag')) {
                            const updatedTags = tags.filter((t) => t !== tag)
                            console.log(
                                'updatedTags',
                                updatedTags,
                                updatedTags.join(',')
                            )
                            params.set('tag', updatedTags.join(','))
                            router.push(`/sok?${params.toString()}`)
                        }
                    }}
                >
                    <Cross1Icon />
                    {tag}
                </div>
            ))}
        </div>
    )
}
