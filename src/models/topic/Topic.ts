import type { Unit } from '@/models/topic/Unit';

export interface Topic {
    _id: string;
    title: string;
    units: Unit[];
}
