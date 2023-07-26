import { Injectable } from '@angular/core';
import { CustomDeadlineState, Deadline, DeadlineType, DefaultDeadlineType } from '@models/deadline.model';
import { CookieService } from 'ngx-cookie-service';
import { KEYS } from '@shared/const';
import { Subject } from 'rxjs';

export enum CookieChangedEvent {
  DEADLINE_TYPE = "DEADLINE_TYPE", CUSTOM_DEADLINE = "CUSTOM_DEADLINE", CUSTOM_DEADLINE_STATE = "CUSTOM_DEADLINE_STATE", DEFAULT_DEADLINE_TYPE = "DEFAULT_DEADLINE_TYPE"
}

@Injectable({
  providedIn: 'root'
})
export class DeadlineCookieService {
  cookieChanged = new Subject<CookieChangedEvent>();

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
    this.cookieChanged.next(CookieChangedEvent.DEADLINE_TYPE);
  }

  getCustomDeadline(): Deadline[] {
    let exists = this.cookieService.check(KEYS.CUSTOM_DEADLINE);

    if (exists) {
      const customDeadline = this.cookieService.get(KEYS.CUSTOM_DEADLINE);
      
      let parsedCustomDeadline = [...JSON.parse(customDeadline)];

      for(let i = 0, len = parsedCustomDeadline.length; i < len; i++)
      {
        const deadline_date_string: string = parsedCustomDeadline[i].deadline_date;

        parsedCustomDeadline[i].deadline_date = new Date(deadline_date_string);
      }
      
      return parsedCustomDeadline;
    }
    else {
      return [];
    }
  }

  setCustomDeadline(deadline: Deadline[]) {
    this.cookieService.set(KEYS.CUSTOM_DEADLINE, JSON.stringify(deadline));
    this.cookieChanged.next(CookieChangedEvent.CUSTOM_DEADLINE);
  }

  setCustomDeadlineState(customDeadlineStatus: CustomDeadlineState) {
    this.cookieService.set(KEYS.CUSTOM_DEADLINE_STATE, customDeadlineStatus);
    this.cookieChanged.next(CookieChangedEvent.CUSTOM_DEADLINE_STATE);
  }

  getCustomDeadlineState(): CustomDeadlineState {
    let exists = this.cookieService.check(KEYS.CUSTOM_DEADLINE_STATE);

    if (exists) {
      return this.cookieService.get(KEYS.CUSTOM_DEADLINE_STATE) as CustomDeadlineState;
    }
    else {
      return CustomDeadlineState.UNDEFINED;
    }
  }

  getDefaultDeadlineType(): DefaultDeadlineType {
    let exists = this.cookieService.check(KEYS.DEFAULT_DEADLINE_TYPE);

    if (exists) {
      return this.cookieService.get(KEYS.DEFAULT_DEADLINE_TYPE) as DefaultDeadlineType;
    }
    else {
      return DefaultDeadlineType.BACHELOR;
    }
  }

  setDefaultDeadlineType(type: DefaultDeadlineType) {
    this.cookieService.set(KEYS.DEFAULT_DEADLINE_TYPE, type);
    this.cookieChanged.next(CookieChangedEvent.DEFAULT_DEADLINE_TYPE);
  }
}
