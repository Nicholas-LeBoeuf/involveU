import { Component, OnInit } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {User} from "../../objects/user";
import { DialogModule } from 'primeng/dialog';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CalendarComponent} from "../calendar/calendar.component";
import { ColorPickerModule } from 'primeng/colorpicker';
import { ToastrService } from 'ngx-toastr';

import {ProfileService} from "../../services/profile.service";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  fileInputLabel: string = 'Choose File';
  userProfileImageUrl: SafeUrl | null = null;
  constructor(
    public cookie: CookieService,
    public profileService: ProfileService,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer
  ) {}

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
    this.loadUserProfileImage();
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

  onFileSelected(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList && fileList.length > 0) {
      this.selectedFile = fileList[0];
      this.fileInputLabel = this.selectedFile.name;
    } else {
      this.fileInputLabel = 'Choose File';
      this.resetFileInput();
    }
  }

  uploadProfilePicture() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);

      this.profileService.uploadProfilePicture(this.userID, formData)
        .subscribe(
          response => {
            console.log('Profile picture uploaded!');
            this.toastr.success('Your photo has been successfully uploaded!');
            this.resetFileInput();

            // Reset the file input and label after successful upload
            this.resetFileInput();
            this.fileInputLabel = 'Choose File';
          },
          error => {
            console.error("Error during upload:", error);
            this.toastr.error('There was an error uploading your photo.');
          }
        );
    } else {
      console.log('No file selected');
      this.toastr.warning('Please select a file to upload.');
    }
  }

  private resetFileInput() {
    let fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
      this.selectedFile = null;
      this.fileInputLabel = 'Choose File';
    }
  }

  loadUserProfileImage() {
    if (this.userID) {
      this.profileService.downloadUserProfilePicture(this.userID)
        .subscribe(
          fileData => {
            // If the response is an ArrayBuffer, you need to convert it to a Blob
            let blob = new Blob([fileData], { type: 'image/jpeg' });
            let objectURL = URL.createObjectURL(blob);
            this.userProfileImageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          },
          error => {
            console.error("Error loading user profile image:", error);
          }
        );
    }
  }
}
