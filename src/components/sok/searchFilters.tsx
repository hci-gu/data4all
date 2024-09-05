'use client'

import React, { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Checkbox } from '@/components/ui/checkbox'

function DatasetPublishedCheckbox() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const filter = searchParams.get('filter')
    const filterSetToPublished = filter?.includes('published!=""')

    const [checked, setChecked] = React.useState(filterSetToPublished)

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString())

        if (checked) {
            if (!filter?.includes('published!=""')) {
                params.set('filter', `${filter} && published!=""`)
            }
        } else {
            params.set('filter', filter?.replace(' && published!=""', '') ?? '')
        }

        router.replace(`/sok?${params.toString()}`)
    }, [checked])

    return (
        <div className="items-top flex space-x-2">
            <Checkbox
                id="terms1"
                checked={checked}
                onCheckedChange={(value) => setChecked(!!value)}
            />
            <div className="grid gap-1.5 leading-none">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Publicerat
                </label>
            </div>
        </div>
    )
}

function DatasetDataOwnerCheckbox() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const filter = searchParams.get('filter')
    const filterSetToPublished = filter?.includes('dataowner!=""')

    const [checked, setChecked] = React.useState(filterSetToPublished)

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString())

        if (checked) {
            if (!filter?.includes('dataowner!=""')) {
                params.set('filter', `${filter} && dataowner!=""`)
            }
        } else {
            params.set('filter', filter?.replace('&& dataowner!=""', '') ?? '')
        }

        router.replace(`/sok?${params.toString()}`)
    }, [checked])

    return (
        <div className="items-top flex space-x-2">
            <Checkbox
                id="terms1"
                checked={checked}
                onCheckedChange={(value) => setChecked(!!value)}
            />
            <div className="grid gap-1.5 leading-none">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Har ägare/förvaltare
                </label>
            </div>
        </div>
    )
}

function UserDataOwnerCheckbox() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const isDataOwner = searchParams.get('isDataOwner')

    const [checked, setChecked] = React.useState(isDataOwner == 'true')

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString())

        if (checked) {
            params.set('isDataOwner', 'true')
        } else {
            params.delete('isDataOwner')
        }

        router.replace(`/sok?${params.toString()}`)
    }, [checked])

    return (
        <div className="items-top flex space-x-2">
            <Checkbox
                id="terms1"
                checked={checked}
                onCheckedChange={(value) => setChecked(!!value)}
            />
            <div className="grid gap-1.5 leading-none">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Är dataägare/förvaltare
                </label>
            </div>
        </div>
    )
}

export default function SearchFilters() {
    const searchParams = useSearchParams()
    const activeTab = searchParams.get('type') ?? 'all'

    return (
        <div className="mt-2 flex gap-2">
            {activeTab == 'datasets' && <DatasetPublishedCheckbox />}
            {activeTab == 'datasets' && <DatasetDataOwnerCheckbox />}
            {activeTab == 'users' && <UserDataOwnerCheckbox />}
        </div>
    )
}
