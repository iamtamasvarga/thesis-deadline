import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Degree } from '@models/degree.enum'
import { TrashSolidIconComponent } from '@dimaslz/ng-heroicons';

export enum CustomDeadlineState {
  UNDEFINED, SUBMITTED, CREATED
}

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
  defaultDeadlines: boolean = false; //cache
  selectedDegree: Degree = Degree.INF;
  availableDegrees: Degree[] = [];
  visible: boolean = true; //false

  customDeadlineState: CustomDeadlineState = CustomDeadlineState.SUBMITTED; //cache
  minDate: Date = new Date();
  CustomDeadlineStateEnum = CustomDeadlineState;
  noDeadlines: number = 3; //cache
  customDeadlines: Date[] = [];
  currentDate: Date | undefined;
  deadlineIndex: number = 1;

  rotate() {
    this.state = (this.state === 'default' ? 'rotated' : 'default');
  }

  constructor() {
    this.availableDegrees = Object.values(Degree);
  }

  ngOnInit() {
  }

  showDialog() {
    this.rotate();
    this.visible = true;
  }

  nextDeadline() {
    if (this.deadlineIndex >= this.noDeadlines)
      return;

    if(this.currentDate) {
      this.customDeadlines.push(this.currentDate);
      this.currentDate = undefined;
      this.deadlineIndex++;
    }
  }

  previousDeadline() {
    if (this.deadlineIndex <= 1)
      return;

    this.deadlineIndex--;
  }

  submitNoDeadlines() {
    this.customDeadlineState = CustomDeadlineState.SUBMITTED;
    console.log(this.customDeadlineState);
  }

  cancelCustomDeadline() {
    this.customDeadlineState = CustomDeadlineState.UNDEFINED;
    this.resetCustomDeadlines();
  }

  createCustomDeadlines() {
    throw new Error('Method not implemented.');
  }

  resetCustomDeadlines() {
    this.deadlineIndex = 1;
    this.customDeadlines = [];
    this.currentDate = undefined;
  }

  IsDateDefined() {
    if (this.deadlineIndex == 1) {
      return this.currentDate === undefined;
    }
    else if(this.deadlineIndex >= this.noDeadlines) {
      if(!this.currentDate)
        return true;

      let previousDate = this.customDeadlines.pop();

      if(!previousDate)
        return true;

      return this.currentDate > previousDate;
    }

    return true;
  }
}

// TODO:
// -  min date for each iteration (prev/next)
// -  IsDateDefined - correct
// -  remove form
// -  check responsiveness
