import { string, z } from 'zod'

export const eventTypeSchema = z.enum([
    'comment',
    'ownerReq',
    'ownerAccept',
    'ownerDecline',
    'OwnerPublished',
])

export const collectionNameSchema = z.enum(['users', 'dataset', 'events', 'roles', 'tag'])

export const roleSchema = z.object({
    collectionId: z.string(),
    collectionName: z.string(),
    created: z.string(),
    id: z.string(),
    name: z.string(),
    updated: z.string(),
})
export const AuthorizedUserSchema = z.object({
    avatar: z.string().optional(),
    collectionId: z.string(),
    collectionName: z.string(),
    created: z.string(),
    email: z.string().min(1, 'email is required').email('invalid email'),
    emailVisibility: z.boolean(),
    id: z.string(),
    name: z.string().min(1, 'name is required'),
    role: roleSchema.shape.name,
    updated: z.string(),
    username: z.string(),
    verified: z.boolean(),
    slug: z.string(),
    expand: z.any(),
})
export const UserSchema = AuthorizedUserSchema.omit({
    email: true,
})

export const signInSchema = z
    .object({
        password: z.string().min(8),
    })
    .merge(AuthorizedUserSchema.pick({ email: true }))

export const signUpSchema = signInSchema
    .extend({
        passwordConfirmation: z.string().min(8),
        role: z.string(),
        slug: z.string(),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
        message: 'Lösenorden måste matcha',
        path: ['passwordConfirmation'],
    })

export const updateUserSchema = z
    .object({
        oldPassword: z.string(),
        password: z.string(),
        passwordConfirm: z.string(),
    })
    .merge(
        AuthorizedUserSchema.pick({
            email: true,
            role: true,
            name: true,
            slug: true,
        })
    )
    .refine((data) => data.password === data.passwordConfirm, {
        path: ['passwordConfirm'],
        message: 'Lösenorden måste matcha',
    })
export const updateFrendUserSchema = AuthorizedUserSchema.pick({
    email: true,
    role: true,
})

export const tagSchema = z.object({
    id: z.string(),
    name: z.string(),
})

export const datasetSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    slug: z.string(),
    dataowner: string().optional(),
})

export const datasetWithRelationsSchema = datasetSchema.extend({
    relatedDatasets: z.array(datasetSchema),
    dataowner: AuthorizedUserSchema.optional(),
    tags: z.array(tagSchema),
})

export const EventSchema = z.object({
    id: z.string().optional(),
    collectionId: z.string().optional(),
    collectionName: z.string().optional(),
    created: z.string().optional(),
    updated: z.string().optional(),
    dataset: z.string(),
    types: eventTypeSchema,
    user: AuthorizedUserSchema,
    content: z.string(),
    subject: z.array(AuthorizedUserSchema).optional(),
})

export const EventCreateSchema = EventSchema.extend({
    user: z.string(),
})

export const EventFeedItem = z.object({
    id: z.string(),
    userName: z.string(),
    subject: z.array(z.string()),
    datasetTitle: z.string(),
    content: z.any(),
    created: z.string(),
    types: z.string(),
})

export const EventFeedResponse = z.object({
    page: z.number(),
    perPage: z.number(),
    totalPages: z.number(),
    totalItems: z.number(),
    items: z.array(EventFeedItem),
})

export type signInSchema = z.infer<typeof signInSchema>
export type signUpSchema = z.infer<typeof signUpSchema>
export type updateUserSchema = z.infer<typeof updateUserSchema>
export type updateFrendUserSchema = z.infer<typeof updateFrendUserSchema>
export type datasetSchema = z.infer<typeof datasetSchema>
export type datasetWithRelationsSchema = z.infer<
    typeof datasetWithRelationsSchema
>
export type roleSchema = z.infer<typeof roleSchema>
export type AuthorizedUserSchema = z.infer<typeof AuthorizedUserSchema>
export type UserSchema = z.infer<typeof UserSchema>
export type eventTypeSchema = z.infer<typeof eventTypeSchema>
export type collectionNameSchema = z.infer<typeof collectionNameSchema>
export type EventSchema = z.infer<typeof EventSchema>
export type EventCreateSchema = z.infer<typeof EventCreateSchema>
export type tagSchema = z.infer<typeof tagSchema>
export type EventFeedItem = z.infer<typeof EventFeedItem>
export type EventFeedResponse = z.infer<typeof EventFeedResponse>
