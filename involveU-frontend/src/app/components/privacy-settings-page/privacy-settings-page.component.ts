import { Component, OnInit } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {User} from "../../objects/user";

@Component({
  selector: 'app-privacy-settings-page',
  templateUrl: './privacy-settings-page.component.html',
  styleUrls: ['./privacy-settings-page.component.scss']
})
export class PrivacySettingsPageComponent implements OnInit {

  constructor(public cookie: CookieService) { }

  ngOnInit(): void {
    this.userID = +this.cookie.get('studentID');
    this.isUserLoggedIn();
    this.getUserInfo();
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


}
