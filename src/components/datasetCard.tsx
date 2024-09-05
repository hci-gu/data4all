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
import Tags from './tag'

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
                <Tags Tags={dataset.tags} />

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
