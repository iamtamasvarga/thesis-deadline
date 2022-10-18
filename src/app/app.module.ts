import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { DeadlineTogglerComponent } from './components/deadline-toggler/deadline-toggler.component';

import { NgToggleModule } from 'ng-toggle-button';

@NgModule({
  declarations: [
    AppComponent,
    DeadlineTogglerComponent
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
