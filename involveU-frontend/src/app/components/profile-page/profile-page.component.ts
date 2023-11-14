import { Component, OnInit } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {User} from "../../objects/user";
import { DialogModule } from 'primeng/dialog';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CalendarComponent} from "../calendar/calendar.component";
import { ColorPickerModule } from 'primeng/colorpicker';

import {ProfileService} from "../../services/profile.service";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {


  constructor(public cookie: CookieService,
              public profileService: ProfileService) {
  }

  viewChangePasswordDialog: boolean = false;
  userCalendarColor: string;
  disableInputFields: boolean = true;
  isLoggedIn: boolean = false;
  userID: number;
  currentUser: User;
  userProfileInfo: User;
  selectedFile: File;

  ngOnInit(): void {
    this.userID = +this.cookie.get('studentID');
    this.isUserLoggedIn();
    this.getUserInfo();
    this.getUserCalendarOptions();
    this.changeUserCalendarColors();
  }


  isUserLoggedIn() {
    this.isLoggedIn = this.userID !== 0;
  }

  enableDisableFields() {
    this.disableInputFields = !this.disableInputFields;
  }

  getUserInfo() {
    this.profileService.getUserProfile(this.userID).subscribe((response: User) => {
        this.userProfileInfo = response;
      },
      (error) => {
        console.log(error)
      });


    this.currentUser = {
      studentID: +this.cookie.get('studentID'),
      firstName: this.cookie.get('studentFName'),
      lastName: this.cookie.get('studentLName')
    };
    this.currentUser.firstName = this.currentUser.firstName.replace(/['"]/g, '');
    this.currentUser.lastName = this.currentUser.lastName.replace(/['"]/g, '');
  }

  getUserCalendarOptions() {
  }

  changeUserCalendarColors() {

    //CalendarComponent.options.eventBackgroundColor = 'blue';


  }


  disableInputField() {

  }

  updatePronouns() {

    this.profileService.changeUserPronouns(this.userID, this.userProfileInfo.pronouns).subscribe((response) => {
        console.log(response);
      },
      (error) => {
        console.log(error)
      },
      () => {
        this.getUserInfo();
      });


  }

  changeYear() {
    this.profileService.changeUserYear(this.userID, this.userProfileInfo.year).subscribe((response: string) => {
      this.getUserInfo()
    })
  }

  updateUserCalendarColor(event: any) {
    // this.profileService.changeUserCalendarColorSettings(this.UserID, )
  }

  protected readonly event = event;

  openViewChangePasswordDialog() {
    this.viewChangePasswordDialog = true;
  }

  closeViewChangePasswordDialog() {
    this.viewChangePasswordDialog = false;
  }

  onFileSelected(event) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  uploadProfilePicture() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);

      this.profileService.uploadProfilePicture(this.userID, formData)
        .subscribe(
          () => {
            console.log('Profile picture uploaded!');
          },
          error => {
            console.error("Error during upload:", error);
          }
        );
    } else {
      console.log('No file selected');
    }
  }
}
