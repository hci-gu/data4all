import { ChevronRight, CheckCircle } from 'lucide-react'
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from './ui/card'
import { datasetWithRelationsSchema } from '@/types/zod'
import Link from 'next/link'

export default function DatasetCard({
    dataset,
}: {
    dataset: datasetWithRelationsSchema
}) {
    return (
        <Card className="w-[560px] max-sm:w-full">
            <CardHeader>
                <Link
                    href={`/dataset/${dataset.slug}`}
                    className="flex h-fit w-full justify-between"
                >
                    <CardTitle>{dataset.title}</CardTitle>
                    <ChevronRight />
                </Link>
                <CardDescription className="mt-2 line-clamp-2">
                    {dataset.description}
                </CardDescription>
            </CardHeader>
            <CardFooter className="flex gap-1">
                <ul className="flex gap-1">
                    {dataset.tags.map((tag, index) => (
                        <li key={index}>
                            <Link
                                href={`/sok?tag=${tag.slug}`}
                                className="inline-block rounded-full bg-slate-500 px-2 py-1 text-xs text-white hover:bg-slate-600 focus-visible:bg-slate-600 focus-visible:outline-1 focus-visible:outline-offset-4"
                            >
                                {tag.name}
                            </Link>
                        </li>
                    ))}
                </ul>
                {dataset.published && (
                    <div className="flex items-center gap-1 rounded-md px-3 py-2 text-sm sm:w-fit">
                        <CheckCircle color="#22C55E" size={20} />
                        <span>Publicerad</span>
                    </div>
                )}
            </CardFooter>
        </Card>
    )
}
