import { Deadline } from '@models/deadline.model';
import { CounterModel } from '../models/counter.model';

export class Counter {
  private deadlines: Deadline[];
  private current_deadline: Deadline | null = null;

  constructor(deadlines: Deadline[]) {
    this.deadlines = deadlines;
    this.current_deadline = this.getCurrentDeadline();
  }

  changeDeadlines(deadlines: Deadline[]): void {
    this.deadlines = deadlines;

    this.current_deadline = this.getCurrentDeadline();
  }

  getCounter(): CounterModel | null {
    if (this.current_deadline == null) {
      return null;
    }

    const today: number = new Date().getTime();
    const diff = this.current_deadline.deadline_date.getTime() - today;

    if (diff < 0) {
      this.current_deadline = this.getCurrentDeadline();

      return null;
    }

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diff % (1000 * 60)) / 1000),
      deadline_milestone: this.current_deadline.milestone,
    };
  }

  private getCurrentDeadline(): Deadline | null {
    const currentDate = new Date();

    for (var item of this.deadlines) {
      if (currentDate < item.deadline_date) {
        return item;
      }
    }

    return null;
  }
}
