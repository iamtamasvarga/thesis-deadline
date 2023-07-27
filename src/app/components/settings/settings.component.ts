import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Degree } from '@models/degree.enum'
import { DeadlineCookieService } from '@services/deadline-cookie.service';
import { Deadline, DeadlineType, CustomDeadlineState } from '@models/deadline.model';
import { Subscription } from 'rxjs';
import { ThemeCookieService } from '@services/theme-cookie.service';
import { Theme } from '@shared/theme';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  animations: [
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(0)' })),
      state('rotated', style({ transform: 'rotate(180deg)' })),
      transition('default => rotated', animate('1500ms ease-out')),
      transition('rotated => default', animate('1500ms ease-out')),
    ])
  ]
})
export class SettingsComponent implements OnInit {
  state: string = 'default';
  defaultDeadlines: boolean = true; //cache
  selectedDegree: Degree = Degree.INF;
  availableDegrees: Degree[] = [];
  visible: boolean = false;

  themes: Theme[] = [];
  selectedTheme!: Theme;

  customDeadlineState: CustomDeadlineState = CustomDeadlineState.UNDEFINED; //cache
  minDate: Date = new Date();
  CustomDeadlineStateEnum = CustomDeadlineState;
  noDeadlines: number = 1;
  customDeadlines: Date[] = [];
  currentDate: Date | undefined;
  deadlineIndex: number = 0;
  nextButtonDisabled = true;
  prevButtonDisabled = true;
  submitButtonDisabled = true;

  rotate() {
    this.state = (this.state === 'default' ? 'rotated' : 'default');
  }

  constructor(private deadlineCookieService: DeadlineCookieService, private themeCookieService: ThemeCookieService) {
    this.availableDegrees = Object.values(Degree);
  }

  ngOnInit() {
    this.defaultDeadlines = this.deadlineCookieService.getDeadlineType() == DeadlineType.DEFAULT;
    this.customDeadlineState = this.deadlineCookieService.getCustomDeadlineState() as CustomDeadlineState;
    this.themes = this.themeCookieService.getThemes();
    this.selectedTheme = this.themeCookieService.getCurrentTheme();
  }

  showDialog() {
    this.rotate();
    this.visible = true;
  }

  nextDeadline() {
    if (this.deadlineIndex >= this.noDeadlines - 1) {
      // console.log("out of upper range");
      return;
    }
    else if (!this.currentDate) {
      // console.log("no value selected");
      return;
    }
    else if (this.deadlineIndex < this.customDeadlines.length) {
      if (this.currentDate != this.customDeadlines[this.deadlineIndex]) {
        // console.log("value changed");
        this.customDeadlines[this.deadlineIndex] = this.currentDate;
        this.minDate = new Date();
        this.minDate.setDate(this.currentDate.getDate() + 1);
        this.deadlineIndex++;
        this.customDeadlines = this.customDeadlines.slice(0, this.deadlineIndex);
        this.currentDate = undefined;
      }
      else {
        // console.log("found a value");
        this.deadlineIndex++;
        this.currentDate = this.customDeadlines[this.deadlineIndex];
        this.minDate = this.currentDate;
      }
    }
    else {
      // console.log("added new value");
      this.customDeadlines[this.deadlineIndex] = this.currentDate;
      this.deadlineIndex++;
      this.minDate = new Date();
      this.minDate.setDate(this.currentDate.getDate() + 1);
      this.currentDate = undefined;
    }

    if (this.deadlineIndex >= 1) {
      this.prevButtonDisabled = false;
    }

    if (this.deadlineIndex === this.noDeadlines - 1) {
      this.nextButtonDisabled = true;
    }

  }

  previousDeadline() {
    if (this.deadlineIndex <= 0) {
      // console.log("out of lower range")
      return;
    }

    // console.log("getting last value")
    this.deadlineIndex--;
    this.currentDate = this.customDeadlines[this.deadlineIndex];
    this.minDate = new Date();
    if (this.deadlineIndex != 0) {
      this.minDate.setDate(this.currentDate.getDate() + 1);
    }

    if (this.deadlineIndex == 0) {
      this.prevButtonDisabled = true;
    }
    else if (this.deadlineIndex < this.noDeadlines - 1) {
      this.nextButtonDisabled = false;
      this.submitButtonDisabled = true;
    }
  }

  submitNoDeadlines() {
    this.customDeadlineState = CustomDeadlineState.SUBMITTED;
  }

  cancelCustomDeadline() {
    this.customDeadlineState = CustomDeadlineState.UNDEFINED;
    this.resetCustomDeadlines();
  }

  createCustomDeadlines() {
    if (!this.currentDate)
      return;

    this.customDeadlines.push(this.currentDate);

    let deadlines: Deadline[] = [];

    for (let i = 0, len = this.customDeadlines.length; i < len; i++) {
      deadlines.push({ deadline_date: this.customDeadlines[i], milestone: i + 1 });
    }

    this.deadlineCookieService.setCustomDeadline(deadlines);
    this.customDeadlineState = CustomDeadlineState.CREATED;
    this.deadlineCookieService.setCustomDeadlineState(this.customDeadlineState);
    this.deadlineCookieService.setDeadlineType(DeadlineType.CUSTOM);
  }

  resetCustomDeadlines() {
    this.submitButtonDisabled = true;
    this.customDeadlineState = CustomDeadlineState.UNDEFINED;
    this.deadlineIndex = 0;
    this.customDeadlines = [];
    this.currentDate = undefined;
    this.prevButtonDisabled = true;
    this.nextButtonDisabled = true;

    this.deadlineCookieService.setCustomDeadline([]);
    this.deadlineCookieService.setCustomDeadlineState(this.customDeadlineState);
    this.deadlineCookieService.setDeadlineType(DeadlineType.CUSTOM);
  }

  IsDateDefined() {
    if (this.deadlineIndex === 0) {
      const correctDate = this.currentDate === undefined ? false : this.minDate < this.currentDate ? true : false;
      this.nextButtonDisabled = this.noDeadlines == 1 ? true : correctDate;

    }

    if (this.deadlineIndex === this.noDeadlines - 1 && this.currentDate) {
      this.submitButtonDisabled = false;
    }
  }

  deadlineCheckboxChanged() {
    this.deadlineCookieService.setDeadlineType(this.defaultDeadlines ? DeadlineType.DEFAULT : DeadlineType.CUSTOM);
  }

  dialogHideHandler() {
    if (this.defaultDeadlines)
      return;

    if (this.customDeadlineState === CustomDeadlineState.CREATED)
      return;

    this.resetCustomDeadlines();
  }

  themeChanged() {
    this.themeCookieService.setTheme(this.selectedTheme);
  }
}

// TODO:
// -  check responsiveness
// -  last date... disable next and show error if not correct... otherwise enable submit (no need, optional)
