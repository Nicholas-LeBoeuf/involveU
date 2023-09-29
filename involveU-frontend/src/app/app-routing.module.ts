import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClubPageComponent} from "./components/club-page/club-page.component";
import {LandingPageComponent} from "./components/landing-page/landing-page.component";
import {SpecificClubPageComponent} from "./components/specific-club-page/specific-club-page.component";
import {AdminPageComponent} from "./components/admin-page/admin-page.component";
import {EboardPageComponent} from "./components/eboard-page/eboard-page.component";
import {MoreInfoComponent} from "./components/more-info/more-info.component"
import {CalendarComponent} from "./components/calendar/calendar.component";
import {ProfilePageComponent} from "./components/profile-page/profile-page.component";

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'home',
    component: LandingPageComponent
  },
  {
    path: 'clubs',
    component: ClubPageComponent
  },
  {
    path: 'clubs/:id',
    component: SpecificClubPageComponent
  },
  {
    path: 'admin',
    component: AdminPageComponent
  },
  {
    path: 'calendar',
    component: CalendarComponent
  },
  {
    path: ':id/eboard',
    component: EboardPageComponent
  },
  {
    path: 'moreinfo',
    component: MoreInfoComponent
  },
  {
    path: 'profile',
    component: ProfilePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
