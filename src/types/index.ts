import { User } from '@prisma/client'

export enum StatusType {
    SUCCESS = 'success',
    ERROR = 'error'
}

export type Message = {
    status: StatusType,
    message: string,
    data?: User[]
}
