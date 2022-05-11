export enum LearningUnitType {
    THEORY = 'theory',
    TASK = 'task',
}

export interface LearningUnit {
    id: string | number;
    type: LearningUnitType;
}
