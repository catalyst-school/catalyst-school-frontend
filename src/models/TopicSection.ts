import type { Task } from './Task';
import type { Theory } from './Theory';

export enum TopicSectionType {
    THEORY = 'theory',
    TRAINING = 'training',
    TEST = 'test',
}

export interface TopicSection {
    _id: string;
    type: TopicSectionType;
    theories?: Theory[];
    tasks?: Task[];
}
