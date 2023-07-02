import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import {Degree} from '@models/degree.enum'

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
  defaultDeadlines: boolean = true;
  selectedDegree: Degree = Degree.INF;
  availableDegrees: Degree[] = [];

    rotate() {
        this.state = (this.state === 'default' ? 'rotated' : 'default');
    }
    visible: boolean = true;

  constructor() {
    this.availableDegrees = Object.values(Degree);
  }

  ngOnInit() {
  }

  showDialog() {
    this.rotate();
    this.visible = true;
  }

}
