import type { UpdateTopicSectionDto } from './UpdateTopicSectionDto';

export interface UpdateTopicDto {
    title?: string;
    sections?: UpdateTopicSectionDto[];
}
