import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {UserService} from "../services/user.service";
import {Login} from "../objects/login";
import {LoginReturn} from "../objects/login-return";
import {CookieService} from "ngx-cookie-service";
import {User} from "../objects/user";
import {ButtonModule} from "primeng/button";
import { Router } from '@angular/router';
import {Club} from "../objects/club";
import {ClubService} from "../services/club.service";

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
              private cookie: CookieService,
              private router: Router,
              private clubService: ClubService) {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      password: ['',  Validators.required, Validators.minLength(8)],
      year: ['', Validators.required],
      pronouns: ['', Validators.required]

    });
  }

  title = 'involveU';
  displayLoginDialog: boolean = false;
  displaySignupDialog: boolean = false;
  isLoggedIn: boolean = false;

  userID: number = 0;

  loginReturn: LoginReturn = new class implements LoginReturn {
    userID: string = "";
  };
  ngOnInit(): void{
    const clubInfo: Club = { ownerID: 1, clubName: 'Environmental Club', clubAffiliation: 'SGA', clubBio: 'Your mom', clubVision: 'Plant Trees', clubLogo: 'Paul LeBlanc EV Car', clubAdvisor: 2}

    this.clubService.insertNewClub(clubInfo).subscribe(success => {
      console.log(success);
    }, error => {
      console.log(error);
    });
  }
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

    this.userService.signupNewUser(userInfo).subscribe(success =>{
      console.log(success);
    }, error => {
      console.log(error);

    });

    this.displaySignupDialog = false;

  }

  get signupFormInputs() {
    return this.signupForm.controls;
  }

  get loginFormInputs() {
    return this.loginForm.controls;
  }

  setCookie() {
    this.cookie.set("userID", JSON.stringify(this.loginReturn));
  }

  onLoginClickFromSignupModal() {
    this.displaySignupDialog = false;
    this.displayLoginDialog = true;
  }

  onSignupClickFromLoginModal() {
    this.displayLoginDialog = false;
    this.displaySignupDialog = true;
  }

  closeSignupDialog() {
    this.displaySignupDialog = false;
  }
  closeLoginDialog() {
    this.displayLoginDialog = false;
  }


}
