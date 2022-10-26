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

  searchText = '';

  allClubs: Club[] = [];
  topClubs: Club[] = [];
  favoritedClubs: Club[] = [];

  ngOnInit(): void {
    this.fillClubList();
    this.getTopClubs();
    this.getUsersFavoritedClubs();
  }

  showClubSearchDialog() {
    this.displayClubSearchModal = true;
  }

  closeClubSearchDialog() {
    this.displayClubSearchModal = false;
  }

  fillClubList() {
    this.clubService.getAllClubs().subscribe((response: Club[]) => {
      this.allClubs = response;
    },
      (error) => {
        console.log(error)
      });
  }

  getTopClubs() {
    this.clubService.getTopClubs().subscribe((response: Club[]) => {
      this.topClubs = response;
      console.log(response);
      console.log(this.topClubs);
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
}
