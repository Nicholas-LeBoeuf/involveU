import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../services/user.service";
import {Login} from "../objects/login";
import {LoginReturn} from "../objects/login-return";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService) {
    this.loginForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    })
  }

  title = 'involveU';
  displayLoginDialog: boolean = false;
  displaySignupDialog: boolean = false;

  loginReturn: LoginReturn = new class implements LoginReturn {
    httpResponseMessage: string = "";
    userID: string = "";
  };

  loginValues: Login = new class implements Login {
    id: string = "";
    username: string = "";
    password: string = "";
  };


  showLoginDialog() {
    this.displayLoginDialog = true;
  }

  showSignupDialog() {
    this.displaySignupDialog = true;
  }

  onLoginSubmit() {
    this.userService.checkLoginCredentials(this.loginForm.value.username, this.loginForm.value.password).subscribe((data: LoginReturn) => {
      this.loginReturn = data;
      console.log(data);
    })
  }
}
