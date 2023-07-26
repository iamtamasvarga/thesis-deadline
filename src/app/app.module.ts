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

import { BaloonsComponent } from './themes/baloons/baloons.component';
import { DDDTextComponent } from './themes/dddText/dddText.component';
import { EmojiRainComponent } from './themes/emojiRain/emojiRain.component';
import { GlitchTextComponent } from './themes/glitchText/glitchText.component';
import { HourGlassComponent } from './themes/hourGlass/hourGlass.component';
import { LightRopeComponent } from './themes/lightRope/lightRope.component';
import { MatrixComponent } from './themes/matrix/matrix.component';
import { NeonComponent } from './themes/neon/neon.component';
import { SlidingTextComponent } from './themes/slidingText/slidingText.component';
import { SnowComponent } from './themes/snow/snow.component';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { DividerModule } from 'primeng/divider';
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
    OrdinalPipe,
    BaloonsComponent,
    DDDTextComponent,
    EmojiRainComponent,
    GlitchTextComponent,
    HourGlassComponent,
    LightRopeComponent,
    MatrixComponent,
    NeonComponent,
    SlidingTextComponent,
    SnowComponent
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
    DividerModule,
    NgToggleModule.forRoot()
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
