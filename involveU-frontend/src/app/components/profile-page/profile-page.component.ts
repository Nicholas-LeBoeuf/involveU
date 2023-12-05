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
  ) {
  }

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
  userMajor: string;

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
      {label: 'He/Him', value: 'He/Him'},
      {label: 'She/Her', value: 'She/Her'},
      {label: 'They/Them', value: 'They/Them'}
    ]

    this.majors = [
      {label: 'Accounting', value: 'accounting'},
      {label: 'Advertising', value: 'advertising'},
      {label: 'Aeronautical Engineering', value: 'aeronautical engineering'},
      {label: 'Aviation', value: 'aviation'},
      {label: 'Biology', value: 'biology'},
      {label: 'Business', value: 'business'},
      {label: 'Chemistry', value: 'chemistry'},
      {label: 'Computer Information Systems', value: 'cis'},
      {label: 'Communications', value: 'communications'},
      {label: 'Computer Science', value: 'computer science'},
      {label: 'Criminal Justice', value: 'criminal justice'},
      {label: 'Cyber Security', value: 'cyber security'},
      {label: 'Economics', value: 'economics'},
      {label: 'Education', value: 'education'},
      {label: 'Electrical Engineering', value: 'ee'},
      {label: 'English', value: 'english'},
      {label: 'Environmental Science', value: 'environmental science'},
      {label: 'Game Design', value: 'game design'},
      {label: 'History', value: 'history'},
      {label: 'Information Technologies', value: 'it'},
      {label: 'Mathematics', value: 'mathematics'},
      {label: 'Mechanical Engineering', value: 'me'},
      {label: 'Physics', value: 'physics'},
      {label: 'Politics', value: 'politics'},
      {label: 'Psychology', value: 'psychology'},
      {label: 'Sociology', value: 'sociology'},
    ]

    if (this.responsiveService.deviceDesktop()) {
      this.numberOfRows = 2;
    } else {
      this.numberOfRows = 1;
    }
    this.loading = false;

    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  isUserLoggedIn() {
    this.isLoggedIn = this.userID !== 0;
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

  openViewChangePasswordDialog() {
    this.viewChangePasswordDialog = true;
    this.viewSettingsDialog = false;
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
            let blob = new Blob([fileData], {type: 'image/jpeg'});
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
    this.clubService.unfavoriteClub(clubID, this.userID).subscribe(response => {

      },
      error => {
        this.toastr.error('Unsuccessful Unfavorite Club Attempt', undefined, {
          positionClass: 'toast-top-center',
          progressBar: true
        });
      },
      () => {
        this.toastr.success('Successfully Unfavorited Club', undefined, {
          positionClass: 'toast-top-center',
          progressBar: true
        });
        this.getUsersFavoritedClubs();
      });
  }

  goToClubPage(clubID: number) {
    this.router.navigate(['/clubs/' + clubID]).then();
  }

  showViewMoreInfoDialog(SpecificEvent: Events) {
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

  updatePronouns(event: any) {
    const newPronouns = event.value;
    this.profileService.changeUserPronouns(this.userID, newPronouns).subscribe((response) => {
        console.log(response);
        this.toastr.success('Pronouns updates successfully!');
        this.getUserInfo();
      },
      (error) => {
        console.log(error)
      });
  }

  protected readonly open = open;

}




