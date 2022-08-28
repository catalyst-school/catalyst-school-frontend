import type { Goal } from '@/models/goal/Goal';

export interface CreateUserGoalDto {
    goal: Goal['_id'];
}
