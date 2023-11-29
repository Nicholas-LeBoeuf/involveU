import { NgModule } from '@angular/core';
import {BrowserModule, Title} from '@angular/platform-browser';
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
import {TableModule} from "primeng/table";
import {InputTextModule} from "primeng/inputtext";
import {ContextMenuModule} from "primeng/contextmenu";
import {DropdownModule} from "primeng/dropdown";
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
import { DatePipe } from '@angular/common';
import { MoreInfoComponent } from './components/more-info/more-info.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {AdminService} from "./services/admin.service";
import {AnnouncementsService} from "./services/announcements.service";
import {ClubService} from "./services/club.service";
import {EboardService} from "./services/eboard.service";
import {EventsService} from "./services/events.service";
import {UserService} from "./services/user.service";
import {TabViewModule} from "primeng/tabview";
import { IntroClubsOrgsComponent } from './components/more-info/more-info-tabs/intro-clubs-orgs/intro-clubs-orgs.component';
import { OsiStaffComponent } from './components/more-info/more-info-tabs/osi-staff/osi-staff.component';
import { StudentCenterServicesComponent } from './components/more-info/more-info-tabs/student-center-services/student-center-services.component';
import { EventPlanningComponent } from './components/more-info/more-info-tabs/event-planning/event-planning.component';
import { ProgramPlanningChecklistComponent } from './components/more-info/more-info-tabs/program-planning-checklist/program-planning-checklist.component';
import { PreTripAgendaComponent } from './components/more-info/more-info-tabs/pre-trip-agenda/pre-trip-agenda.component';
import { TripPlanningGuideComponent } from './components/more-info/more-info-tabs/trip-planning-guide/trip-planning-guide.component';
import {ToastrModule} from "ngx-toastr";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import {ColorPickerModule} from "primeng/colorpicker";
import { SidebarComponent } from './sidebar/sidebar.component';
import { PublicProfileComponent } from './components/public-profile/public-profile.component';


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
    CalendarComponent,
    TimeFormatPipe,
    EboardPageComponent,
    MoreInfoComponent,
    IntroClubsOrgsComponent,
    OsiStaffComponent,
    StudentCenterServicesComponent,
    EventPlanningComponent,
    ProgramPlanningChecklistComponent,
    PreTripAgendaComponent,
    TripPlanningGuideComponent,
    ProfilePageComponent,
    SidebarComponent,
    PublicProfileComponent,
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
    FontAwesomeModule,
    TabViewModule,
    ToastrModule.forRoot(),
    ProgressSpinnerModule,
    ColorPickerModule,
  ],
  providers: [
    CookieService,
    ResponsiveService,
    AdminService,
    AnnouncementsService,
    ClubService,
    EboardService,
    EventsService,
    UserService,
    DatePipe,
    Title
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
