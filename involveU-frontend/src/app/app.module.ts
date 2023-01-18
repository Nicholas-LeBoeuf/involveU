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
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import {Table, TableModule} from "primeng/table";
import {InputTextModule} from "primeng/inputtext";
import {ContextMenuModule} from "primeng/contextmenu";
import {DropdownModule} from "primeng/dropdown";
import { ScheduleComponent } from './components/schedule/schedule.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { CalendarComponent } from './components/calendar/calendar.component';
import { TimeFormatPipe } from './pipes/time-format.pipe';
import {FileUploadModule} from 'primeng/fileupload';
import { EboardPageComponent } from './components/eboard-page/eboard-page.component';
import {LayoutModule} from "@angular/cdk/layout";
import {ResponsiveService} from "./services/responsive.service";

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    ClubPageComponent,
    FilterPipe,
    SpecificClubPageComponent,
    AdminPageComponent,
    ScheduleComponent,
    CalendarComponent,
    TimeFormatPipe,
    EboardPageComponent
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
        RippleModule,
        TableModule,
        InputTextModule,
        ContextMenuModule,
        DropdownModule,
        FullCalendarModule,
        FileUploadModule,
        LayoutModule,
    ],
  providers: [
    CookieService,
    ResponsiveService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
