import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../objects/user";
import {CookieService} from "ngx-cookie-service";
import {Events} from "../../objects/events";
import {EventsService} from "../../services/events.service";
import {ResponsiveService} from "../../services/responsive.service";
import {AnnouncementsService} from "../../services/announcements.service";
import {Announcement} from "../../objects/announcements";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  constructor(private userService: UserService,
              private eventsService: EventsService,
              private announcementsService: AnnouncementsService,
              public responsiveService: ResponsiveService,
              public cookie: CookieService) { }

  //BOOLEANS
  viewMoreInfoDialog: boolean = false;
  showMore: boolean = false;
  isLoading: boolean = true;
  isLoggedIn: boolean = false;
  successMessage: boolean = false;
  failMessage: boolean = false;

  //NUMBERS
  userID: number;
  numberOfRows: number;

  //STRINGS
  message: string;

  //OBJECTS or ARRAYS
  imageArray = ["img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg", "img5.jpg", "img6.jpg", "img7.jpg", "img8.jpg"];
  currentUser: User;
  todaysEvents: Events[] = [];
  certainEvent: Events[] = [];
  osiAnnouncements: Announcement[] =[];
  userRSVPdEvents: Events[] = [];

  ngOnInit(): void {
    this.isLoading = true;
    this.userID = +this.cookie.get('studentID');

    this.isUserLoggedIn();
    this.getUserInfo();
    this.getTodaysEvents();
    this.getOSIAnnouncements();
    this.getUserRSVPdEvents();

/*
    if (this.responsiveService.deviceDesktop()) {
      this.isDesktop= true;
      this.isMobileOrTablet = false;
    }
    else {
      this.isMobileOrTablet = true;
      this.isDesktop = false;
    }
*/

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
      console.log(response);
    })
  }

  removeEventRSVP(eventID: number) {
    this.eventsService.removeEventRSVP(eventID, this.userID).subscribe(response => {
      console.log(response);

    })

    this.message = "Successfully Removed RSVP!";
    this.successMessage = true;
    location.reload();
  }
}
