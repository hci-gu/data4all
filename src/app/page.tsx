import * as api from '@/adapters/api'
import { loadAuthorizedUser } from './api/auth/utils'
import { EventSchema } from '@/types/zod'

export default function Home() {
    const user = loadAuthorizedUser()
    
    const run = async () => {
        const resDataset = await api.getAllDatasets()
        const resSingleDataset = await api.getDataset(
            'Financial Fraud Detection Dataset'
        )

        if (user) {            
            const resDatasetFromUserEvent = await api.getDatasetFromUserEvent(
                user.id
            )
        }

        const resEvent = EventSchema.safeParse(await api.getEvent('mxwzv2ngw1yuhca')) // swap out for a working id in your pb

        if (!resEvent.success) {
            console.error('resEvent.error', resEvent.error)
            return
        }
    }
    run()

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
    )
}
