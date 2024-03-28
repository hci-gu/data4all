import { datasetSchema } from '@/types/zod'
import Typography from './ui/Typography'
import DatasetCard from './datasetCard'

export default function SearchResults({ records }: { records?: any }) {
    return (
        <>
            <div className="mt-8 grid w-full max-w-[1220px] grid-cols-2 gap-8 ">
                <div className="flex flex-col gap-[10px]">
                    <div className="flex flex-col">
                        <Typography level="H3">Dataset</Typography>
                        <p>resultat</p>
                    </div>
                    {records > 0 ? (
                        records.map((dataset: datasetSchema) => {
                            return (
                                <DatasetCard
                                    key={dataset.id}
                                    dataset={dataset}
                                />
                            )
                        })
                    ) : (
                        <p>Hittade inga resultat</p>
                    )}
                </div>
                <div className="flex flex-col gap-[10px]">
                    <div className="flex flex-col">
                        <Typography level="H3">Personer</Typography>
                        <p>resultat</p>
                    </div>
                </div>
            </div>
        </>
    )
}
