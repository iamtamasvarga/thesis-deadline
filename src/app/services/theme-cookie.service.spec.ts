/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ThemeCookieService } from './theme-cookie.service';

describe('Service: ThemeCookie', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThemeCookieService]
    });
  });

  it('should ...', inject([ThemeCookieService], (service: ThemeCookieService) => {
    expect(service).toBeTruthy();
  }));
});
