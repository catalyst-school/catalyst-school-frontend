import type { Topic } from '@/models/topic/Topic';
import type { Goal } from '@/models/goal/Goal';

export interface Achievement {
    _id: string;
    title: string;
    img?: string;
    topics?: Topic[];
    goals?: Goal[];
}
