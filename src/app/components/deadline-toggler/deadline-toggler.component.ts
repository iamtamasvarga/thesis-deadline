import { Component, OnInit } from '@angular/core';
import { DeadlineType, DefaultDeadlineType } from '@models/deadline.model';
import { DeadlineCookieService } from '@services/deadline-cookie.service';
import { LocalService } from '@services/local.service';
import { KEYS, parseStringToBool } from '@shared/const';

@Component({
  selector: 'app-deadline-toggler',
  templateUrl: './deadline-toggler.component.html',
  styleUrls: ['./deadline-toggler.component.scss']
})
export class DeadlineTogglerComponent implements OnInit {
  deadlineType: boolean = false;
  
  constructor(private deadlineCookieService: DeadlineCookieService) {
  }

  ngOnInit() {
    let type = this.deadlineCookieService.getDefaultDeadlineType();
    
    this.deadlineType = type === DefaultDeadlineType.MASTER ? true : false;
  }

  toggleHandler(): void {
    const type = this.deadlineType ? DefaultDeadlineType.MASTER : DefaultDeadlineType.BACHELOR; 
    this.deadlineCookieService.setDefaultDeadlineType(type);
  }
}
