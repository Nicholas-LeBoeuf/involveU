import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ClubService} from "../../services/club.service";
import {Club} from "../../objects/club";
import {CookieService} from "ngx-cookie-service";
import {Events} from "../../objects/events";
import {User} from "../../objects/user";
import {EventsService} from "../../services/events.service";
import {FormBuilder} from "@angular/forms";
import {Table} from "primeng/table";
import {EboardService} from "../../services/eboard.service";
import {AnnouncementsService} from "../../services/announcements.service";
import {Announcement} from "../../objects/announcements";
import {ResponsiveService} from "../../services/responsive.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-specific-club-page',
  templateUrl: './specific-club-page.component.html',
  styleUrls: ['./specific-club-page.component.scss']
})
export class SpecificClubPageComponent implements OnInit {

  constructor(private clubService: ClubService,
              private eventsService: EventsService,
              private eboardService: EboardService,
              public responsiveService: ResponsiveService,
              private announcementsService: AnnouncementsService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              public cookie: CookieService,
              private title: Title) {
    this.title.setTitle("involveU | Club")
  }

  //BOOLEANS
  isLoggedIn: boolean = false;
  clubIsFav: boolean = false;
  isEboard: boolean = false;
  successMessage: boolean = false;
  failMessage: boolean = false;
  viewMoreInfoDialog: boolean = false;
  showMore: boolean = false;
  isLoading: boolean = true;

  //NUMBERS
  clubID: number;
  userID: number;
  numberOfRows: number;

  //STRINGS
  message: string;

  //OBJECTS
  clubInfo: Club;
  favoritedClubs: Club[] = [];
  clubEboard: User[] = [];
  clubEvents: Events[] = [];
  certainEvent: Events[] = [];
  userRSVPdEvents: Events[] = [];
  clubAnnouncements: Announcement[] = [];

  @ViewChild('clubEventTable') clubEventTable: Table;


  ngOnInit(): void {
    this.isLoading = true;

    this.route.params.subscribe(params => {
      this.clubID = params['id'];
    });

    this.userID = +this.cookie.get('studentID');

    if (this.responsiveService.deviceDesktop()) {
      this.numberOfRows = 2;
    }
    else {
      this.numberOfRows = 1;
    }

    this.getClubEvents();
    this.isUserLoggedIn();
    this.getClubInfo();
    this.getUsersFavoritedClubs();
    this.getEboard();
    this.getUserRSVPdEvents();
    this.getClubAnnouncements();

    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  isUserLoggedIn() {
    this.isLoggedIn = this.userID !== 0;
  }

  getClubInfo() {
    this.clubService.getSpecificClub(this.clubID).subscribe(response => {
      this.clubInfo = response;
    })
  }

  getUsersFavoritedClubs() {
    this.clubService.getUsersFavoritedClubs(+this.cookie.get('studentID')).subscribe(response => {
        this.favoritedClubs = response;
        this.isClubFavorited();
      },
      (error) => {
        console.log(error);
      })
  }

  isClubFavorited() {
    for (let i = 0; i < this.favoritedClubs.length; i++ ) {
      if (this.favoritedClubs[i].clubID === +this.clubID)
      {
        this.clubIsFav = true;
      }
    }
  }

  favoriteClub() {
    this.clubService.favoriteClub(this.userID, this.clubID).subscribe()
    this.message = 'Club successfully favorited!';
    this.successMessage = true;
    location.reload();
  }

  removeFromFavorites() {
    this.clubService.unfavoriteClub(this.clubID, this.userID).subscribe()
    this.message = 'Club successfully unfavorited!';
    this.successMessage = true;
    location.reload();
  }

  getClubEvents() {
    this.eventsService.getSpecificClubEvents(this.clubID).subscribe(response => {
      this.clubEvents = response;
    })
  }

  getEboard()
  {
    this.clubService.getClubEboard(this.clubID).subscribe(response => {
      this.clubEboard = response;
    })
  }
  isInEboard()
  {
    //console.log(arr.find(e => e.foo === 'bar'))
    let studentID : number = +this.cookie.get('userID');
    //console.log("Boolean value:", array1.includes(44));
    if(this.clubEboard.some(e => e.studentID === this.userID)=== false)
    {
      return false;
    }
    else
    {
     return true;
    }
  }

  showViewMoreInfoDialog(SpecificEvent: Events){
    this.certainEvent.push(SpecificEvent);
    this.viewMoreInfoDialog = true;
  }

  closeViewMoreInfoDialog(){
    this.certainEvent = [];
    this.viewMoreInfoDialog = false;
  }

  getUserRSVPdEvents() {
    this.eventsService.getUserRSVPdEvents(this.userID).subscribe(response => {
      this.userRSVPdEvents = response;
    })
  }

  isUserRSVPd(eventID: number): boolean {
    return this.userRSVPdEvents.some(event => event.eventID === eventID);
  }

  eventRSVP(eventID: number) {
    this.eventsService.rsvpToEvent(eventID, this.userID).subscribe(response => {
      console.log(response);

    })

    this.message = "Event Successfully RSVPd!";
    this.successMessage = true;
    location.reload();
  }

  removeEventRSVP(eventID: number) {
    this.eventsService.removeEventRSVP(eventID, this.userID).subscribe(response => {
      console.log(response);

    })

    this.message = "Successfully Removed RSVP!";
    this.successMessage = true;
    location.reload();
  }


  getClubAnnouncements() {
    this.announcementsService.getClubAnnouncements(+this.clubID).subscribe(response => {
      this.clubAnnouncements = response;
      },
      (error) => {
        console.log(error)
      });
  }
}


