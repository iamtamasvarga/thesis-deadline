import { Component, OnInit } from '@angular/core';
import { LocalService } from '@services/local.service';
import { KEYS, parseStringToBool } from '@shared/const';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-deadline-toggler',
  templateUrl: './deadline-toggler.component.html',
  styleUrls: ['./deadline-toggler.component.scss']
})
export class DeadlineTogglerComponent implements OnInit {
  deadlineType: boolean = false;
  @Output() deadlineTypeEvent = new EventEmitter<boolean>();
  
  constructor(private local: LocalService) {
  }

  ngOnInit() {
    let value = this.local.getData(KEYS.DEADLINE_TOGGLE);
    if(value === null)
    {
      this.local.saveData(KEYS.DEADLINE_TOGGLE, this.deadlineType.toString());
    }
    else
    {
      try
      {
        this.deadlineType = parseStringToBool(value);
        this.toggleHandler();
      }
      catch(e: unknown)
      {
        console.error(e);
      }
    }
  }

  toggleHandler(): void {
    this.deadlineTypeEvent.emit(this.deadlineType);
    this.local.saveData(KEYS.DEADLINE_TOGGLE, this.deadlineType.toString());
  }

}
