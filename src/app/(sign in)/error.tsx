'use client'
import { ErrorRespond } from '@/components/error'

export default function Error({ reset }: { reset: () => void }) {
    return <ErrorRespond reset={reset} />
}
