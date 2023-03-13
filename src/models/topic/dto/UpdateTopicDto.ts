import type { CreateUnitDto } from '@/models/topic/dto/CreateTopicDto';

export interface UpdateUnitDto extends Partial<CreateUnitDto> {
    _id?: string;
}

export interface UpdateTopicDto {
    title?: string;
    units?: UpdateUnitDto[];
}
