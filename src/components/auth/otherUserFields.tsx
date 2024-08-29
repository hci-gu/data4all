import { Input } from '@/components/ui/input'
import { Select, SelectTrigger, SelectValue } from '@/components/ui/select'
import { AuthorizedUserSchema, roleSchema } from '@/types/zod'
import { Label } from '../ui/label'

export default function OtherUserFields({
    user,
    roles,
}: {
    user: AuthorizedUserSchema
    roles: roleSchema[]
}) {
    const role = roles.find((r) => r.id === user.role)

    return (
        <section
            aria-labelledby="ProfileInformation"
            className="space-y-[10px]"
        >
            <h2 id="ProfileInformation" className="sr-only">
                Användas uppgifter
            </h2>
            <div className="space-y-[6px]">
                <Label>Mejl</Label>
                <Input placeholder={user.email} disabled />
            </div>
            <div className="space-y-[6px]">
                <Label>Arbetsroll</Label>
                <Select disabled>
                    <SelectTrigger>
                        <SelectValue placeholder={role?.name} />
                    </SelectTrigger>
                </Select>
            </div>
        </section>
    )
}
