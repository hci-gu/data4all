import { Input } from '@/components/ui/input'
import { Select, SelectTrigger, SelectValue } from '@/components/ui/select'
import { AuthorizedUserSchema } from '@/types/zod'
import { Label } from '../ui/label'

export default function OtherUserFields({
    user,
}: {
    user: AuthorizedUserSchema
}) {
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
                <Input placeholder={user.email} />
            </div>
            <div className="space-y-[6px]">
                <Label>Arbetsroll</Label>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder={user.role} />
                    </SelectTrigger>
                </Select>
            </div>
        </section>
    )
}
