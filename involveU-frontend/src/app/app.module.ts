import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AppComponent } from './components/app.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ClubPageComponent } from './components/club-page/club-page.component';
import { DialogModule } from 'primeng/dialog';
import {ButtonModule} from "primeng/button";
import {CookieService} from "ngx-cookie-service";
import {RouterOutlet} from "@angular/router";
import { AppRoutingModule } from './app-routing.module';
import {CarouselModule} from "primeng/carousel";
import { FilterPipe } from './pipes/filter.pipe';
import {RippleModule} from "primeng/ripple";
import { SpecificClubPageComponent } from './components/specific-club-page/specific-club-page.component';


@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    ClubPageComponent,
    FilterPipe,
    SpecificClubPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    DialogModule,
    ButtonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterOutlet,
    AppRoutingModule,
    CarouselModule,
    FormsModule,
    RippleModule
  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
