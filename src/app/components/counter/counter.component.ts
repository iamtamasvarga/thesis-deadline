import { Component, OnDestroy, OnInit } from '@angular/core';
import { CounterModel } from '@models/counter.model';
import { CustomDeadlineState, Deadline, DeadlineType, DefaultDeadlineType } from '@models/deadline.model';
import { CookieChangedEvent, DeadlineCookieService } from '@services/deadline-cookie.service';
import { bachelorDeadlines } from '@shared/bachelor.deadline';
import { Counter } from '@shared/counter';
import { masterDeadlines } from '@shared/master.deadline';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
})
export class CounterComponent implements OnInit, OnDestroy {
  private readonly bachelorDeadlines: Deadline[] = bachelorDeadlines;
  private readonly masterDeadlines: Deadline[] = masterDeadlines;
  private customDeadlines: Deadline[] = [];
  currentDeadlines: Deadline[] = [];
  customDeadline: boolean = false; //cache
  private readonly counter!: Counter;
  counterModel: CounterModel | null = null;
  loadingCounter: boolean = true;
  cookieServiceSubscription!: Subscription;

  constructor(private deadlineCookieService: DeadlineCookieService) {
    const deadlineType = this.deadlineCookieService.getDeadlineType();
    const defaultDeadlineType = this.deadlineCookieService.getDefaultDeadlineType();

    this.cookieServiceSubscription = this.deadlineCookieService.cookieChanged.subscribe(data => {
      const event = data as CookieChangedEvent;
      console.log(event);

      if (event === CookieChangedEvent.DEADLINE_TYPE)
        this.setCustomDeadline();
      else if (event === CookieChangedEvent.DEFAULT_DEADLINE_TYPE) //master/bachelor
        this.setDefaultDeadline();
    })

    if (deadlineType === DeadlineType.DEFAULT) {
      if (defaultDeadlineType === DefaultDeadlineType.MASTER) this.currentDeadlines = this.masterDeadlines;
      else this.currentDeadlines = this.bachelorDeadlines;

      this.counter = new Counter(this.currentDeadlines);
    }
    else {
      this.currentDeadlines = this.deadlineCookieService.getCustomDeadline();
      this.customDeadlines = this.currentDeadlines;
      this.customDeadline = true;

      this.counter = new Counter(this.currentDeadlines);
    }


    setInterval(() => this.getCounter(), 1000);
  }

  private setDefaultDeadline() {
    const type = this.deadlineCookieService.getDefaultDeadlineType();

    if (type === DefaultDeadlineType.MASTER) {
      this.currentDeadlines = this.masterDeadlines;
      this.counter.changeDeadlines(this.currentDeadlines);
    }
    else if (type === DefaultDeadlineType.BACHELOR) {
      this.currentDeadlines = this.bachelorDeadlines;
      this.counter.changeDeadlines(this.currentDeadlines);
    }
  }

  ngOnInit() { }

  private setCustomDeadline() {
    const deadlineType = this.deadlineCookieService.getDeadlineType();
    if (deadlineType === DeadlineType.DEFAULT) {
      this.setDefaultDeadline();
      this.customDeadline = false;
      return;
    }

    const customDeadlineState = this.deadlineCookieService.getCustomDeadlineState();


    this.currentDeadlines = this.deadlineCookieService.getCustomDeadline();
    this.customDeadlines = this.currentDeadlines;
    this.customDeadline = true;

    this.counter.changeDeadlines(this.currentDeadlines);
  }

  private getCounter(): void {
    if (this.loadingCounter)
      this.loadingCounter = false;

    if (this.counter)
      this.counterModel = this.counter.getCounter();
  }

  ngOnDestroy(): void {
    this.cookieServiceSubscription?.unsubscribe();
  }
}
