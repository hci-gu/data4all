import { datasetSchema, datasetWithRelationsSchema } from '@/types/zod'
import Typography from './ui/Typography'
import DatasetCard from './datasetCard'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Settings, Settings2 } from 'lucide-react'

export default function SearchResults({
    records,
}: {
    records: datasetWithRelationsSchema[]
}) {
    return (
        <>
            <div className="mt-8 grid w-full max-w-[1220px] grid-cols-2 gap-8 max-sm:flex max-sm:flex-col">
                <div className="flex flex-col gap-[10px] max-sm:hidden">
                    <div className="flex flex-col">
                        <Typography level="H3">Dataset</Typography>
                        <p>resultat</p>
                    </div>
                    {records.length > 0 ? (
                        <ul className='flex flex-col gap-[10px]'>
                            {records.map((dataset) => {
                                return (
                                    <li key={dataset.id}>
                                        <DatasetCard dataset={dataset} />
                                    </li>
                                )
                            })}
                        </ul>
                    ) : (
                        <p>Hittade inga resultat</p>
                    )}
                </div>
                <div className="flex flex-col gap-[10px] max-sm:hidden">
                    <div className="flex flex-col">
                        <Typography level="H3">Personer</Typography>
                        <p>resultat</p>
                    </div>
                </div>
                <Tabs
                    defaultValue="dataset"
                    className="mt-10 flex w-full flex-col items-center px-4 sm:hidden"
                >
                    <TabsList className="w-full">
                        <div className="flex w-full items-center pr-1">
                            <TabsTrigger className="w-[50%]" value="dataset">
                                Dataset
                            </TabsTrigger>
                            <TabsTrigger className="w-[50%]" value="personer">
                                personer
                            </TabsTrigger>
                            <Settings2 className="pl-1" />
                        </div>
                    </TabsList>
                    <TabsContent value="dataset">
                        <ul className="flex flex-col gap-[10px]">
                            {records.length > 0 ? (
                                records.map((dataset) => {
                                    return (
                                        <li key={dataset.id}>
                                            <DatasetCard dataset={dataset} />
                                        </li>
                                    )
                                })
                            ) : (
                                <p>Hittade inga resultat</p>
                            )}
                        </ul>
                    </TabsContent>
                    <TabsContent value="personer">
                        <div className="flex flex-col gap-[10px]">Personer</div>
                    </TabsContent>
                </Tabs>
            </div>
        </>
    )
}
