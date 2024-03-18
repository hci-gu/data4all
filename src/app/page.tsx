import { getAllDatasets, getDataset } from '@/adapters/api'

export default function Home() {
    const asd = async () => {
        const res = await getDataset('Climate Change Impact')
    }
    asd()

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
    )
}
