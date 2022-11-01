import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ClubService} from "../../services/club.service";
import {Club} from "../../objects/club";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-specific-club-page',
  templateUrl: './specific-club-page.component.html',
  styleUrls: ['./specific-club-page.component.scss']
})
export class SpecificClubPageComponent implements OnInit {

  constructor(private clubService: ClubService,
              private route: ActivatedRoute,
              private router: Router,
              public cookie: CookieService) { }

  clubID!: number;
  userID!: number;

  clubIsFav: boolean = false;
  clubInfo!: Club;
  favoritedClubs: Club[] = [];

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.clubID = params['id'];
    });

    this.userID = +this.cookie.get('studentID');

    this.getClubInfo();
    this.getUsersFavoritedClubs();
  }

  getClubInfo() {
    this.clubService.getSpecificClub(this.clubID).subscribe(response => {
      this.clubInfo = response;
    })
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

  favoriteClub(userID: number, clubID: number) {
    this.clubService.favoriteClub(userID, clubID).subscribe(response => {
        console.log(response);
      },
      (error) => {
        console.log(error);
        window.location.reload();
      });
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
}
