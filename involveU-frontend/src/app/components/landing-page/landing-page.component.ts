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

  imageArray = ["img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg", "img5.jpg", "img6.jpg", "img7.jpg", "img8.jpg"];

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
