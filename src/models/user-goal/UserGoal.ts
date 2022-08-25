import type { Goal } from '../goal/Goal';
import type { TopicSession } from '../topic-session/TopicSession';

export interface UserGoal {
    _id: string;
    goal: Goal;
    currentSession: TopicSession;
}
