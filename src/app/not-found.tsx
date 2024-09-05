'use client'
import NotFoundResponse from '@/components/error/notfoundResponse'

export default function Error({ reset }: { reset: () => void }) {
    return <NotFoundResponse />
}
