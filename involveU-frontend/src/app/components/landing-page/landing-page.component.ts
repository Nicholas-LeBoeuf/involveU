import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../objects/user";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  public users: User[] = [];
  constructor(private userService: UserService,
              public cookie: CookieService) { }

  imageArray = ["involveU-image1.jpg", "involveU-image2.jpg", "involveU-image3.jpg", "involveU-image4.jpg", "involveU-image5.jpg"];

  currentUser: User = {studentID: -1, firstName: '', lastName: ''};

  ngOnInit(): void {
    this.fillUserInfo();
  }

  ngAfterViewInit(): void {
    this.loadUserTable();
  }

  loadUserTable() {
    this.userService.getUsers().subscribe((data: User[]) => {
      this.users = data;
    });
  }

  fillUserInfo() {
    this.currentUser = {studentID: +this.cookie.get('studentID'), firstName: this.cookie.get('studentFName'), lastName: this.cookie.get('studentLName')};
    this.currentUser.firstName = this.currentUser.firstName.replace(/['"]/g, '');
    this.currentUser.lastName = this.currentUser.lastName.replace(/['"]/g, '');
  }

}
