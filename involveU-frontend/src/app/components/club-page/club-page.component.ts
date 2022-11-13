import {Component, OnInit, ViewChild} from '@angular/core';
import { ClubService } from "../../services/club.service";
import { Club } from "../../objects/club";
import { Router } from '@angular/router';
import {CookieService} from "ngx-cookie-service";
import {ButtonModule} from "primeng/button";
import {LazyLoadEvent} from "primeng/api";
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
              private eventService: EventsService,
              private router: Router,
              public cookie: CookieService) { }

  displayClubSearchModal: boolean = false;
  displayClubSearchLoggedInModal: boolean = false;
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
  topClubs: Club[] = [];
  favoritedClubs: Club[] = [];
  notFavoritedClubs: Club[] = [];
  featuredClubs: Club[] = [];

  favoritedClubsEvents: Events[] = [];
  allFutureEvents: Events[] = [];

  cols = [
    { field: 'clubName', header: 'Club Name' }
  ];

  @ViewChild('dtNotLoggedIn') dtNotLoggedIn: Table;
  @ViewChild('dtLoggedIn') dtLoggedIn: Table;

  ngOnInit(): void {
    this.userID = +this.cookie.get('studentID')
    this.isUserLoggedIn();
    this.fillClubList();
    this.getTopClubs();
    this.getUsersFavoritedClubs();
    this.getClubsThatArentFavorited();
    this.getFavoritedClubEvents();
    this.getAllClubsForFeatured();
    this.getAllFutureEvents();
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

  getTopClubs() {
    this.clubService.getTopClubs().subscribe((response: Club[]) => {
      this.topClubs = response;
    },
      (error) => {
        console.log(error);
      });
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
    this.eventService.getFavoritedClubsEvents(this.userID).subscribe(response => {
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
    this.eventService.getAllFutureEvents().subscribe(response => {
      this.allFutureEvents = response;
    })
  }
}
