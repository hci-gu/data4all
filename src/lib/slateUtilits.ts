import { AuthorizedUserSchema } from '@/types/zod'

export function SuggestSelfAsDataOwner(auth: AuthorizedUserSchema) {
    return [
        {
            children: [
                { text: '' },
                {
                    children: [{ text: '' }],
                    mention: {
                        name: auth.name,
                        slug: auth.slug,
                        type: 'user',
                    },
                    type: 'mention',
                },
                { text: 'föreslog sig själv som dataägare' },
            ],
            type: 'paragraph',
        },
    ]
}
export function SuggestSomeOneElseAsDataOwner(
    auth: AuthorizedUserSchema,
    subject: AuthorizedUserSchema
) {
    return [
        {
            children: [
                { text: '' },
                {
                    children: [{ text: '' }],
                    mention: {
                        name: auth.name,
                        slug: auth.slug,
                        type: 'user',
                    },
                    type: 'mention',
                },
                { text: 'föreslog' },
                {
                    children: [{ text: '' }],
                    mention: {
                        name: subject.name,
                        slug: subject.slug,
                        type: 'user',
                    },
                    type: 'mention',
                },
                { text: 'som dataägare' },
            ],
            type: 'paragraph',
        },
    ]
}
export function ownerAcceptDataset(
    auth: AuthorizedUserSchema,
    subject: AuthorizedUserSchema
) {
    return [
        {
            children: [
                {
                    children: [{ text: '' }],
                    mention: {
                        name: auth.name,
                        slug: auth.slug,
                        type: 'user',
                    },
                    type: 'mention',
                },
                { text: 'godkände' },
                {
                    children: [{ text: '' }],
                    mention: {
                        name: subject.name,
                        slug: subject.slug,
                        type: 'user',
                    },
                    type: 'mention',
                },
                { text: 'som dataägare' },
            ],
            type: 'paragraph',
        },
    ]
}
export function ownerDeclineDataset(
    auth: AuthorizedUserSchema,
    subject: AuthorizedUserSchema
) {
    return [
        {
            children: [
                {
                    children: [{ text: '' }],
                    mention: {
                        name: auth.name,
                        slug: auth.slug,
                        type: 'user',
                    },
                    type: 'mention',
                },
                { text: 'godkände inte' },
                {
                    children: [{ text: '' }],
                    mention: {
                        name: subject.name,
                        slug: subject.slug,
                        type: 'user',
                    },
                    type: 'mention',
                },
                { text: 'som dataägare' },
            ],
            type: 'paragraph',
        },
    ]
}
