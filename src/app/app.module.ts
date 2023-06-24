import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DonateComponent } from '@components/donate/donate.component';
import { CounterComponent } from '@components/counter/counter.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { DeadlinePageComponent } from './pages/deadline-page/deadline-page.component';
import { DeadlineTogglerComponent } from '@components/deadline-toggler/deadline-toggler.component';

import { NgToggleModule } from 'ng-toggle-button';

@NgModule({
  declarations: [
    AppComponent,
    DeadlineTogglerComponent,
    DonateComponent,
    MainLayoutComponent,
    DeadlinePageComponent,
    CounterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgToggleModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
