import type { Topic } from '../topic/Topic';

export interface Goal {
    _id: string;
    title: string;
    topics?: Topic[];
}
