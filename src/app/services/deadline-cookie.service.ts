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

  private check(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }

  getDeadlineType(): DeadlineType {
    let exists = this.check(KEYS.DEADLINE_TYPE);

    if (exists) {
      return localStorage.getItem(KEYS.DEADLINE_TYPE) as DeadlineType;
    }
    else {
      return DeadlineType.DEFAULT;
    }
  }

  setDeadlineType(deadlinteType: DeadlineType) {
    localStorage.setItem(KEYS.DEADLINE_TYPE, deadlinteType);
    this.cookieChanged.next(CookieChangedEvent.DEADLINE_TYPE);
  }

  getCustomDeadline(): Deadline[] {
    let exists = this.check(KEYS.CUSTOM_DEADLINE);

    if (exists) {
      const customDeadline = localStorage.getItem(KEYS.CUSTOM_DEADLINE) as string;
      return JSON.parse(customDeadline);
    }
    else {
      return [];
    }
  }

  setCustomDeadline(deadline: Deadline[]) {
    localStorage.setItem(KEYS.CUSTOM_DEADLINE, JSON.stringify(deadline));
    this.cookieChanged.next(CookieChangedEvent.CUSTOM_DEADLINE);
  }

  setCustomDeadlineStatus(customDeadlineStatus: CustomDeadlineState) {
    localStorage.setItem(KEYS.CUSTOM_DEADLINE_STATE, customDeadlineStatus);
    this.cookieChanged.next(CookieChangedEvent.CUSTOM_DEADLINE_STATE);
  }

  getCustomDeadlineStatus(): CustomDeadlineState {
    let exists = this.check(KEYS.CUSTOM_DEADLINE_STATE);

    if (exists) {
      return localStorage.getItem(KEYS.CUSTOM_DEADLINE_STATE) as CustomDeadlineState;
    }
    else {
      return CustomDeadlineState.UNDEFINED;
    }
  }

  getDefaultDeadlineType(): DefaultDeadlineType {
    let exists = this.check(KEYS.DEFAULT_DEADLINE_TYPE);

    if (exists) {
      return localStorage.getItem(KEYS.DEFAULT_DEADLINE_TYPE) as DefaultDeadlineType;
    }
    else {
      return DefaultDeadlineType.BACHELOR;
    }
  }

  setDefaultDeadlineType(type: DefaultDeadlineType) {
    localStorage.setItem(KEYS.DEFAULT_DEADLINE_TYPE, type);
    this.cookieChanged.next(CookieChangedEvent.DEFAULT_DEADLINE_TYPE);
  }
}
