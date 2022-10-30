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

  searchText = '';

  allClubs: Club[] = [];
  compareAllClubs: Club[] = [];
  topClubs: Club[] = [];
  favoritedClubs: Club[] = [];
  notFavoritedClubsOG: Club[] = [];
  notFavoritedClubs: Club[] = [];

  ngOnInit(): void {
    this.fillClubList();
    this.getTopClubs();
    this.getUsersFavoritedClubs();
  }

  checkLogin() {
    if (this.cookie.get('studentID') !== '') {
      this.isLoggedIn = true;
      this.getClubsThatArentFavorited();
    }
    else {
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
    this.clubService.getAllClubs().subscribe((response: Club[]) => {
        this.compareAllClubs = response;
      });

    console.log(this.compareAllClubs);

    this.clubService.getUsersFavoritedClubs(+this.cookie.get('studentID')).subscribe((response: Club[]) => {
      this.notFavoritedClubsOG = response;
      console.log(this.notFavoritedClubsOG);
      console.log(response);
    },
      (error) => {
        console.log(error);
      });

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
    },
      (error) => {
      console.log(error);
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

  goToClubPage(clubID: number) {
    this.router.navigate(['/clubs/' + clubID]).then();
  }
}

