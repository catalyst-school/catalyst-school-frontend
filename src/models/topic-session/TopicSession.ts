import type { TopicSessionProgress } from '@/models/topic-session/TopicSessionProgress';

export interface TopicSession {
    _id: string;
    topic: string;
    user: string;
    progress: TopicSessionProgress;
    userGoal: string;
}
