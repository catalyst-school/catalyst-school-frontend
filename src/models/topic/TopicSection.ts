import type { Task } from '../task/Task';
import type { Theory } from '../theory/Theory';

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
