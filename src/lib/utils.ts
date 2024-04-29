import { EventSchema, tagSchema } from '@/types/zod'
import { type ClassValue, clsx } from 'clsx'
import { usePathname } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const getInitials = (name: string) => {
    const parts = name.split(' ')
    let initials = ''
    for (let i = 0; i < parts.length; i++) {
        if (parts[i].length > 0 && parts[i] !== '') {
            initials += parts[i][0]
        }
    }
    return initials
}

export const stringWithHyphen = (text: string) => {
    return text.toLowerCase().replaceAll(' ', '-')
}

export const createTag = (tags: tagSchema[]) => {
    return tags.map((tag) => ({
        title: tag.name,
        href: `/tag/${tag.name}`,
    }))
}

export const getEventWithUserAccepted = (
    user: EventSchema[]
): EventSchema | null => {
    const allAccepted = user.filter((event) => event.types === 'ownerAccept')
    const lastAcceptedIndex = allAccepted.length - 1

    return allAccepted[lastAcceptedIndex]
}

export const getUserFromURL = () => {
    const user = decodeURI(usePathname().split('/').pop() ?? '').replaceAll(
        '-',
        ' '
    )
    return user ? user : null
}
