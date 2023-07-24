/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DeadlineCookieService } from './deadline-cookie.service';

describe('Service: DeadlineCookie', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeadlineCookieService]
    });
  });

  it('should ...', inject([DeadlineCookieService], (service: DeadlineCookieService) => {
    expect(service).toBeTruthy();
  }));
});
