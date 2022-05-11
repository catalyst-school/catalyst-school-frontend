import type { LearningUnit } from './LearningUnit';

export enum ThemeSectionType {
    THEORY = 'theory',
    TRAINING = 'training',
    TEST = 'test',
}

export interface ThemeSection {
    id: string | number;
    type: ThemeSectionType;
    units: LearningUnit[];
}
