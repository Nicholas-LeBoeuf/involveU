import {Component, OnInit, ViewChild} from '@angular/core';
import {ClubService} from "../../services/club.service";
import {Club} from "../../objects/club";
import {Router} from '@angular/router';
import {CookieService} from "ngx-cookie-service";
import {Table} from "primeng/table";
import {Events} from "../../objects/events";
import {EventsService} from "../../services/events.service";
import {Title} from "@angular/platform-browser";
import {ResponsiveService} from "../../services/responsive.service";
import {faTrophy, faMedal} from "@fortawesome/free-solid-svg-icons";
import {AnnouncementsService} from "../../services/announcements.service";
import {Announcement} from "../../objects/announcements";

@Component({
  selector: 'app-club-page',
  templateUrl: './club-page.component.html',
  styleUrls: ['./club-page.component.scss']
})
export class ClubPageComponent implements OnInit {
  trophy: typeof faTrophy;
  faMedal: typeof faMedal;

  constructor(private clubService: ClubService,
              private eventsService: EventsService,
              private announcementsService: AnnouncementsService,
              public responsiveService: ResponsiveService,
              private router: Router,
              private title: Title,
              public cookie: CookieService
              ) {
    this.title.setTitle("involveU | Clubs")
  }

  //BOOLEANS
  displayClubSearchModal: boolean = false;
  viewMoreInfoDialog: boolean = false;
  isLoggedIn: boolean = false;
  loading: boolean = true;
  successMessage: boolean = false;
  failMessage: boolean = false;
  isLoading: boolean = true;
  showMore: boolean = false;

  //NUMBERS
  userID: number;
  numberOfRows: number;

  //STRINGS
  message: string;
  clubName: string;
  userFirstName: string;

  //OBJECTS or ARRAYS
  allClubs: Club[] = [];
  favoritedClubs: Club[] = [];

  featuredClubs: Club[] = [];

  favoritedClubsEvents: Events[] = [];
  allFutureEvents: Events[] = [];
  certainEvent: Events[] = [];
  userRSVPdEvents: Events[] = [];
  topRSVPdEvents: Events[] = [];

  osiAnnouncements: Announcement[] = [];
  favoritedClubAnnouncements: Announcement[] = [];

  cols = [
    { field: 'clubName', header: 'Club Name' }
  ];

  @ViewChild('dtClubSearch') dtClubSearch: Table;

  ngOnInit(): void {
    this.isLoading = true;
    this.userID = +this.cookie.get('studentID');
    this.userFirstName = this.cookie.get('studentFName');
    this.userFirstName = this.userFirstName.replace(/['"]/g, '');

    this.isUserLoggedIn();
    this.getClubList();
    this.getUsersFavoritedClubs();
    this.getFavoritedClubEvents();
    this.getAllClubsForFeatured();
    this.getAllFutureEvents();
    this.getUserRSVPdEvents();
    this.getTopRSVP();
    this.getOSIAnnouncements();
    this.getFavoritedClubAnnouncements();

    if (this.responsiveService.deviceDesktop()) {
      this.numberOfRows = 2;
    }
    else {
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

  //Get Functions
  getTopRSVP() {
    this.eventsService.getTopRSVP().subscribe(response => {
      this.topRSVPdEvents = response;
    },
    (error) => {
      console.log(error);
    })
  }

  getClubList() {
    this.clubService.getAllClubs().subscribe((response: Club[]) => {
        this.allClubs = response;
      },
      (error) => {
        console.log(error)
      });
  }

  getUsersFavoritedClubs() {
    this.clubService.getUsersFavoritedClubs(+this.cookie.get('studentID')).subscribe(response => {
        this.favoritedClubs = response;
      },
      (error) => {
        console.log(error);
      })
  }

  getFavoritedClubEvents() {
    this.eventsService.getFutureFavortedClubEvents(this.userID).subscribe(response => {
      this.favoritedClubsEvents = response;
    })
  }

  getAllClubsForFeatured() {
    this.clubService.getAllClubs().subscribe(response => {
      response.sort(() => Math.random() - 0.5);
      this.featuredClubs = response;
    })
  }

  getAllFutureEvents() {
    this.eventsService.getAllFutureEvents().subscribe(response => {
      this.allFutureEvents = response;
    })
  }

  getUserRSVPdEvents() {
    this.eventsService.getUserRSVPdEvents(this.userID).subscribe(response => {
      this.userRSVPdEvents = response;
    })
  }

  getFavoritedClubAnnouncements() {
    this.announcementsService.getFavoritedClubAnnouncements(this.userID).subscribe(response => {
      this.favoritedClubAnnouncements = response;
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

  //Actions
  removeFromFavorites(clubID: number) {
    this.clubService.unfavoriteClub(clubID, this.userID).subscribe()
    this.message = 'Club successfully unfavorited!';
    this.successMessage = true;
    location.reload();
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

  goToClubPage(clubID: number) {
    this.router.navigate(['/clubs/' + clubID]).then();
  }

  //Dialogs
  showClubSearchDialog() {
    this.displayClubSearchModal = true;
  }

  closeClubSearchDialog() {
    this.displayClubSearchModal = false;
  }

  showViewMoreInfoDialog(SpecificEvent: Events){
    this.certainEvent.push(SpecificEvent);
    this.viewMoreInfoDialog = true;
  }

  closeViewMoreInfoDialog(){
    this.certainEvent = [];
    this.viewMoreInfoDialog = false;
  }

  //Filters
  onFilterClubSearchTable(event: Event) {
    this.dtClubSearch.filterGlobal((event.target as HTMLInputElement).value.toString(), 'contains');
  }
}
