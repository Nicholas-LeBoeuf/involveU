import { Component, OnInit } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {User} from "../../objects/user";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CalendarComponent} from "../calendar/calendar.component";
import { ColorPickerModule } from 'primeng/colorpicker';

import {ProfileService} from "../../services/profile.service";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {


  constructor(public cookie: CookieService,
              public profileService: ProfileService) {
  }

  userCalendarColor: string;
  disableInputFields: boolean = true;
  isLoggedIn: boolean = false;
  userID: number;
  currentUser: User;
  userProfileInfo: User;

  ngOnInit(): void {
    this.userID = +this.cookie.get('studentID');
    this.isUserLoggedIn();
    this.getUserInfo();
    this.getUserCalendarOptions();
    this.changeUserCalendarColors();
  }


  isUserLoggedIn() {
    this.isLoggedIn = this.userID !== 0;
  }

  enableDisableFields() {
    this.disableInputFields = !this.disableInputFields;
  }

  getUserInfo() {
    this.profileService.getUserProfile(this.userID).subscribe((response: User) => {
      this.userProfileInfo = response;
    },
      (error) => {
        console.log(error)
      });


    this.currentUser = {studentID: +this.cookie.get('studentID'), firstName: this.cookie.get('studentFName'), lastName: this.cookie.get('studentLName')};
    this.currentUser.firstName = this.currentUser.firstName.replace(/['"]/g, '');
    this.currentUser.lastName = this.currentUser.lastName.replace(/['"]/g, '');
  }

  getUserCalendarOptions() {
  }

  changeUserCalendarColors()
  {

    //CalendarComponent.options.eventBackgroundColor = 'blue';


  }


  disableInputField() {

  }

  updatePronouns(event: any) {
    console.log(event.target.data);

    this.profileService.changeUserPronouns(this.userID, event.target.data).subscribe((response) => {
      console.log(response);
    },
      (error) => {
        console.log(error)
      },
      () => {
        this.getUserInfo();
      });


  }

  updateUserCalendarColor(event: any)
  {
    this.profileService.changeUserCalendarColorSettings(this.UserID, )
  }

  protected readonly event = event;
}
