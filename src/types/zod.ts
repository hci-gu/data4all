import { z } from 'zod'

export const roleSchema = z.enum(['User', 'Admin'])

export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
})

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
        name: z.string().min(1, 'name is required'),
        email: z.string().min(1, 'email is required').email('invalid email'),
        oldPassword: z.string(),
        password: z.string(),
        passwordConfirm: z.string(),
        role: z.string(),
    })
    .refine((data) => data.password === data.passwordConfirm, {
        path: ['passwordConfirm'],
        message: 'Passwords does not match',
    })
export const datasetSchema = z.object({
    id: z.string(),
    description: z.string(),
    title: z.string(),
    related_datasets: z.array(z.string()),
    tag: z.array(z.string()),
})

export const tagSchema = z.object({
    collectionId: z.string(),
    collectionName: z.string(),
    created: z.string(),
    id: z.string(),
    name: z.string(),
    updated: z.string(),
})

export const datasetAPISchema = z.object({
    records: z.array(
        datasetSchema.extend({
            expand: z.object({
                related_datasets: z.array(datasetSchema).optional(),
                tag: z.array(tagSchema).optional(),
            }),
        })
    ),
})

export type UserSchema = {
    id: number
    name: string
    role: roleSchema
}

export type signInSchema = z.infer<typeof signInSchema>
export type signUpSchema = z.infer<typeof signUpSchema>
export type roleSchema = z.infer<typeof roleSchema>
export type updateUserSchema = z.infer<typeof updateUserSchema>
export type datasetSchema = z.infer<typeof datasetSchema>
