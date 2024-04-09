import { ChevronRight } from 'lucide-react'
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
            <Link href={`/dataset/${dataset.slug}`}>
                <CardHeader>
                    <div className="flex h-fit w-full justify-between">
                        <CardTitle>{dataset.title}</CardTitle>
                        <ChevronRight />
                    </div>
                    <CardDescription className="line-clamp-2">
                        {dataset.description}
                    </CardDescription>
                </CardHeader>
                <CardFooter className="flex gap-3">
                    <div className="flex gap-1">
                        <p>tags</p>
                    </div>
                    <div className="flex gap-3">
                        <p>last updated</p>
                        <p>is public?</p>
                    </div>
                </CardFooter>
            </Link>
        <Card className="w-[560px]">
            <CardHeader>
                <Link
                    href={`/dataset/${dataset.slug}`}
                    className="flex h-fit w-full justify-between"
                >
                    <CardTitle>{dataset.title}</CardTitle>
                    <ChevronRight />
                </Link>
                <CardDescription className="line-clamp-2">
                    {dataset.description}
                </CardDescription>
            </CardHeader>
            <CardFooter className="flex gap-3">
                <Tags Tags={dataset.tags} />
                <div className="flex gap-3">
                    {/* add last updated & is public later when relevant */}
                </div>
            </CardFooter>
        </Card>
    )
}
