import { Component, OnInit } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {User} from "../../objects/user";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CalendarComponent} from "../calendar/calendar.component";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {


  constructor(public cookie: CookieService) {
  }

  ngOnInit(): void {
    this.userID = +this.cookie.get('studentID');
    this.isUserLoggedIn();
    this.getUserInfo();
    this.getUserCalendarOptions();
    this.changeUserCalendarColors();
  }

  isLoggedIn: boolean = false;
  userID: number;
  currentUser: User;


  isUserLoggedIn() {
    this.isLoggedIn = this.userID !== 0;
  }

  getUserInfo() {
    this.currentUser = {studentID: +this.cookie.get('studentID'), firstName: this.cookie.get('studentFName'), lastName: this.cookie.get('studentLName')};
    this.currentUser.firstName = this.currentUser.firstName.replace(/['"]/g, '');
    this.currentUser.lastName = this.currentUser.lastName.replace(/['"]/g, '');
  }

  getUserCalendarOptions()
  {
    


  }
  changeUserCalendarColors()
  {

    //CalendarComponent.options.eventBackgroundColor = 'blue';


  }


  disableInputField() {

  }

}
