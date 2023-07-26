import { Injectable } from '@angular/core';
import { KEYS } from '@shared/const';
import { Theme } from '@shared/theme';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeCookieService {
  themeChanged = new Subject<Theme>();

  constructor(private cookieService: CookieService) { }

  setTheme(theme: Theme) {
    this.cookieService.set(KEYS.SELECTED_THEME, theme);
    this.themeChanged.next(theme);
  }

  getThemes(): Theme[] {
    return Object.keys(Theme) as Theme[];
  }

  getCurrentTheme(): Theme {
    let exists = this.cookieService.check(KEYS.SELECTED_THEME);

    if (exists) {
      return this.cookieService.get(KEYS.SELECTED_THEME) as Theme;
    }
    else {
      return Theme.BLANK;
    }
  }
}
