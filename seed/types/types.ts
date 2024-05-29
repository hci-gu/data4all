import { EventSchema, AuthorizedUserSchema, datasetSchema, roleSchema, tagSchema } from "@/types/zod"

export interface SeedData {
    tags: tagSchema[]
    datasets: datasetSchema[]
    users: AuthorizedUserSchema[]
    events: EventSchema[]
    roles: roleSchema[]
}


