export interface Task {
    id: string
    title: string
    description: string
    status: TaskStatus
}

export enum TaskStatus {
    CREATED = 'CREATED',
    IN_PROGRES = 'IN_PROGRES',
    DONE = 'DONE'
}