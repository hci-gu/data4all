'use client'
import { getAllDatasets } from '@/adapters/api'

export default function Home() {
    const asd = async () => {
        const res = await getAllDatasets()
    }
    asd()

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
    )
}
