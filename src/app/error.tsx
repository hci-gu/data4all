'use client'
import ErrorResponse from '@/components/error/errorResponse'

export default function Error({ reset }: { reset: () => void }) {
    return <ErrorResponse reset={reset} />
}
