import { EventSchema } from '@/types/zod'

export function datasetResponseCleanup(res: any) {
    const dataowner = res?.expand?.dataowner

    const cleanDataset = {
        ...res,
        relatedDatasets: res?.expand?.related_datasets ?? [],
        tags: res?.expand?.tag ?? [],
        dataowner: dataowner
            ? {
                  ...dataowner,
                  role: dataowner?.expand?.role.name,
              }
            : null,
    }
    return cleanDataset
}
export function eventResponseCleanup(res: any): EventSchema {
    const subject = res?.expand?.subject
    const user = res?.expand?.user
    return {
        ...res,
        user: user ? { ...user, role: user?.expand?.role.name } : null,
        subject: subject?.map((sub: any) => {
            return { ...sub, role: sub?.expand?.role.name }
        }),
        subjectRole: res?.expand?.subjectRole,
    }
}

export function feedEventResponseCleanup(res: any) {
    return {
        id: res?.id,
        userName: res?.expand?.user.name,
        subject: res?.subject,
        datasetTitle: res?.expand?.dataset.title,
        content: res?.content,
        created: res?.created,
        types: res?.types,
    }
}

export function feedResponseCleanup(res: any) {
    return {
        page: res?.page,
        perPage: res?.perPage,
        totalPages: res?.totalPages,
        totalItems: res?.totalItems,
        items: res.items?.map((item: any) => {
            return feedEventResponseCleanup(item)
        }),
    }
}
