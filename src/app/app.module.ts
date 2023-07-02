import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DonateComponent } from '@components/donate/donate.component';
import { CounterComponent } from '@components/counter/counter.component';
import { SettingsComponent } from '@components/settings/settings.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { DeadlinePageComponent } from './pages/deadline-page/deadline-page.component';
import { DeadlineTogglerComponent } from '@components/deadline-toggler/deadline-toggler.component';

import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { CheckboxModule } from 'primeng/checkbox';
import { NgToggleModule } from 'ng-toggle-button';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { NgHeroiconsModule } from "@dimaslz/ng-heroicons";


@NgModule({
  declarations: [
    AppComponent,
    DeadlineTogglerComponent,
    DonateComponent,
    MainLayoutComponent,
    DeadlinePageComponent,
    CounterComponent,
    SettingsComponent
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
    NgToggleModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
