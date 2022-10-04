import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../services/user.service";
import {Login} from "../objects/login";
import {LoginReturn} from "../objects/login-return";
import {CookieService} from "ngx-cookie-service";
import {User} from "../objects/user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  loginForm: FormGroup;
  signupForm: FormGroup;


  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private cookie: CookieService) {
    this.loginForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    });

    this.signupForm = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      year: new FormControl(),
      pronouns: new FormControl()
    });
  }

  title = 'involveU';
  displayLoginDialog: boolean = false;
  displaySignupDialog: boolean = false;

  userID: number = 0;

  loginReturn: LoginReturn = new class implements LoginReturn {
    userID: string = "";
  };

  showLoginDialog() {
    this.displayLoginDialog = true;
  }

  showSignupDialog() {
    this.displaySignupDialog = true;
  }

  onLoginSubmit() {
    this.userService.checkLoginCredentials(this.loginForm.value.username, this.loginForm.value.password).subscribe((response: any) => {
      this.loginReturn = response;

      this.setCookie();
      this.displayLoginDialog = false;
    })
  }

  onSignupSubmit() {
    const userInfo: User = { firstName: this.signupForm.value.firstName, lastName: this.signupForm.value.lastName, year: this.signupForm.value.year, email: this.signupForm.value.email, pronouns: this.signupForm.value.pronouns, isAdmin: 0, isEboard: 0, userPassword: this.signupForm.value.password}

    this.userService.signupNewUser(userInfo).subscribe();
  }

  setCookie() {
    this.cookie.set("userID", JSON.stringify(this.loginReturn));
  }
}
