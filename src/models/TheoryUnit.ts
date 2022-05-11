import type { LearningUnit } from './LearningUnit';

export interface TheoryUnit extends LearningUnit {
    title?: string;
    content: string;
}
