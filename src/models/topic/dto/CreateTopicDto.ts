import type { UnitType } from '@/models/topic/Unit';

export interface CreateUnitDto {
    ref: string;
    type: UnitType;
}

export interface CreateTopicDto {
    title: string;
    units?: CreateUnitDto[];
}
