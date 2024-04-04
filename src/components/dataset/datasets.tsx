import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { datasetSchema } from '@/types/zod'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default function Datasets({ datasets }: { datasets: datasetSchema[] }) {
    if (datasets.length === 0) {
        return <p>Det finns inga relaterade dataset</p>
    }

    return (
        <div className="flex flex-wrap gap-4">
            {datasets.map((dataset, index) => (
                <Card key={index} className="w-[276px]">
                    <Link href={`/dataset/${dataset.slug}`}>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-sm">
                                {dataset.title}
                            </CardTitle>
                            <ChevronRight />
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-500-500 line-clamp-3 text-xs">
                                {dataset.description}
                            </p>
                        </CardContent>
                    </Link>
                </Card>
            ))}
        </div>
    )
}
