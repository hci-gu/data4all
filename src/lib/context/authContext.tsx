'use client'
import { AuthorizedUserSchema } from '@/types/zod'
import { Dispatch, SetStateAction, createContext, useState } from 'react'

type AuthContextType = {
    auth: AuthorizedUserSchema | undefined
    setAuth: Dispatch<SetStateAction<AuthorizedUserSchema | undefined>>
}

export const authContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({
    children,
    user,
}: {
    children: React.ReactNode
    user: AuthorizedUserSchema | undefined
}) => {
    const [auth, setAuth] = useState<AuthorizedUserSchema | undefined>(user)

    return (
        <authContext.Provider value={{ auth, setAuth }}>
            {children}
        </authContext.Provider>
    )
}
