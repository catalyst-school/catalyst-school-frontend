import type { Goal } from '../goal/Goal';

export interface UserGoal {
    _id: string;
    goal: Goal;
    currentTopic: string;
}
