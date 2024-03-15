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

export type signInSchema = z.infer<typeof signInSchema>
export type siginUpSchema = z.infer<typeof siginUpSchema>
export type roleSchema = z.infer<typeof roleSchema>
export type updateUserSchema = z.infer<typeof updateUserSchema>
