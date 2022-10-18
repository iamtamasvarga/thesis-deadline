import { CounterModel } from '../models/counter.model';

export class Counter {
  private deadlines: Deadline[];
  private current_deadline: Deadline | null = null;

  constructor(deadlines: Deadline[]) {
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
      return null;
    }

    return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
        deadline_milestone: this.current_deadline.milestone
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

  private getMilestoneString(milestione: number) {
    var j = milestione % 10,
      k = milestione % 100;
    if (j == 1 && k != 11) {
      return milestione + 'st';
    }
    if (j == 2 && k != 12) {
      return milestione + 'nd';
    }
    if (j == 3 && k != 13) {
      return milestione + 'rd';
    }

    return milestione + 'th';
  }
}
