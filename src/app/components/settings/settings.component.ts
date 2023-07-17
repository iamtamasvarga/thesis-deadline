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
  deadlineIndex: number = 0;
  nextButtonDisabled = false;
  prevButtonDisabled = false;

  rotate() {
    this.state = (this.state === 'default' ? 'rotated' : 'default');
  }

  constructor() {
    this.availableDegrees = Object.values(Degree);
  }

  ngOnInit() {
    // setInterval(() => console.log(this.nextButtonDisabled), 1000);
    setInterval(() => console.log(this.customDeadlines), 1000);
    setInterval(() => console.log(this.deadlineIndex), 1000);
  }

  showDialog() {
    this.rotate();
    this.visible = true;
  }

  nextDeadline() {
    if (this.deadlineIndex >= this.noDeadlines - 1) {
      console.log("out of upper range");
      return;
    }

    if (!this.currentDate) {
      console.log("no value selected");
      return;
    }

    if (this.deadlineIndex < this.customDeadlines.length) {
      if(this.currentDate != this.customDeadlines[this.deadlineIndex]) {
        console.log("value changed");
        this.customDeadlines[this.deadlineIndex] = this.currentDate;
        this.minDate = new Date();
        this.minDate.setDate(this.currentDate.getDate() + 1);
        this.deadlineIndex++;
        this.customDeadlines = this.customDeadlines.slice(0, this.deadlineIndex);
        this.currentDate = undefined;
      }
      else {
        console.log("found a value");
        this.deadlineIndex++;
        this.currentDate = this.customDeadlines[this.deadlineIndex];
        this.minDate = this.currentDate;
      }
    }
    else {
      console.log("added new value");
      this.customDeadlines[this.deadlineIndex] = this.currentDate;
      this.deadlineIndex++;
      this.minDate = new Date();
      this.minDate.setDate(this.currentDate.getDate() + 1);
      this.currentDate = undefined;
    }

  }

  previousDeadline() {
    if (this.deadlineIndex <= 0) {
      console.log("out of lower range")
      return;
    }

    console.log("getting last value")
    this.deadlineIndex--;
    this.currentDate = this.customDeadlines[this.deadlineIndex];
    this.minDate = new Date();
    if (this.deadlineIndex != 1) {
      this.minDate.setDate(this.currentDate.getDate() + 1);
    }

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
    this.nextButtonDisabled = false;
    //   if (this.deadlineIndex == 1) {
    //     this.nextButtonDisabled = this.currentDate === undefined;
    //     return;
    //   }
    //   else if (this.deadlineIndex >= this.noDeadlines) {
    //     if (!this.currentDate) {
    //       this.nextButtonDisabled = true;
    //       return;
    //     }

    //     let previousDate = this.customDeadlines.pop();

    //     if (!previousDate) {
    //       this.nextButtonDisabled = true;
    //       return;
    //     }

    //     this.nextButtonDisabled = this.currentDate > previousDate;
    //     return;
    //   }

    //   this.nextButtonDisabled = true;;
  }
}

// TODO:
// -  IsDateDefined - correct button disable
// -  remove form
// -  check responsiveness
// -  last date... disable next and show error if not correct... otherwise enable submit
// - remove logs
