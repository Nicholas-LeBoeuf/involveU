import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../services/user.service";
import {CookieService} from "ngx-cookie-service";
import {User} from "../objects/user";
import {ClubService} from "../services/club.service";
import {Router} from "@angular/router";
import {MenuItem} from 'primeng/api';
import {ContextMenu} from 'primeng/contextmenu';

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
              public cookie: CookieService,
              private clubService: ClubService,
              private router: Router) {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['',  Validators.required, Validators.minLength(8)],
      year: ['', Validators.required],
      pronouns: ['', Validators.required]

    });
  }

  title = 'involveU';
  displayLoginDialog: boolean = false;
  displaySignupDialog: boolean = false;

  loggedInMessage: boolean = false;
  loggedInFailedMessage: boolean = false;
  signUpMessage: boolean = false;
  signUpFailMessage: boolean = false;

  loggedInUser: User = new class implements User {
    email: string = "";
    firstName: string = "";
    isAdmin: number = -1;
    isEboard: number = -1;
    lastName: string = "";
    pronouns: string = "";
    studentID: number = -1;
    userPassword: string = "";
    year: string = "";
  };

  ngOnInit(): void {
  }

  private prevContextMenu!: ContextMenu;

  public profileContextMenuItems: MenuItem[] = [
    {
      label: 'Logout',
      command: () => {
        this.cookie.delete('studentID');
        this.cookie.delete('studentFName');
        this.cookie.delete('studentLName');
        this.cookie.delete('isAdmin');
        this.cookie.delete('isEboard');

        location.reload();
      }
    }
  ]

  public adminContextMenuItems: MenuItem[] = [
    {
      label: 'Create Clubs',
      command: (router: Router) => {
        this.router.navigateByUrl('admin/createClub').then(nav => {
          console.log(nav); // true if navigation is successful
        }, err => {
          console.log(err) // when there's an error
        });;
      }
    },
    {
      label: 'Create/Delete Users'
    },
    {
      label: 'Assign/Remove Advisors',
      command: (router: Router) => {
        this.router.navigateByUrl('admin/assignRemoveAdvisor').then(nav => {
          console.log(nav); // true if navigation is successful
        }, err => {
          console.log(err) // when there's an error
        });;
      }
    },
    {
      label: 'Assign/Remove EBoard',
      command: (router: Router) => {
        this.router.navigateByUrl('admin/addRemoveEBoard').then(nav => {
          console.log(nav); // true if navigation is successful
        }, err => {
          console.log(err) // when there's an error
        });;
      }
    }
  ]

  showLoginDialog() {
    this.displayLoginDialog = true;
  }

  showSignupDialog() {
    this.displaySignupDialog = true;
  }

  onLoginSubmit() {
    this.userService.checkLoginCredentials(this.loginForm.value.username, this.loginForm.value.password).subscribe((response: User) => {
      this.loggedInUser = response;

      this.setCookie();
      this.displayLoginDialog = false;
      location.reload();
      this.loggedInMessage = true;
    },
      (error) => {
      this.loggedInFailedMessage = true;
      });
  }

  onSignupSubmit() {
    const userInfo: User = { firstName: this.signupForm.value.firstName, lastName: this.signupForm.value.lastName, year: this.signupForm.value.year, email: this.signupForm.value.email, pronouns: this.signupForm.value.pronouns, isAdmin: 0, isEboard: 0, userPassword: this.signupForm.value.password};

    this.userService.signupNewUser(userInfo).subscribe(success =>{
      this.displaySignupDialog = false;
      this.signUpMessage = true;
    },
      (error) => {
      this.signUpFailMessage = true;
    });
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

  activateContextMenu(contextMenu: ContextMenu, event: MouseEvent, xOffset: number = -20, yOffset: number = 50) {
    this.prevContextMenu?.hide();
    event.stopPropagation();
    contextMenu.show(new MouseEvent(event.type,
      { 'view': window, 'bubbles': true, 'cancelable': true, 'clientX': event.clientX-event.offsetX+xOffset, 'clientY': event.clientY-event.offsetY+yOffset}
    ));
    this.prevContextMenu = contextMenu;
  }
}
