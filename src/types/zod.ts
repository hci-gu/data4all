import { z } from 'zod'

export const roleSchema = z.enum(['User', 'Admin'])

export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
})

export const siginUpSchema = signInSchema
    .extend({
        passwordConfirmation: z.string().min(8),
        role: roleSchema,
    })
    .refine((data) => data.password === data.passwordConfirmation, {
        message: 'Lösenorden måste matcha',
        path: ['passwordConfirmation'],
    })

export type signInSchema = z.infer<typeof signInSchema>
export type siginUpSchema = z.infer<typeof siginUpSchema>
export type roleSchema = z.infer<typeof roleSchema>
