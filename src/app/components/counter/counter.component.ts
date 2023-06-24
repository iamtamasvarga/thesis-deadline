import { Component, Input, OnInit } from '@angular/core';
import { CounterModel } from '@models/counter.model';
import { Deadline } from '@models/deadline.model';
import { bachelorDeadlines } from '@shared/bachelor.deadline';
import { Counter } from '@shared/counter';
import { masterDeadlines } from '@shared/master.deadline';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
})
export class CounterComponent implements OnInit {
  @Input() set deadlineTypeInput(deadlineTypeInput: boolean) {
    this.deadlineType = deadlineTypeInput;

    if (this.deadlineType) this.currentDeadline = this.masterDeadlines;
    else this.currentDeadline = this.bachelorDeadlines;

    this.counter.changeDeadlines(this.currentDeadline);
  }

  deadlineType: boolean = false;
  private readonly bachelorDeadlines: Deadline[] = bachelorDeadlines;
  private readonly masterDeadlines: Deadline[] = masterDeadlines;
  currentDeadline: Deadline[];
  private readonly counter: Counter;
  counterModel: CounterModel | null = null;
  loadingCounter: boolean = true;

  constructor() {
    if (this.deadlineType) this.currentDeadline = this.masterDeadlines;
    else this.currentDeadline = this.bachelorDeadlines;

    this.counter = new Counter(this.currentDeadline);

    setInterval(() => this.getCounter(), 1000);
  }

  ngOnInit() { }

  private getCounter(): void {
    if (this.loadingCounter)
      this.loadingCounter = false;

    this.counterModel = this.counter.getCounter();
  }
}
