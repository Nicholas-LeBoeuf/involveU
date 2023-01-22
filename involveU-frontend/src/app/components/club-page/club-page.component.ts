import {Component, OnInit, ViewChild} from '@angular/core';
import {ClubService} from "../../services/club.service";
import {Club} from "../../objects/club";
import {Router} from '@angular/router';
import {CookieService} from "ngx-cookie-service";
import {Table} from "primeng/table";
import {Events} from "../../objects/events";
import {EventsService} from "../../services/events.service";

@Component({
  selector: 'app-club-page',
  templateUrl: './club-page.component.html',
  styleUrls: ['./club-page.component.scss']
})
export class ClubPageComponent implements OnInit {

  constructor(private clubService: ClubService,
              private eventsService: EventsService,
              private router: Router,
              public cookie: CookieService) { }

  displayClubSearchModal: boolean = false;
  displayClubSearchLoggedInModal: boolean = false;
  viewMoreInfoDialog: boolean = false;
  isLoggedIn: boolean = false;

  timeout: boolean = false;
  userID: number;

  loading: boolean = true;

  successMessage: boolean = false;
  failMessage: boolean = false;
  message!: string;

  clubName: string;

  imagesForClubSearch: any = ['cape.png', 'cssa.png', 'penmenPress.png', 'radioSNHU.png', 'snhuLogoStock.png'];
  allClubs: Club[] = [];
  compareAllClubs: Club[] = [];
  favoritedClubs: Club[] = [];
  notFavoritedClubs: Club[] = [];
  featuredClubs: Club[] = [];

  favoritedClubsEvents: Events[] = [];
  allFutureEvents: Events[] = [];
  certainEvent: Events[] = [];
  userRSVPdEvents: Events[] = [];
  topRSVPdEvents: Events[] = [];

  cols = [
    { field: 'clubName', header: 'Club Name' }
  ];

  @ViewChild('dtNotLoggedIn') dtNotLoggedIn: Table;
  @ViewChild('dtLoggedIn') dtLoggedIn: Table;

  ngOnInit(): void {
    this.userID = +this.cookie.get('studentID');
    this.isUserLoggedIn();
    this.fillClubList();
    this.getUsersFavoritedClubs();
    this.getClubsThatArentFavorited();
    this.getFavoritedClubEvents();
    this.getAllClubsForFeatured();
    this.getAllFutureEvents();
    this.getUserRSVPdEvents();
    this.getTopRSVP();
    this.loading = false;

    if (!localStorage.getItem('isReloaded')) {
      localStorage.setItem('isReloaded', 'no reload')
      location.reload()
    }
    else {
      localStorage.removeItem('isReloaded')
    }
  }

  ngAfterViewInit(): void {
  }

  isUserLoggedIn() {
    this.isLoggedIn = this.userID !== 0;
  }

  checkLogin() {
    if (this.isLoggedIn) {
      this.showClubSearchLoggedInDialog();
    }
    else {
      this.showClubSearchDialog();
    }
  }

  getTopRSVP() {
    this.eventsService.getTopRSVP().subscribe(response => {
      this.topRSVPdEvents = response;
      console.log(response);
    },
    (error) => {
      console.log(error);
    })
  }

  showClubSearchDialog() {
    this.displayClubSearchModal = true;
  }

  closeClubSearchDialog() {
    this.displayClubSearchModal = false;
  }

  showClubSearchLoggedInDialog() {
    this.displayClubSearchLoggedInModal = true;
  }

  closeClubSearchLoggedInDialog() {
    this.displayClubSearchLoggedInModal = false;
  }

  showViewMoreInfoDialog(SpecificEvent: Events){
    this.certainEvent.push(SpecificEvent);
    this.viewMoreInfoDialog = true;
  }
  closeViewMoreInfoDialog(){
    this.certainEvent = [];
    this.viewMoreInfoDialog = false;
  }

  fillClubList() {
    this.clubService.getAllClubs().subscribe((response: Club[]) => {
      this.allClubs = response;
    },
      (error) => {
        console.log(error)
      });
  }

  getClubsThatArentFavorited() {
    this.loading = true;

    this.clubService.getUsersFavoritedClubs(+this.cookie.get('studentID')).subscribe((response: Club[]) => {
      this.compareAllClubs = response;
    });

    setTimeout(() => {
      this.clubService.getAllClubs().subscribe(response => {
        this.notFavoritedClubs = response.filter(allClubs => !this.compareAllClubs.find(x => x.clubID === allClubs.clubID));
        this.loading = false;

      })
    }, 1000);
  }

  favoriteClub(userID: number, clubID: number) {
    this.clubService.favoriteClub(userID, clubID).subscribe()
    this.message = 'Club successfully favorited!';
    this.successMessage = true;
    location.reload();
  }

  removeFromFavorites(userID: number, clubID: number) {
    this.clubService.unfavoriteClub(clubID, userID).subscribe()
    this.message = 'Club successfully unfavorited!';
    this.successMessage = true;
    location.reload();
  }

  getUsersFavoritedClubs() {
    this.clubService.getUsersFavoritedClubs(+this.cookie.get('studentID')).subscribe(response => {
      this.favoritedClubs = response;
    },
      (error) => {
      console.log(error);
      })
  }

  goToClubPage(clubID: number) {
    this.router.navigate(['/clubs/' + clubID]).then();
  }

  onFilterNotLoggedInTable(event: Event) {
    this.dtNotLoggedIn.filterGlobal((event.target as HTMLInputElement).value.toString(), 'contains');
  }

  onFilterLoggedInTable(event: Event) {
    this.dtLoggedIn.filterGlobal((event.target as HTMLInputElement).value.toString(), 'contains');
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

  getUserRSVPdEvents() {
    this.eventsService.getUserRSVPdEvents(this.userID).subscribe(response => {
      this.userRSVPdEvents = response;
    })
  }

  isUserRSVPd(eventID: number): boolean {
    return this.userRSVPdEvents.some(event => event.eventID === eventID);
  }

}
