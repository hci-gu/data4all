import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
    server: {},
    client: {
        NEXT_PUBLIC_POCKETBASE: z.string().url(),
        NEXT_PUBLIC_API: z.string().url(),
    },
    runtimeEnv: {
        NEXT_PUBLIC_POCKETBASE: process.env.NEXT_PUBLIC_POCKETBASE,
        NEXT_PUBLIC_API: process.env.NEXT_PUBLIC_API,
    },
})
