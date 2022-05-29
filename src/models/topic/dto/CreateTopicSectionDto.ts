import type { Task } from '@/models/task/Task';
import type { TopicSectionType } from '../TopicSection';

export interface CreateTopicSertionDto {
    type: TopicSectionType;
    tasks?: Task[];
    theories?: string[];
}
