import { type ClassValue, clsx } from 'clsx'
import { redirect } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}
export async function navigate(URL: string) {
    redirect(URL)
}
