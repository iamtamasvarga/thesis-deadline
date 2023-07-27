import { Component, OnDestroy, OnInit } from '@angular/core';
import { DeadlineType } from '@models/deadline.model';
import { CookieChangedEvent, DeadlineCookieService } from '@services/deadline-cookie.service';
import { ThemeCookieService } from '@services/theme-cookie.service';
import { Theme } from '@shared/theme';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-deadline-page',
  templateUrl: './deadline-page.component.html',
  styleUrls: ['./deadline-page.component.scss'],
})
export class DeadlinePageComponent implements OnInit, OnDestroy {
  defaultDeadlines: boolean = true;
  selectedTheme: Theme = Theme.BLANK;
  cookieServiceSubscription!: Subscription;
  themeServiceSubscription!: Subscription;
  Theme = Theme;

  constructor(private deadlineCookieService: DeadlineCookieService, private themeCookieService: ThemeCookieService) {}

  ngOnInit() {
    this.getDeadlineType();

    this.cookieServiceSubscription = this.deadlineCookieService.cookieChanged.subscribe(data => {
      const event = data as CookieChangedEvent;

      if(event === CookieChangedEvent.DEADLINE_TYPE)
        this.getDeadlineType();
    });

    this.themeServiceSubscription = this.themeCookieService.themeChanged.subscribe(theme => {
      this.selectTheme(theme);
    });

    const currentTheme = this.themeCookieService.getCurrentTheme();
    this.selectTheme(currentTheme);
  }

  getDeadlineType() {
    this.defaultDeadlines = this.deadlineCookieService.getDeadlineType() == DeadlineType.DEFAULT;
  }

  ngOnDestroy(): void {
    this.cookieServiceSubscription?.unsubscribe();
    this.themeServiceSubscription?.unsubscribe();
  }

  selectTheme(theme: Theme) {
    this.selectedTheme = theme;
  }
}
