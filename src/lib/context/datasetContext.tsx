'use client'
import { datasetWithRelationsSchema } from '@/types/zod'
import { Dispatch, SetStateAction, createContext, useState } from 'react'

type contextSchema = {
    dataset: datasetWithRelationsSchema
    setDataset: Dispatch<SetStateAction<datasetWithRelationsSchema>>
}

export const DatasetContext = createContext<contextSchema>({
    dataset: {} as datasetWithRelationsSchema,
    setDataset: () => {},
})

export const DatasetProvider = ({
    children,
    datasets,
}: {
    children: React.ReactNode
    datasets: datasetWithRelationsSchema
}) => {
    const [dataset, setEvents] = useState<datasetWithRelationsSchema>(
        datasets
    )
    return (
        <DatasetContext.Provider value={{ dataset, setDataset: setEvents }}>
            {children}
        </DatasetContext.Provider>
    )
}
