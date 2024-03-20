import * as api from '@/adapters/api'
import { loadAuthorizedUser } from './api/auth/utils'

export default function Home() {
    const user = loadAuthorizedUser()
    // console.log('user', user)

    const run = async () => {
        const resDataset = await api.getAllDatasets()
        console.log('all datasets:', resDataset !== undefined)
        const resSingleDataset = await api.getDataset('Climate Change Impact')
        console.log('single dataset:', resSingleDataset !== undefined)
        const resDatasetFromUserEvent = await api.getDatasetFromUserEvent(
            user?.id as string
        )
        console.log('datasetFromUser:', resDatasetFromUserEvent !== undefined)
        const resEvent = await api.getEvent('wox79ra56il6u88') // swap out for a working id in your pb
        console.log('events:', resEvent !== undefined)
    }
    run()

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
    )
}
