'use client'

import { useEffect, useState } from 'react'
import SearchBar from './components/searchBar'

export default function SearchBox() {
    const [datasets, setDatasets] = useState({ items: [] })

    const onFormSubmit = (datasets: any[]) => {
        //@ts-ignore
        setDatasets(datasets)
    }

    useEffect(() => {
        console.log(datasets)
    }, [datasets])

    return (
        <>
            <div>
                <SearchBar onFormSubmit={onFormSubmit} />
                {datasets.items.length > 0 &&
                    //@ts-ignore
                    datasets.items.map((dataset) => {
                        //@ts-ignore
                        return <p>{dataset?.title}</p>
                    })}
            </div>
        </>
    )
}
