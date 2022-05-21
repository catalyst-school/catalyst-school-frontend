import type { CreateTopicSertionDto } from './CreateTopicSectionDto';

export interface CreateTopicDto {
    title: string;
    sections: CreateTopicSertionDto[];
}
