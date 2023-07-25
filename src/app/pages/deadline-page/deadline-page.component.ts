import { Component, OnDestroy, OnInit } from '@angular/core';
import { DeadlineType } from '@models/deadline.model';
import { CookieChangedEvent, DeadlineCookieService } from '@services/deadline-cookie.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-deadline-page',
  templateUrl: './deadline-page.component.html',
  styleUrls: ['./deadline-page.component.scss'],
})
export class DeadlinePageComponent implements OnInit, OnDestroy {
  defaultDeadlines: boolean = true;
  cookieServiceSubscription!: Subscription;

  constructor(private deadlineCookieService: DeadlineCookieService) {}

  ngOnInit() {
    this.getDeadlineType();

    this.cookieServiceSubscription = this.deadlineCookieService.cookieChanged.subscribe(data => {
      const event = data as CookieChangedEvent;

      if(event === CookieChangedEvent.DEADLINE_TYPE)
        this.getDeadlineType();
    })
  }

  getDeadlineType() {
    this.defaultDeadlines = this.deadlineCookieService.getDeadlineType() == DeadlineType.DEFAULT;
  }

  ngOnDestroy(): void {
    this.cookieServiceSubscription.unsubscribe();
  }
}
