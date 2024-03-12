'use client'

import { pb } from '@/adapters/pocketbase'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'

const ProtectRoute = () => {
    // const pathname = usePathname()
    // const router = useRouter()

    // const navigator = (Url: string) => {
    //     router.push(Url)
    // }

    // if (pb.authStore.isValid) {
    //     switch (pathname) {
    //         case '/loga-in':
    //             navigator('/')
    //             break
    //         case '/skapa-konto':
    //             navigator('/')
    //             console.log('här här');
    //             break
    //     }
    // } else if (
    //     !pb.authStore.isValid &&
    //     pathname !== '/loga-in' &&
    //     pathname !== '/skapa-konto'
    // ) {
    //     navigator('/skapa-konto')
    // }
    console.log('is valid client side', pb.authStore.isValid)
    console.log('is valid client side', pb.authStore.token)

    return <></>
}

export default ProtectRoute
