import { Injectable } from '@angular/core';
import { CustomDeadlineState, Deadline, DeadlineType } from '@models/deadline.model';
import { CookieService } from 'ngx-cookie-service';
import { KEYS } from '@shared/const';
import { Subject } from 'rxjs';

export enum CookieChangedEvent {
  DEADLINE_TYPE = "DEADLINE_TYPE", CUSTOM_DEADLINE = "CUSTOM_DEADLINE", CUSTOM_DEADLINE_STATE = "CUSTOM_DEADLINE_STATE"
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
      return JSON.parse(customDeadline);
    }
    else {
      return [];
    }
  }

  setCustomDeadline(deadline: Deadline[]) {
    this.cookieService.set(KEYS.CUSTOM_DEADLINE, JSON.stringify(deadline));
    this.cookieChanged.next(CookieChangedEvent.CUSTOM_DEADLINE);
  }

  setCustomDeadlineStatus(customDeadlineStatus: CustomDeadlineState) {
    this.cookieService.set(KEYS.CUSTOM_DEADLINE_STATE, customDeadlineStatus);
    this.cookieChanged.next(CookieChangedEvent.CUSTOM_DEADLINE_STATE);
  }

  getCustomDeadlineStatus(): CustomDeadlineState {
    let exists = this.cookieService.check(KEYS.CUSTOM_DEADLINE_STATE);

    if (exists) {
      return this.cookieService.get(KEYS.CUSTOM_DEADLINE_STATE) as CustomDeadlineState;
    }
    else {
      return CustomDeadlineState.UNDEFINED;
    }
  }
}
