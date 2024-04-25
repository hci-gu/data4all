'use client'
import { AuthorizedUserSchema } from '@/types/zod'
import { Dispatch, SetStateAction, createContext, useState } from 'react'

type AuthContextType = {
    auth: AuthorizedUserSchema | undefined
    setAuth: Dispatch<SetStateAction<AuthorizedUserSchema | undefined>>
    cookie: string | undefined
    setCookie: Dispatch<SetStateAction<string | undefined>>
}

export const authContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({
    children,
    user,
    authCookie,
}: {
    children: React.ReactNode
    user: AuthorizedUserSchema | undefined
    authCookie: string | undefined
}) => {
    const [auth, setAuth] = useState<AuthorizedUserSchema | undefined>(user)
    const [cookie, setCookie] = useState<string | undefined>(authCookie)

    return (
        <authContext.Provider value={{ auth, setAuth, cookie, setCookie }}>
            {children}
        </authContext.Provider>
    )
}
