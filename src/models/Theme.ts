import type { ThemeSection } from './ThemeSection';

export interface Theme {
    id: string | number;
    title: string;
    sections: ThemeSection[];
}
