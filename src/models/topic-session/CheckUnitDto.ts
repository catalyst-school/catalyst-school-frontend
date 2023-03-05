import type { TopicSectionType } from '../topic/TopicSection';

export interface CheckUnitDto {
    answer?: string;
    unitId: string;
    sectionType: TopicSectionType;
}
