import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../services/user.service";
import {Login} from "../objects/login";
import {LoginReturn} from "../objects/login-return";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private cookie: CookieService) {
    this.loginForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    })
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
    })
  }

  setCookie() {
    this.cookie.set("userID", JSON.stringify(this.loginReturn));
  }
}
