import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deadline-page',
  templateUrl: './deadline-page.component.html',
  styleUrls: ['./deadline-page.component.scss'],
})
export class DeadlinePageComponent implements OnInit {
  deadlineType: boolean = false;

  constructor() {}

  ngOnInit() {}

  deadlineTypeHandler(deadlineType: boolean): void {
    this.deadlineType = deadlineType;
  }
}
