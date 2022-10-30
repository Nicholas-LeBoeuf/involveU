import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClubPageComponent} from "./components/club-page/club-page.component";
import {LandingPageComponent} from "./components/landing-page/landing-page.component";
import {SpecificClubPageComponent} from "./components/specific-club-page/specific-club-page.component";

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
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
