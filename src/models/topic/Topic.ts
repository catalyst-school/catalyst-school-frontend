import type { TopicSection } from './TopicSection';

export interface Topic {
    _id: string;
    title: string;
    sections: TopicSection[];
}
