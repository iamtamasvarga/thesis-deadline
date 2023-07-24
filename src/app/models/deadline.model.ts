export interface Deadline
{
    milestone: number;
    deadline_date: Date;
}

export enum DeadlineType {
    CUSTOM = "CUSTOM", DEFAULT = "DEFAULT"
}