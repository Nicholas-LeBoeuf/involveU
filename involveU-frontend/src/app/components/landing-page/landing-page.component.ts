import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../objects/user";
import {CookieService} from "ngx-cookie-service";
import {Events} from "../../objects/events";
import {EventsService} from "../../services/events.service";
import {ResponsiveService} from "../../services/responsive.service";
import {AnnouncementsService} from "../../services/announcements.service";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  public users: User[] = [];
  constructor(private userService: UserService,
              private eventsService: EventsService,
              private announcementsService: AnnouncementsService,
              public responsiveService: ResponsiveService,
              public cookie: CookieService) { }

  imageArray = ["img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg", "img5.jpg", "img6.jpg", "img7.jpg", "img8.jpg"];

  currentUser: User;
  userID: number;
  todaysEvents: Events[] = [];
  certainEvent: Events[] = [];
  osiAnnouncements: any;
  viewMoreInfoDialog: boolean = false;
  showMore = false;
  numberOfRows: number;
  isLoading: boolean = true;
  isLoggedIn: boolean = false;
  message: string;
  successMessage: boolean = false;
  failMessage: boolean = false;
  userRSVPdEvents: Events[] = [];

  ngOnInit(): void {
    this.isLoading = true;
    this.userID = +this.cookie.get('studentID');
    this.isUserLoggedIn();
    this.fillUserInfo();
    this.fillTodaysEvents();
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

  ngAfterViewInit(): void {
  }

  isUserLoggedIn() {
    this.isLoggedIn = this.userID !== 0;
  }

  fillUserInfo() {
    this.currentUser = {studentID: +this.cookie.get('studentID'), firstName: this.cookie.get('studentFName'), lastName: this.cookie.get('studentLName')};
    this.currentUser.firstName = this.currentUser.firstName.replace(/['"]/g, '');
    this.currentUser.lastName = this.currentUser.lastName.replace(/['"]/g, '');
  }

  fillTodaysEvents() {
    this.eventsService.getTodaysEvents().subscribe((data: Events[]) => {
      this.todaysEvents = data;
    })
  }

  getUserRSVPdEvents() {
    this.eventsService.getUserRSVPdEvents(this.userID).subscribe(response => {
      this.userRSVPdEvents = response;
    })
  }

  eventRSVP(eventID: number) {
    this.eventsService.rsvpToEvent(eventID, this.userID).subscribe(response => {
      console.log(response);
    })
  }

  showViewMoreInfoDialog(SpecificEvent: Events){
    this.certainEvent.push(SpecificEvent);
    this.viewMoreInfoDialog = true;
  }

  closeViewMoreInfoDialog(){
    this.certainEvent = [];
    this.viewMoreInfoDialog = false;
  }

  getOSIAnnouncements() {
    this.announcementsService.getClubAnnouncements(275).subscribe(response => {
        this.osiAnnouncements = response;
      },
      (error) => {
        console.log(error)
      });
  }

  isUserRSVPd(eventID: number): boolean {
    return this.userRSVPdEvents.some(event => event.eventID === eventID);
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
