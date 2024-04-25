'use client'
import { AuthorizedUserSchema } from '@/types/zod'
import { Dispatch, SetStateAction, createContext, useState } from 'react'

type AuthContextType = {
    auth: AuthorizedUserSchema
    setAuth: Dispatch<SetStateAction<AuthorizedUserSchema>>
    cookie: string
    setCookie: Dispatch<SetStateAction<string>>
}

export const authContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({
    children,
    user,
    authCookie,
}: {
    children: React.ReactNode
    user: AuthorizedUserSchema
    authCookie: string
}) => {
    const [auth, setAuth] = useState<AuthorizedUserSchema>(user)
    const [cookie, setCookie] = useState<string>(authCookie)

    return (
        <authContext.Provider value={{ auth, setAuth, cookie, setCookie }}>
            {children}
        </authContext.Provider>
    )
}
