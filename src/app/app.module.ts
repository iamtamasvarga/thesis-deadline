import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { DonateComponent } from '@components/donate/donate.component';
import { CounterComponent } from '@components/counter/counter.component';
import { SettingsComponent } from '@components/settings/settings.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { DeadlinePageComponent } from './pages/deadline-page/deadline-page.component';
import { DeadlineTogglerComponent } from '@components/deadline-toggler/deadline-toggler.component';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { NgToggleModule } from 'ng-toggle-button';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { NgHeroiconsModule } from "@dimaslz/ng-heroicons";
import { OrdinalPipe } from '@shared/ordinal.pipe';


@NgModule({
  declarations: [
    AppComponent,
    DeadlineTogglerComponent,
    DonateComponent,
    MainLayoutComponent,
    DeadlinePageComponent,
    CounterComponent,
    SettingsComponent,
    OrdinalPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    CheckboxModule,
    NgHeroiconsModule,
    DialogModule,
    TooltipModule,
    DropdownModule,
    InputNumberModule,
    ButtonModule,
    CalendarModule,
    NgToggleModule.forRoot()
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
