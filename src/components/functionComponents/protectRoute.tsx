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
            case '/LogaIn':
                navigator('/')
                break
            case '/SkapaKonto':
                navigator('/')
                break
        }
    } else if (
        !pb.authStore.isValid &&
        pathname !== '/LogaIn' &&
        pathname !== '/SkapaKonto'
    ) {
        navigator('/SkapaKonto')
    }

    return <></>
}

export default ProtectRoute
