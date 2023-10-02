import { Component, OnInit } from '@angular/core';
import {CookieService} from "ngx-cookie-service";

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
  }

  isLoggedIn: boolean = false;
  userID: number;

  isUserLoggedIn() {
    this.isLoggedIn = this.userID !== 0;
  }

}
