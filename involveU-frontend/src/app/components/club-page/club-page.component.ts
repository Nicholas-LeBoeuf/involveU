import { Component, OnInit } from '@angular/core';
import { ClubService } from "../../services/club.service";
import { Club } from "../../objects/club";
import { Router } from '@angular/router';
import {CookieService} from "ngx-cookie-service";
import {ButtonModule} from "primeng/button";

@Component({
  selector: 'app-club-page',
  templateUrl: './club-page.component.html',
  styleUrls: ['./club-page.component.scss']
})
export class ClubPageComponent implements OnInit {

  constructor(private clubService: ClubService,
              private router: Router,
              public cookie: CookieService) { }

  displayClubSearchModal: boolean = false;
  displayClubSearchLoggedInModal: boolean = false;
  isLoggedIn: boolean = false;

  timeout: boolean = false;
  userID!: number;

  searchText = '';
  allClubs: Club[] = [];
  compareAllClubs: Club[] = [];
  topClubs: Club[] = [];
  favoritedClubs: Club[] = [];
  notFavoritedClubsOG: Club[] = [];
  notFavoritedClubs: Club[] = [];

  ngOnInit(): void {
    this.userID = +this.cookie.get('studentID')
    this.getTopClubs();
    this.getUsersFavoritedClubs();

    setTimeout(() => {
      this.timeout = true;
    }, 4000)

  }

  checkLogin() {
    if (this.userID !== undefined) {
      this.isLoggedIn = true;
      this.getClubsThatArentFavorited();
    }
    else {
      this.fillClubList();
      this.showClubSearchDialog();
    }

    console.log(this.isLoggedIn);
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
    this.clubService.getUsersFavoritedClubs(+this.cookie.get('studentID')).subscribe((response: Club[]) => {
        this.compareAllClubs = response;
      });
    this.clubService.getAllClubs().subscribe(response => {
      this.notFavoritedClubs = response.filter(allClubs => !this.compareAllClubs.find(x => x.clubID === allClubs.clubID));
    },
      (error) => {
        console.log(error);
      });

    console.log(this.notFavoritedClubs)
    console.log(this.compareAllClubs);
    this.showClubSearchLoggedInDialog();
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
    this.clubService.favoriteClub(userID, clubID).subscribe(response => {
      console.log(response);
      location.reload();
    },
      (error) => {
      console.log(error);
    });
  }

  removeFromFavorites(userID: number, clubID: number) {
    this.clubService.unfavoriteClub(clubID, userID).subscribe(response => {
        console.log(response);
      },
      error => {
        console.log(error);
        window.location.reload();
      })
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
}

