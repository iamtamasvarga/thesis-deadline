import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import {Degree} from '@models/degree.enum'

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
  noDeadlines: number = 1; //cache
  customDeadlines: Date[] = [];
  currentDate: Date | undefined;
  visible: boolean = true; //false
  customDeadlineState: CustomDeadlineState = CustomDeadlineState.UNDEFINED;
  CustomDeadlineStateEnum = CustomDeadlineState;

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

  }

  previousDeadline() {

  }

  submitNoDeadlines() {
    this.customDeadlineState = CustomDeadlineState.SUBMITTED;
    console.log(this.customDeadlineState);
  }

  cancelCustomDeadline() {
    this.customDeadlineState = CustomDeadlineState.UNDEFINED;
  }

  createCustomDeadline() {
    this.customDeadlineState = CustomDeadlineState.CREATED;
  }
}
