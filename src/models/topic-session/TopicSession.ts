export enum TopicSessionStatus {
    New = 'new',
    Pending = 'pending',
    Completed = 'completed',
}

export interface TopicSession {
    _id: string;
    topic: string;
    user: string;
    status: TopicSessionStatus;
    tasks: string[];
    userGoal: string;
}
