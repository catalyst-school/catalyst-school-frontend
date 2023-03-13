export enum TopicSessionStatus {
    Pending = 'pending',
    Completed = 'completed',
}

export interface TopicSessionProgress {
    _id: string;
    unitId: string;
    status: TopicSessionStatus;
}
