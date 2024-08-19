'use client'
import { ErrorResponse } from '@/components/error'

export default function Error({ reset }: { reset: () => void }) {
    return <ErrorResponse reset={reset} />
}
