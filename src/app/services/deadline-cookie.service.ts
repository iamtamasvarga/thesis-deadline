import { Injectable } from '@angular/core';
import { Deadline, DeadlineType } from '@models/deadline.model';
import { CookieService } from 'ngx-cookie-service';
import { KEYS } from '@shared/const';

@Injectable({
  providedIn: 'root'
})
export class DeadlineCookieService {

  constructor(private cookieService: CookieService) { }

  getDeadlineType(): DeadlineType {
    let exists = this.cookieService.check(KEYS.DEADLINE_TYPE);

    if (exists) {
      return this.cookieService.get(KEYS.DEADLINE_TYPE) as DeadlineType;
    }
    else {
      return DeadlineType.DEFAULT;
    }
  }

  setDeadlineType(deadlinteType: DeadlineType) {
    this.cookieService.set(KEYS.DEADLINE_TYPE, deadlinteType);
  }

  getCustomDeadline(): Deadline[] {
    let exists = this.cookieService.check(KEYS.CUSTOM_DEADLINE);

    if (exists) {
      const customDeadline = this.cookieService.get(KEYS.CUSTOM_DEADLINE);
      return JSON.parse(customDeadline);
    }
    else {
      return [];
    }
  }

  setCustomDeadline(deadline: Deadline[]) {
    this.cookieService.set(KEYS.CUSTOM_DEADLINE, JSON.stringify(deadline));
  }
}
