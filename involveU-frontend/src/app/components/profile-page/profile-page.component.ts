import { Component, OnInit } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {User} from "../../objects/user";
import { ToastrService } from 'ngx-toastr';
import { SelectItem } from "primeng/api";
import { InputTextModule } from "primeng/inputtext";

import {ProfileService} from "../../services/profile.service";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {ResponsiveService} from "../../services/responsive.service";
import {Club} from "../../objects/club";
import {ClubService} from "../../services/club.service";
import {Router} from "@angular/router";
import {Events} from "../../objects/events";
import {EventsService} from "../../services/events.service";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  fileInputLabel: string = 'Choose File';
  userProfileImageUrl: SafeUrl | null = null;
  pronouns: SelectItem[];
  majors: SelectItem[];
  constructor(
    public cookie: CookieService,
    public profileService: ProfileService,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer,
    public responsiveService: ResponsiveService,
    private clubService: ClubService,
    private router: Router,
    private eventsService: EventsService,
  ) {}

  viewChangePasswordDialog: boolean = false;
  userCalendarColor: string;
  disableInputFields: boolean = true;
  isLoggedIn: boolean = false;
  userID: number;
  currentUser: User;
  userProfileInfo: User;
  selectedFile: File;
  userFirstName: string;
  userRSVPdEvents: Events[] = [];
  certainEvent: Events[] = [];
  viewMoreInfoDialog: boolean = false;
  loading: boolean = true;
  isLoading: boolean = true;
  numberOfRows: number;
  favoritedClubs: Club[] = [];
  viewSettingsDialog: boolean = false;

  ngOnInit(): void {
    this.isLoading = true;
    this.userID = +this.cookie.get('studentID');
    this.userFirstName = this.cookie.get('studentFName');
    this.userFirstName = this.userFirstName.replace(/['"]/g, '');
    this.isUserLoggedIn();
    this.getUserInfo();
    this.getUserCalendarOptions();
    this.changeUserCalendarColors();
    this.loadUserProfileImage();
    this.getUsersFavoritedClubs();
    /*this.getUserRSVPdEvents();*/

    this.pronouns = [
      {label: 'He/Him', value: 'he/him'},
      {label: 'She/Her', value: 'she/her'},
      {label: 'They/Them', value: 'they/them'}
    ]

    this.majors = [
      { label: 'Accounting', value: 'Accounting' },
      { label: 'Advertising', value: 'Advertising' },
      { label: 'Aeronautical Engineering', value: 'Aeronautical Engineering' },
      { label: 'Aviation', value: 'Aviation' },
      { label: 'Biology', value: 'Biology' },
      { label: 'Business', value: 'Business' },
      { label: 'Chemistry', value: 'Chemistry' },
      { label: 'Computer Information Systems', value: 'Computer Information Systems' },
      { label: 'Communications', value: 'Communications' },
      { label: 'Computer Science', value: 'Computer Science' },
      { label: 'Criminal Justice', value: 'Criminal Justice' },
      { label: 'Cyber Security', value: 'Cyber Security' },
      { label: 'Economics', value: 'Economics' },
      { label: 'Education', value: 'Education' },
      { label: 'Electrical Engineering', value: 'Electrical Engineering' },
      { label: 'English', value: 'English' },
      { label: 'Environmental Science', value: 'Environmental Science' },
      { label: 'Game Design', value: 'Game Design' },
      { label: 'History', value: 'History' },
      { label: 'Information Technologies', value: 'Information Technologies' },
      { label: 'Mathematics', value: 'Mathematics' },
      { label: 'Mechanical Engineering', value: 'Mechanical Engineering' },
      { label: 'Physics', value: 'Physics' },
      { label: 'Politics', value: 'Politics' },
      { label: 'Psychology', value: 'Psychology' },
      { label: 'Sociology', value: 'Sociology' },
    ];

    if (this.responsiveService.deviceDesktop()) {
      this.numberOfRows = 2;
    }
    else {
      this.numberOfRows = 1;
    }
    this.loading = false;

    setTimeout(() => {
      this.isLoading = false;
    },1000);
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

  updateUserCalendarColor(event: any) {
    // this.profileService.changeUserCalendarColorSettings(this.UserID, )
  }

  protected readonly event = event;

  openViewChangePasswordDialog() {
    this.viewChangePasswordDialog = true;
  }

  updateUserMajor(newMajor: string): void {
    this.profileService.changeUserMajor(this.userID, newMajor).subscribe(
      response => {
        console.log('Major updated successfully');
        this.userProfileInfo.userMajor = newMajor; // Update the major in the userProfileInfo
      },
      error => {
        console.error('Error updating major:', error);
      }
    );
  }

  updateUserBio(newBio: string): void {
    this.profileService.changeUserBio(this.userID, newBio).subscribe(
      response => {
        console.log('Bio updated successfully');
        this.userProfileInfo.userBio = newBio; // Update the bio in the userProfileInfo
      },
      error => {
        console.error('Error updating bio:', error);
      }
    );
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
      this.uploadProfilePicture();
    } else {
      this.fileInputLabel = 'Choose File';
      this.resetFileInput();
    }
  }

  updatePronouns(event: any): void {
    const newPronouns = event.value; // Assuming event.value contains the selected pronouns
    this.profileService.changeUserPronouns(this.userID, newPronouns).subscribe(
      response => {
        console.log('Pronouns updated');
        this.userProfileInfo.pronouns = newPronouns;
      },
      error => {
        console.error('Error updating pronouns:', error);
      }
    );
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

  getUsersFavoritedClubs() {
    this.clubService.getUsersFavoritedClubs(+this.cookie.get('studentID')).subscribe(response => {
        this.favoritedClubs = response;
      },
      (error) => {
        console.log(error);
      });
  }

  removeFromFavorites(clubID: number) {
    this.clubService.unfavoriteClub(clubID, this.userID).subscribe( response => {

      },
      error => {
        this.toastr.error('Unsuccessful Unfavorite Club Attempt', undefined, {positionClass: 'toast-top-center', progressBar: true});
      },
      () => {
        this.toastr.success('Successfully Unfavorited Club', undefined, {positionClass: 'toast-top-center', progressBar: true});
        this.getUsersFavoritedClubs();
      });
  }

  goToClubPage(clubID: number) {
    this.router.navigate(['/clubs/' + clubID]).then();
  }

  showViewMoreInfoDialog(SpecificEvent: Events){
    this.certainEvent.push(SpecificEvent);
    this.viewMoreInfoDialog = true;
  }

  openSettingsDialog() {
    this.viewSettingsDialog = true;
  }

  closeSettingsDialog() {
    this.viewSettingsDialog = false;
  }

  /*removeEventRSVP(eventID: number) {
    this.eventsService.removeEventRSVP(eventID, this.userID).subscribe(response => {
      },
      error => {
        console.log(error);
        this.toastr.error('Unsuccessful Remove RSVP Attempt', undefined, {positionClass: 'toast-top-center', progressBar: true});
      },
      () => {
        this.toastr.success('Successfully Removed RSVP To Event', undefined, {positionClass: 'toast-top-center', progressBar: true});
        location.reload();
      });
  }

  /*getUserRSVPdEvents() {
    this.eventsService.getUserFutureRSVPdEvents(this.userID).subscribe(response => {
      this.userRSVPdEvents = response;
      for(let i = 0; i < this.userRSVPdEvents.length; i++) {
        this.clubService.getClubLogo(this.userRSVPdEvents[i].clubID).subscribe(logo => {
          const reader = new FileReader();
          reader.onload = (e) => this.userRSVPdEvents[i].clubLogo = e.target.result;
          reader.readAsDataURL(new Blob([logo]));
          this.userRSVPdEvents[i].clubLogo = logo;
        })
      }
    })
  } */

}
