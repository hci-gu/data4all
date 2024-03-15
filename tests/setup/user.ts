import { siginUpSchema } from "@/types/zod";

export const user: siginUpSchema = {
    email: 'test.user@kungsbacka.se',
    password: '123456789',
    passwordConfirmation: '123456789',
    role: 'User',
}