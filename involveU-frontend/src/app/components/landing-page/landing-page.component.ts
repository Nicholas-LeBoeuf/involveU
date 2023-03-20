import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../objects/user";
import {CookieService} from "ngx-cookie-service";
import {Events} from "../../objects/events";
import {EventsService} from "../../services/events.service";
import {ResponsiveService} from "../../services/responsive.service";
import {AnnouncementsService} from "../../services/announcements.service";
import {Announcement} from "../../objects/announcements";
import {Title} from "@angular/platform-browser";
import {ClubService} from "../../services/club.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  constructor(private userService: UserService,
              private eventsService: EventsService,
              private clubService: ClubService,
              private announcementsService: AnnouncementsService,
              public responsiveService: ResponsiveService,
              public cookie: CookieService,
              private title: Title,
              private toastr: ToastrService) {
    this.title.setTitle("involveU")
  }

  //BOOLEANS
  viewMoreInfoDialog: boolean = false;
  showMore: boolean = false;
  isLoading: boolean = true;
  isLoggedIn: boolean = false;
  viewCertainAnnouncementDialog: boolean = false;

  //NUMBERS
  userID: number;
  numberOfRows: number;

  //STRINGS

  //OBJECTS or ARRAYS
  imageArray = ["img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg", "img5.jpg", "img6.jpg", "img7.jpg", "img8.jpg", "img9.jpg", "img10.jpg", "img11.jpg", "img12.jpg", "img13.jpg", "img14.jpg", "img15.jpg"];
  currentUser: User;
  todaysEvents: Events[] = [];
  certainEvent: Events[] = [];
  osiAnnouncements: Announcement[] =[];
  userRSVPdEvents: Events[] = [];
  certainAnnouncement: Announcement[] = [];

  ngOnInit(): void {
    this.imageArray = this.shuffleArray(this.imageArray);
    this.isLoading = true;
    this.userID = +this.cookie.get('studentID');

    this.isUserLoggedIn();
    this.getUserInfo();
    this.getTodaysEvents();
    this.getOSIAnnouncements();
    this.getUserRSVPdEvents();

    if (this.responsiveService.deviceDesktop()) {
      this.numberOfRows = 2;
    }
    else {
      this.numberOfRows = 1;
    }

    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  isUserLoggedIn() {
    this.isLoggedIn = this.userID !== 0;
  }

  getUserInfo() {
    this.currentUser = {studentID: +this.cookie.get('studentID'), firstName: this.cookie.get('studentFName'), lastName: this.cookie.get('studentLName')};
    this.currentUser.firstName = this.currentUser.firstName.replace(/['"]/g, '');
    this.currentUser.lastName = this.currentUser.lastName.replace(/['"]/g, '');
  }

  getTodaysEvents() {
    this.eventsService.getTodaysEvents().subscribe((data: Events[]) => {
      this.todaysEvents = data;
      for(let i = 0; i < this.todaysEvents.length; i++) {
        this.clubService.getClubLogo(this.todaysEvents[i].clubID).subscribe(logo => {
          const reader = new FileReader();
          reader.onload = (e) => this.todaysEvents[i].clubLogo = e.target.result;
          reader.readAsDataURL(new Blob([logo]));
          this.todaysEvents[i].clubLogo = logo;
        })
      }
    })
  }

  getOSIAnnouncements() {
    this.announcementsService.getClubAnnouncements(275).subscribe(response => {
        this.osiAnnouncements = response;
      },
      (error) => {
        console.log(error)
      });
  }

  getUserRSVPdEvents() {
    this.eventsService.getUserRSVPdEvents(this.userID).subscribe(response => {
      this.userRSVPdEvents = response;
    })
  }

  isUserRSVPd(eventID: number): boolean {
    return this.userRSVPdEvents.some(event => event.eventID === eventID);
  }

  showViewMoreInfoDialog(SpecificEvent: Events){
    this.certainEvent.push(SpecificEvent);
    this.viewMoreInfoDialog = true;
  }

  closeViewMoreInfoDialog(){
    this.certainEvent = [];
    this.viewMoreInfoDialog = false;
  }

  eventRSVP(eventID: number) {
    this.eventsService.rsvpToEvent(eventID, this.userID).subscribe(response => {

    },
      error => {
        this.toastr.error('Unsuccessful RSVP Attempt', undefined, {positionClass: 'toast-top-center', progressBar: true});
      },
      () => {
        this.toastr.success('Successfully RSVPd To Event', undefined, {positionClass: 'toast-top-center', progressBar: true});
        location.reload();
      });
  }

  removeEventRSVP(eventID: number) {
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

  showViewCertainAnnouncementDialog(announcement: Announcement) {
    this.certainAnnouncement.push(announcement);
    this.viewCertainAnnouncementDialog = true;
  }

  closeViewCertainAnnouncementDialog() {
    this.certainAnnouncement = [];
    this.viewCertainAnnouncementDialog = false;
  }

  shuffleArray(array) {
    let size = array.length, temp, i;

    while (size) {
      i = Math.floor(Math.random() * size--);
      temp = array[size];
      array[size] = array[i];
      array[i] = temp;
    }

    return array;
  }
}
