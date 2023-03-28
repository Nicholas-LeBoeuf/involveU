import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../services/user.service";
import {CookieService} from "ngx-cookie-service";
import {User} from "../objects/user";
import {Email} from "../objects/email"
import {ClubService} from "../services/club.service";
import {Router} from "@angular/router";
import {MenuItem} from 'primeng/api';
import {ContextMenu} from 'primeng/contextmenu';
import {ResponsiveService} from "../services/responsive.service";
import { SHA256, enc } from "crypto-js";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  loginForm: FormGroup;
  signupForm: FormGroup;
  forgotPasswordForm: FormGroup;
  verificationForm: FormGroup;
  changePasswordForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              public cookie: CookieService,
              private clubService: ClubService,
              private router: Router,
              private toastr: ToastrService,
              public responsiveService: ResponsiveService) {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['',  Validators.required, Validators.minLength(8)],
      pronouns: ['', Validators.required]
    });

    this.forgotPasswordForm = this.formBuilder.group({
      email:['', Validators.required]
    });

    this.verificationForm = this.formBuilder.group({
      verificationCode: ['', Validators.required]
    });

    this.changePasswordForm = this.formBuilder.group({
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  //BOOLEANS
  isEboard: boolean = false;
  isLoggedIn: boolean = false;
  displayLoginDialog: boolean = false;
  displaySignupDialog: boolean = false;
  displayForgotPassDialog: boolean = false;
  displayVerificationDialog: boolean = false;
  displayChangePasswordDialog: boolean = false;

  //NUMBERS
  userID: number;
  securityToken: number;

  //STRINGS
  title: string = 'involveU';
  statusMessage: string;

  //OBJECTS or ARRAYS
  loggedInUser: User;
  usersEboardInfo: any;
  yearNames = [
    { yearName: 'Freshman' },
    { yearName: 'Sophomore' },
    { yearName: 'Junior' },
    { yearName: 'Senior' },
    { yearName: 'Faculty' },
  ]

  //FORM CONTROLS
  yearNameFC: FormControl = new FormControl(null, Validators.required);

  ngOnInit(): void {
    this.userID = +this.cookie.get('studentID');
    this.checkIfUserInEboard();
    this.isUserLoggedIn();
  }

  private prevContextMenu!: ContextMenu;

  public profileContextMenuItems: MenuItem[] = [
    {
      label: 'Logout',
      command: () => {
        this.logoutUser();
      }
    }
  ]

  showLoginDialog() {
    this.displayLoginDialog = true;
  }

  showSignupDialog() {
    this.displaySignupDialog = true;
  }

  showForgotPassDialog() {
    this.displayForgotPassDialog = true;
    this.displayLoginDialog = false;
  }

  showChangePasswordDialog() {
    this.displayChangePasswordDialog = true;
  }

  onLoginSubmit() {

    const hashedPass = SHA256(this.loginForm.value.password).toString(enc.Hex);

    this.userService.checkLoginCredentials(this.loginForm.value.username, hashedPass).subscribe((response: User) => {
      this.loggedInUser = response;
    },
      error => {
        this.toastr.error('Unsuccessful Login Attempt', undefined, {positionClass: 'toast-top-center', progressBar: true});
      },
      () => {
        this.toastr.success('Successfully Logged In', undefined, {positionClass: 'toast-top-center', progressBar: true});

        this.setCookie();
        this.displayLoginDialog = false;
        location.reload();
      });
  }

  onSignupSubmit() {
    const userInfo: User = { firstName: this.signupForm.value.firstName, lastName: this.signupForm.value.lastName, year: this.yearNameFC.value, email: this.signupForm.value.email, pronouns: this.signupForm.value.pronouns, isAdmin: 0, isEboard: 0, userPassword: this.signupForm.value.password};

    this.userService.signupNewUser(userInfo).subscribe(success =>{

    },
      error => {
        this.toastr.error('Create Account Unsuccessful', undefined, {positionClass: 'toast-top-center', progressBar: true});
      },
      () => {
        this.toastr.success('Successfully Created Account', undefined, {positionClass: 'toast-top-center', progressBar: true});
        this.displaySignupDialog = false;
        this.signupForm.reset();
        this.yearNameFC.reset();
      });
  }

  logoutUser() {
    this.cookie.delete('studentID');
    this.cookie.delete('studentFName');
    this.cookie.delete('studentLName');
    this.cookie.delete('isAdmin');
    this.cookie.delete('isEboard');
    this.usersEboardInfo = {};
    this.isEboard = false;
    this.isLoggedIn = false;

    this.router.navigateByUrl('/home').then(nav => {
      console.log(nav); // true if navigation is successful
    }, err => {
      console.log(err) // when there's an error
    });

    this.toastr.success('Successfully Logged Out', undefined, {positionClass: 'toast-top-center', progressBar: true});
  }

  get signupFormInputs() {
    return this.signupForm.controls;
  }

  get loginFormInputs() {
    return this.loginForm.controls;
  }

  setCookie() {
    this.cookie.set("studentID", JSON.stringify(this.loggedInUser.studentID));
    this.cookie.set("studentFName", JSON.stringify(this.loggedInUser.firstName));
    this.cookie.set("studentLName", JSON.stringify(this.loggedInUser.lastName));
    this.cookie.set("isAdmin", JSON.stringify(this.loggedInUser.isAdmin));
    this.cookie.set("isEboard", JSON.stringify(this.loggedInUser.isEboard));
  }

  onLoginClickFromSignupModal() {
    this.displaySignupDialog = false;
    this.displayLoginDialog = true;
    this.ngOnInit();
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

  closeForgotPassDialog() {
    this.displayForgotPassDialog = false;
  }

  closeVerificationDialog() {
    this.displayVerificationDialog = false;
  }

  closeChangePasswordDialog() {
    this.displayChangePasswordDialog = false;
  }

  activateContextMenu(contextMenu: ContextMenu, event: MouseEvent, xOffset: number = -20, yOffset: number = 50) {
    this.prevContextMenu?.hide();
    event.stopPropagation();
    contextMenu.show(new MouseEvent(event.type,
      { 'view': window, 'bubbles': true, 'cancelable': true, 'clientX': event.clientX-event.offsetX+xOffset, 'clientY': event.clientY-event.offsetY+yOffset}
    ));
    this.prevContextMenu = contextMenu;
  }

  checkIfUserInEboard() {
    this.clubService.checkIfEboard(this.userID).subscribe(response => {
      if (response === "not eboard") {
        this.isEboard = false;
      }
      else {
        this.isEboard = true;
        this.usersEboardInfo = response;
      }
    },
      (error) => {
        console.log(error);
      })
  }

  sendForgotPassEmail() {
    this.generateRandomNum();
    this.userService.sendEmail(this.forgotPasswordForm.value.email, this.securityToken).subscribe(response => {
    },
      (error) => {
        if(error.status === 200)
        {
          this.toastr.success('Sent Email Successfully', undefined, {positionClass: 'toast-top-center', progressBar: true});
          this.displayVerificationDialog = true;
          this.displayForgotPassDialog = false;
        }
        else
        {
          this.toastr.error('Email not found', undefined, {positionClass: 'toast-top-center', progressBar: true});
        }
        },
      () => {

      })
  }

  generateRandomNum() {
    this.securityToken = Math.floor(100000 + Math.random() * 900000);
  }

  checkVerificationCodeMatch() {
    if(this.securityToken === +this.verificationForm.value.verificationCode){
      this.toastr.success('Verification code matches', undefined, {positionClass: 'toast-top-center', progressBar: true});
      this.displayVerificationDialog = false;
      this.displayChangePasswordDialog = true;
    }
    else{
      this.toastr.error('Codes do not match', undefined, {positionClass: 'toast-top-center', progressBar: true});
    }
  }

  changePassword() {
    const hashedPass = SHA256(this.changePasswordForm.value.newPassword).toString(enc.Hex);
    const confirmHashedPass = SHA256(this.changePasswordForm.value.confirmPassword).toString(enc.Hex);
    if(hashedPass === confirmHashedPass) {
      this.userService.changePassword(this.forgotPasswordForm.value.email ,hashedPass).subscribe(response => {

      })
      this.displayChangePasswordDialog = false;
      this.displayLoginDialog = true;
      this.toastr.success('Password has been changed', undefined, {positionClass: 'toast-top-center', progressBar: true});
    }
    else {
      this.toastr.error('Passwords do not match', undefined, {positionClass: 'toast-top-center', progressBar: true});
    }
  }

  isUserLoggedIn() {
    this.isLoggedIn = this.userID !== 0;
  }

  isSignupValid() {
    if (this.signupForm.value.firstName === '' || this.signupForm.value.lastName === '' || this.signupForm.value.email === '' || this.signupForm.value.password === '' || this.yearNameFC.value === null || this.signupForm.value.pronouns === '') {
      return true;
    }
    else {
      return false;
    }
  }

  isLoginValid() {
    if (this.loginForm.value.username === '' || this.loginForm.value.password === '') {
      return true;
    }
    else {
      return false;
    }
  }
}
