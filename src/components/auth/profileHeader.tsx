"use client"
import { authContext } from "@/lib/context/authContext"
import { getUserFromURL } from "@/lib/utils"
import { useContext } from "react"

export default function ProfileHeader() {
    const userContext = useContext(authContext)
    const user = userContext.auth
    const userURL = getUserFromURL()

    if (userURL && user.name.toUpperCase() !== userURL.toUpperCase()) return <h1 className="text-5xl font-extrabold">{userURL}</h1>

    return <h1 className="text-5xl font-extrabold">Profil</h1>
}