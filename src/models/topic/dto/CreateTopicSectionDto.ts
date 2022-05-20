import type { TopicSectionType } from '../TopicSection';

export interface CreateTopicSertionDto {
    type: TopicSectionType;
    tasks?: string[];
    theories?: string[];
}
