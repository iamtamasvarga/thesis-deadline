import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deadline-toggler',
  templateUrl: './deadline-toggler.component.html',
  styleUrls: ['./deadline-toggler.component.scss']
})
export class DeadlineTogglerComponent implements OnInit {
  deadlineType: boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
