import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { stringWithHyphen } from '@/lib/utils'
import { datasetSchema } from '@/types/zod'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default function Datasets({ datasets }: { datasets: datasetSchema[] }) {
    return (
        <div className="flex flex-wrap gap-4">
            {datasets.map((dataset, index) => (
                <Card key={index} className="w-[276px]">
                    <Link href={`/dataset/${stringWithHyphen(dataset.title)}`}>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-sm">
                                {dataset.title}
                            </CardTitle>
                            <ChevronRight />
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-500-500 text-xs line-clamp-3">
                                {dataset.description}
                            </p>
                        </CardContent>
                    </Link>
                </Card>
            ))}
        </div>
    )
}
