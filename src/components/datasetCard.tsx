import { ChevronRight } from 'lucide-react'
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from './ui/card'
import { datasetSchema } from '@/types/zod'
import Link from 'next/link'
import Tags from './tag'

export default function DatasetCard({ dataset }: { dataset: datasetSchema }) {
    return (
        <Card className="w-[560px]">
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
                    {/* Um coment when tags have been added to the seeding script */}
                    {/* <Tags Tags={dataset.tag} /> */}
                    <div className="flex gap-3">
                        <p>last updated</p>
                        <p>is public?</p>
                    </div>
                </CardFooter>
            </Link>
        </Card>
    )
}
