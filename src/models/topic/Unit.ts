export interface Unit {
    _id: string;
    ref: string;
    type: UnitType;
}

export enum UnitType {
    Theory = 'theory',
    Task = 'task',
}
