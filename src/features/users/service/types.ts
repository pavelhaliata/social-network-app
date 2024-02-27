export type FetchUsersResponseType = {
    items: UserType[]
    totalCount: number
    error: string
}

export type FetchUsersRequestType = {
    currentPage?: number
    pageSize?: number
    term?: string
    friends?: boolean
}

type UserType = {
    name: string
    id: number
    photos: {
        small: null
        large: null
    }
    status: null
    followed: boolean
}