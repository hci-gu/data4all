import * as api from '@/adapters/api'
import { loadAuthorizedUser } from './api/auth/utils'
import { EventAPISchema } from '@/types/zod'

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

        const resEvent = EventAPISchema.safeParse(await api.getEvent('qg80nv4p4728w0j')) // swap out for a working id in your pb

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
