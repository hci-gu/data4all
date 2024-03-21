import { z } from 'zod'

export const roleSchema = z.enum(['User', 'Admin'])
export const AuthorizedUserSchema = z.object({
    avatar: z.string(),
    collectionId: z.string(),
    collectionName: z.string(),
    created: z.string(),
    email: z.string().min(1, 'email is required').email('invalid email'),
    emailVisibility: z.boolean(),
    id: z.string(),
    name: z.string().min(1, 'name is required'),
    role: roleSchema,
    updated: z.string(),
    username: z.string(),
    verified: z.boolean(),
})
export const signInSchema = z
    .object({
        password: z.string().min(8),
    })
    .merge(AuthorizedUserSchema.pick({ email: true }))

export const signUpSchema = signInSchema
    .extend({
        passwordConfirmation: z.string().min(8),
        role: roleSchema,
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
    .merge(AuthorizedUserSchema.pick({ email: true, role: true, name: true }))
    .refine((data) => data.password === data.passwordConfirm, {
        path: ['passwordConfirm'],
        message: 'Passwords does not match',
    })

export const datasetsSchema = z.object({
    records: z.array(
        z.object({
            id: z.string(),
            description: z.string(),
            title: z.string(),
        })
    ),
})
export const datasetSchema = z.object({
    records: z.object({
        id: z.string(),
        description: z.string(),
        title: z.string(),
    }),
})

export type UserSchema = Pick<AuthorizedUserSchema, 'name' | 'role'>

export type signInSchema = z.infer<typeof signInSchema>
export type signUpSchema = z.infer<typeof signUpSchema>
export type roleSchema = z.infer<typeof roleSchema>
export type updateUserSchema = z.infer<typeof updateUserSchema>
export type datasetSchema = z.infer<typeof datasetSchema>
export type AuthorizedUserSchema = z.infer<typeof AuthorizedUserSchema>
