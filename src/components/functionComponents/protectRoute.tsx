'use client'

import { pb } from '@/adapters/pocketbase'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'

const ProtectRoute = () => {
    const pathname = usePathname()
    const router = useRouter()

    const navigator = (Url: string) => {
        router.push(Url)
    }

    if (pb.authStore.isValid) {
        switch (pathname) {
            case '/loga-in':
                navigator('/')
                break
            case '/skapa-konto':
                navigator('/')
                break
        }
    } else if (
        !pb.authStore.isValid &&
        pathname !== '/loga-in' &&
        pathname !== '/skapa-konto'
    ) {
        navigator('/skapa-konto')
    }

    return <></>
}

export default ProtectRoute
