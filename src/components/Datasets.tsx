import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import Typography from './ui/Typography'

type DatasetsProps = {
    title: string
    description: string
    href: string
}

export default function Datasets({ datasets }: { datasets: DatasetsProps[] }) {
    return (
        <div className="flex flex-wrap gap-4">
            {datasets.map((dataset, index) => (
                <Card key={index} className="w-[276px]">
                    <Link href={dataset.href}>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-sm">
                                {dataset.title}
                            </CardTitle>
                            <ChevronRight />
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-500-500 text-xs">
                                {dataset.description}
                            </p>
                        </CardContent>
                    </Link>
                </Card>
            ))}
        </div>
    )
}
