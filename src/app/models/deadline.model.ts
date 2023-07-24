export interface Deadline
{
    milestone: number;
    deadline_date: Date;
}

export enum DeadlineType {
    CUSTOM = "CUSTOM", DEFAULT = "DEFAULT"
}

export enum CustomDeadlineState {
  UNDEFINED = "UNDEFINED", SUBMITTED = "SUBMITTED", CREATED = "CREATED"
}
