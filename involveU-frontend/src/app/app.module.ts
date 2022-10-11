import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from './components/app.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

import { DialogModule } from 'primeng/dialog';
import {ButtonModule} from "primeng/button";
import {CookieService} from "ngx-cookie-service";
import {CarouselModule} from "primeng/carousel";

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    DialogModule,
    ButtonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CarouselModule
  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
